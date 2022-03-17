# Genius Eurorack Signal Processor

We are proud to present you with your very own Genius Eurorack module, and we hope you will find it as exciting and fun to use as we do!

## What's In the Box
 * Genius 10HP Eurorack Module
 * USB Cable
 * DIN MIDI Adaptor
 * Mounting Screws x4
 * 16-to-10-pin Eurorack Power Cable

## Getting Started
Install the Genius in a Eurorack compatible case with +12V and -12V power supply. Connect the Eurorack power cable to your bus board, making sure that the red stripe on the cable is aligned with the -12V supply.

Power up your rack. The Genius will start up and the screen will come to life. You do not need to connect the USB cable to use the Genius.

By default the Lorenz Attractor patch is loaded on startup. Use the encoder knobs to change parameter settings; press and turn to select parameters. 

## Connections
The Genius has six input minijacks on the left, and six outputs on the right. From top to bottom, the inputs and outputs are:

 * 1: Button/trigger/gate one (logic high/low)
 * 2: Button/trigger/gate two (logic high/low)
 * A: Assignable CV A (CV 0-10V)
 * B: Assignable CV B (CV 0-10V)
 * L: Left audio channel (CV/audio +/- 10V)
 * R: Right audio channel (CV/audio +/- 10V)

Below the two encoders there are two TRS MIDI Type A minijack connections: input on the left, output on the right. To connect to a MIDI device with a DIN-5 connector, please use the bundled adaptor.

Below the MIDI jacks there is a USB Device connector, for connecting the Genius to a computer, tablet or smartphone. Finally at the bottom you will find the USB Host connector, for connecting USB MIDI devices, such as MIDI keyboards and MIDI controllers.

## Configuration Mode
Configuration Mode is used to select a patch and to adjust system settings.
To enter Configuration Mode, 'click' the top encoder by pressing and releasing it in quick succession. The Status page will then be displayed, showing current CPU load, firmware version and available storage space. Turn the top encoder to navigate between configuration pages. Turn the bottom encoder to change values or navigate on the page. 

To exit Configuration Mode, simply press either encoder.

## Changing Patches
You can easily switch to another patch stored on the device by first entering Configuration Mode and then turning the bottom encoder to select a patch. To confirm the selection, press the bottom encoder.
Patches can also be selected by MIDI with a Program Change message, for example `PC 2` will select the patch in slot number two.

By default, when switching on the device it will start the patch in slot number one.

## Assigning CV Inputs and Outputs
The A and B CVs are freely assignable to any patch parameter. By default, they will be assigned to the first free input or output parameter. To reassign, 'click' the bottom encoder by quickly pressing and releasing it. To select which CV to assign (A or B, input or output), turn the top encoder. To select which parameter to assign to, turn the bottom encoder. Press either encoder to leave the assignment mode.

## Changing Volume
To change the output volume, first enter Configuration Mode, then adjust the volume by turning the bottom encoder.
The volume can also be changed by a MIDI Volume message (Control Change 7). For example, `CC 7 127` will set the maximum volume.

## USB Audio
When you connect the Genius with the USB cable to a computer, tablet or smartphone it will appear as an audio interface. It is class compliant and does not require drivers to be installed. The Genius audio interface is bidirectional and can be used to record and playback. The sample rate is 48k Hz and data width is 16 bits stereo.

## Loading Patches
The online patch library has hundreds of patches to try out. To load a patch, connect the pedal with the USB cable to a computer, tablet or smartphone. It will appear as a class compliant MIDI interface. Use a Web MIDI enabled browser, such as Chrome, Chromium, or a recent version of Edge. 

Go to our website at `www.rebeltech.org` and click on `PATCHES`. Click on a patch, select the `DEVICE` subtab and click `CONNECT TO DEVICE`, then `LOAD` to upload the patch to the device. The patch will now run from RAM and you can try it out.

Read the patch details for instructions and details on the patch parameters. All parameters can be controlled by MIDI as well as the assignable encoders and CVs. Some patches may be designed for other devices and may not work that well on Genius.

To store a patch in a slot on the device, click `STORE` and select the slot number. To see which patches are currently stored on your device, click on the Device tab. Storing into a slot that already has a patch will overwrite that patch.

