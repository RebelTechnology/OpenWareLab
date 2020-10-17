# The language

Faust is a functional language for DSP. Please see its [main site](https://faust.grame.fr/) for documentation and library reference.

There's lots of detailed info and tutorials, so this document won't cover that. Instead we'll focus on features that are specific to Owl/Openware.

Sample files are part of this repo and can be built and loaded quickly using provided upload.py script. Example call would be something like this:

```
PLATFORM=Magus ./upload.py --owl=/path/to/OwlProgram --slot=5
```


# Program examples

## Trivial patch

Simplest patch in Faust would look like this:

```
process = _;
```

What it does is takes input from first audio channel and sends it to output without any modifications.

You can compile it with online compiler at [patch library](https://www.rebeltech.org/patch-library) or build locally using [OwlLibrary](https://github.com/pingdynasty/OwlProgram)


## Display message on screen and make some noise

If your device contains screen, you can use it to display a short information message. Let's try this example:

```
declare message "Hello\nmake some noise";

import("stdfaust.lib");

process = no.noise : *(0.5);
```

Here first line adds metadata declaration, second line imports Faust's standard library and last sends output from white noise generator to output channel 1 with gain reduced by half.


## Parameter input

You can control patch parameters by binding them with Faust UI controls. Let's look at example patch:

```
import("stdfaust.lib");
freq = hslider("Frequency[OWL:A]", 60, 60, 440, 1);
process = os.osc(freq);
```

``[OWL:A]`` in parameter label is what binds your device's input to Faust parameter. Parameter ranges that you can use A-H, AA-AH, BA-BH, CA-CH, DA-DH, PUSH (for pushbutton), ButtonA-ButtonD. This is what Faust patches support, but the actual parameters that have physical inputs on a particular device would be more limited. You would have to use MIDI to access those of them that don't have physical control on device.

It's also possible to specify variable as digit from ``[OWL:0]`` to ``[OWL:39]``. This is convenient if you want to use Faust [variable substitution in lables](https://faust.grame.fr/doc/manual/index.html#variable-parts-of-a-label)

Example:

```
import("stdfaust.lib");

freq = hslider("Base frequency[OWL:AA]", 80, 60, 120, 0.01);

process = par(
    i,
    8, 
    hslider("Harmonic %i[OWL:%i]", 1 / (1 + i), 0, 1, 0.001) * os.oscs(i * freq + freq)
) :> _ : *(0.125) <: _, _;
```

This patch renders first 8 partials from a wave with base frequency of 60 Hz by default. Each harmonic partial has editable gain. This is called a harmonic oscillator.

Faust supports several variations for its UI widgets, but with hardware we're using either knobs (often with extra control by voltage) or buttons. So effectively using ``hslider``, ``vslider`` or ``numentry`` widget give us a variable limited by upper and lower limit, while ``button``, ``togglebutton`` and ``checkbutton`` give a boolean variable with on/off state. 


## Parameter output

Some devices (currently only Magus) have support for outputting voltage. This is also available to patches in Faust. Let's see how it can be used:

```
import("stdfaust.lib");

freq     = hslider("Frequency[OWL:A]", 60, 60, 440, 1);
lfo_freq = hslider("LFO frequency[OWL:B]", 0.3, 0.01, 1.0, 0.01) : si.smoo;
lfo_out  = hbargraph("LFO>[OWL:C]", -1, 1);

process = attach(os.osc(freq), os.osc(lfo_freq) : lfo_out);
```

This patch gives as a static sine wave tone initially. But if we connect output from patch point C with input in patch point A, we get slow frequency modulation in our audio.

A typical way to use CV output works like ``attach(_, hbargraph(...))`` - this allows us to bypass incoming audio and just force sending data to bargraph widget. If you're not familiar with ``attach`` primitive, have a look at [information in Faust docs](https://faust.grame.fr/doc/manual/index.html#attach-primitive) . The general idea is that its first input is returned unchanged, while output is multiplied by 0. So second parameter is not used, but can force some sort of calculation to be performed. In our case it's generating LFO signal and sending it to widget bound to parameter C.


## MIDI

It's possible to control your patches with MIDI. In fact, it's very easy to do so.

```
declare options "[midi:on]";

import("stdfaust.lib");

freq = hslider("freq", 440, 20, 1000, 0.001);
gain = hslider("gain", 0.0, 0.0, 1.0, 0.001);
gate = button("gate");
sustain = hslider("Sustain[OWL:A]", 5.0, 1.0, 10.0, 0.01);

process = sy.combString(freq, gain * sustain, gate);
```

First of all, you must enable MIDI with metadata declaration.

Then special variables are used to bind variables to MIDI note parameters. This is based on matching label used for your controls. In this case we use "freq"/"gain"/"gate". Note that "gate" must be a button, not a slider. Gain is based on note velocity. Other MIDI parameter you can use is "bend".

After connecting your MIDI controller, you should be able to play some notes and hear a string simulated by physical modeling. Current MIDI implementation is monophonic, so you won't be able to hear more than a single note at once.

## V/Oct control

This feature requires calibrating your device to have accurate V/Oct tracking. Unfortunately, current firmware (20.7) doesn't support such calibration. It's very likely that it will be added in the next release (at least for Magus).

Here's how you can use CV for controlling oscillator frequency:

```
declare owl "[voct:input]";

import("stdfaust.lib");
import("owl.lib");

tune = hslider("Tune[OWL:A]", 0, -2, 2, 0.01);

process = sample2hertz(tune) : os.oscs;
```

It's also possible to output CV. This also requires a calibrated device to be actually useful.

Let's write a simple sequencer:

```
declare owl "[voct:output]";

import("stdfaust.lib");
import("owl.lib");

notes = (36, 40, 43, 47, 48, 47, 43, 40);
notes_per_beat = 4;
total_notes = 8;

process = pitch, gate
with {
    tune     = hslider("Tune[OWL:A]", 0, -24, 24, 1) : int;
    bpm      = hslider("BPM[OWL:B]", 120, 80, 160, 0.1);
    beat_len = ba.tempo(bpm);
    gate     = ba.pulsen(beat_len / 4, beat_len / 2);
    step     = (ba.impulsify(gate) + _ : %(total_notes)) ~ _;
    seq_note = notes : ba.selectn(total_notes, step);
    pitch    = seq_note : ba.midikey2hz : hertz2sample(tune / 12);
};
```

First output generates CV pitch, second generates gates. Base note and tempo can be changed with parameters.