## Creating Patches
It is easy to make your own patches, and you can use any of our supported languages: Pure Data, Max gen~, FAUST, SOUL, C++ or Maximilian. You don't need to download a compiler, just click `My Patches` (create a free account if necessary), then click `Create patch` and upload your patch files. There are tutorials on many aspects of patch development available on our website (menubar `TUTORIALS`). Make sure to also have a look at our documentation site: `www.openwarelab.org`. And there are plenty of examples in the patch library to get you started!

## Support and Community
To get updates, patches and to join our online OWL community please visit the website: https://www.rebeltech.org
For development documentation, please visit the documentation website: https://www.openwarelab.org/
For support, email us: `info at rebeltech dot org`

Have a lot of fun!
Martin Klang and the Rebel Technology team

## Default Patches
Your Genius comes with a small selection of factory installed patches to get you started.

### 1: Lorenz Attractor
Chaotic oscillator with 3D rotation. The projected x and y axis modulate two sine oscillators which are output on the Left and Right channels.

_Parameters:_

 * A: Left Oscillator Frequency
 * B: Right Oscillator Frequency
 * C: Rotate X
 * D: Rotate Y
 * E: Rotate Z
 * F: Zoom
 * G: Rate
 * H: FM Modulation Amount
 * AA: Visualisation Depth

_Inputs:_

 * Left/Right: Oscillator FM

_Outputs:_

 * AB: Lorenz Attractor X
 * AC: Lorenz Attractor Y
 * AD: Lorenz Attractor Z
 * Left/Right: Modulated Sine Oscillator

<!-- Link: [Filter Delay](https://www.rebeltech.org/patch-library/patch/Filter_Delay) -->

### 2: Quantum Harmonic Oscillator
The quantum harmonic oscillator is the quantum-mechanical analog of the classical harmonic oscillator, here used to generate a constantly morphing wavetable.

_Parameters:_

 * A: Tune
 * B: Rate
 * C: Coherence
 * D: Lowpass Filter Cutoff Frequency
 * E: Lowpass Filter Resonance

_Inputs:_

 * Left: Frequency Modulation

_Outputs:_

 * F: Low Frequency Oscillator
 * G: Waveshape Energy
 * H: Waveshape Average
 * Left/Right: Oscillator Waveform

<!-- Link: [Feedback Chorus](https://www.rebeltech.org/patch-library/patch/Feedback_Chorus) -->

### 3: Bells
Physical model of two different church bells.

_Parameters:_

 * A: Strike Position
 * B: Strike Sharpness
 * C: Strike Cutoff Frequency
 * D: Gain

_Buttons:_

 * B1: English Bell
 * B2: French Bell

_Outputs:_

 * Left: English Bell
 * Right: French Bell

<!-- Link: https://www.rebeltech.org/patch-library/patch/Stereo_Phaser -->

### 4: Djembe
Physical model of two djembe drums with a stereo reverb.

_Parameters:_

 * A: Fundamental Frequency
 * B: Strike Position
 * C: Strike Sharpness
 * D: Reverb Dry/Wet Mix
 * E: Gain

_Buttons:_

 * B1: Left djembe
 * B2: Right djembe

_Outputs:_

 * Left: Left djembe
 * Right: Right djembe

<!-- Link: [Multimode Filter](https://www.rebeltech.org/patch-library/patch/Multimode_Filter) -->

### 5: JP Reverb
An algorithmic stereo reverb, inspired by the lush chorused sound of certain vintage Lexicon and Alesis reverberation units. Designed to sound great with synthetic sound sources, rather than sound like a realistic space.

_Parameters:_

 * A: Room Size
 * B: T60 Decay Time
 * C: Damping
 * D: Dry/Wet Mix
 * E: Early Diffusions
 * F: Low Band Time
 * G: Mid Band Time
 * H: High Band time
 * AA: Low to Mid Cutoff Frequency
 * AB: Mid to High Cutoff Frequency
 * AC: Modulation Depth
 * AD: Modulation Frequency

_Inputs:_

 * Left/Right: Stereo In

_Outputs:_

 * Left/Right: Stereo Out

<!-- Link: [DroneBox](https://www.rebeltech.org/patch-library/patch/DroneBox) -->
