# Getting Started with your OWL Pedal mkII

We are proud to present you with your very own OWL Pedal, and we hope you will find it as exciting and fun to use as we do!

## What's In the Box
 * 1x OWL Pedal mkII
 * 1x USB Micro Cable
 * 4x Rubber Feet
 
## Getting Started
Plug the USB cable into a USB power source. Plug an instrument into the L input on the right side. Plug an amplifier into the L output on the left side.
When the pedal is powered on, it starts the default patch: `Filter Delay`. Turn the top four knobs to adjust the A, B, C and D parameters of the patch. Connect an expression pedal to the Exp input to control the `E` parameter. Some patches also use `B1`, the LED pushbutton, e.g. for tap tempo.

## Connections
The OWL Pedal mkII has connections for stereo left and right audio in (right side) and out (left side), and an expression pedal input (front right), all on 1/4" jacks.
Connections on the rear of the unit are for DC power supply and micro USB. The OWL Pedal mkII can be powered from USB or via 9V DC power supply. For optimal performance, we recommend using a 9V DC power supply, centre negative, providing at least 500mA. Daisy chaining the power supply with other pedals is generally not recommended. For battery power you can connect a USB battery pack.
There are 6 controls on the pedal:
 * 4 x knobs
 * 1 x bicolour LED pushbutton
 * 1 x stereo true bypass footswitch

## Bypass Mode
To enter or exit Bypass Mode, toggle the bypass footswitch. It's a sturdy switch, and might need pressing down quite hard. When the pedal is in Bypass Mode, the LED will be dark. During normal operation, the LED will be lit, pulsating, or alternating red and green.

## Configuration Mode
Configuration Mode is used to select a patch (knob A) and adjust the output volume (knob D).
The easiest way to get to Configuration Mode is to first enter Bypass Mode then press the LED pushbutton. While it is pressed down, the LED will indicate a yellowish colour to show that you are about to enter Configuration Mode.
Alternatively you can get to Configuration Mode directly from Run Mode (normal operation) by pressing and holding the LED pushbutton for about 3 seconds. After two seconds it will flash, then turn a yellowish colour. This shows you are entering Configuration Mode.
In Configuration Mode, the LED blinks to tell you which patch is currently selected. One, two, three or four green blinks followed by a short pause indicates that a patch in one of the first four slots is selected. A red blink means slot 5, a red followed by green for slot 6, et cetera.
In case you are running a patch from RAM which is not stored in a slot, the LED will indicate this with a single, yellow-orange blink.
To exit Configuration Mode, simply press the LED pushbutton once again.

## Changing Patches
Any patch stored on the device can be selected by first entering Configuration Mode and then turning knob A. To prevent accidental changes, you have to first 'unlock' the knob by turning it a fair amount, about 1/8 of a rotation. The knob position then selects a patch slot, and the LED indicates which one is selected: green blink means one slot, red blink means 5 slots, so e.g. 1 red and 3 green blinks means slot number 8. 
The selected patch is started up when exiting Configuration Mode by pressing the LED pushbutton once.
Patches can also be selected by MIDI with a Program Change message, for example `PC 1` will select the patch in slot number one.

## Changing Volume
The output volume is adjusted to provide unity gain through the pedal, in order that the levels can be matched between all parts of your setup. But it can also easily be adjusted up or down.
To change the output volume, first enter Configuration Mode, then adjust the volume by turning knob D. To prevent accidental changes, you have to first 'unlock' the knob by turning it a fair amount, about 1/8 of a rotation. 
Keep in mind that changing the output volume does not affect the level in Bypass Mode, since this is true bypass. It is better to change the volume when not bypassed, so that the effect is immediately audible.
The volume can also be changed by a MIDI Volume message (Control Change 7). For example, `CC 7 127` will set the maximum volume.

## Recording to Computer
When you connect the pedal with the USB cable to a computer, tablet or smartphone it will appear as an audio interface. It is class compliant and does not require drivers to be installed. The OWL Pedal mkII audio interface can be used to record directly from the pedal.
The signal will be recorded post effect, so it will be processed by the running patch. To record a dry, clean guitar signal either set the patch Mix knob to fully dry, or load a clean effect (such as the Gain patch from the patch library).

## Loading Patches
The online patch library has hundreds of patches to try out. To load a patch, connect the pedal with the USB cable to a computer, tablet or smartphone. It will appear as a class compliant MIDI interface. Use a Web MIDI enabled browser, such as Chrome, Chromium, or a recent version of Edge. 
Go to our website `www.rebeltech.org` and click on `PATCHES`. Click on a patch, then click `CONNECT TO DEVICE`, then `LOAD` to upload the patch to the device. The patch will now run from RAM and you can try it out.
Check the patch details for instructions and details on the patch parameters. Some patches will have more parameters than are physically available on the OWL Pedal mkII. These extended parameters can be controlled by MIDI. Some patches may be designed for other devices and may not work well on OWL Pedal mkII.
To store a patch in a slot on the device, click `STORE` and select the slot number. To see which patches are currently stored on your device, click on the Device tab. Storing into a slot that already has a patch will overwrite that patch.

## Creating Patches
It is easy to make your own patches, and you can use any of our supported languages: Pure Data, Max gen~, FAUST, SOUL, C++ or Maximilian. You don't need to download a compiler, just click `My Patches` (create a free account if necessary), then click `Create patch` and upload your patch files. There are tutorials on many aspects of patch development available on our website (menubar `TUTORIALS`). Make sure to also have a look at our documentation site: `www.openwarelab.org`. And there are plenty of examples in the patch library to get you started!

## Connecting a Footswitch
A single or dual footswitch pedal can be connected to the Exp input instead of an expression pedal. In this case, configure the Expression Pedal mode to `FOOTSWITCH_TS` (single) or `FOOTSWITCH_TRS` (dual with TRS connector). The single footswitch controls button B1, while dual controls B1 and B2.

## Support and Community
To get updates, patches and to join our online OWL community please visit the website: https://www.rebeltech.org
For development documentation, please visit the documentation website: https://www.openwarelab.org/
For support, email us: `info at rebeltech dot org`

Have a lot of fun!
Martin Klang and the Rebel Technology team

## Default Patches
Your OWL Pedal mkII comes with a small selection of factory installed patches to get you started.

### 1: Filter Delay
Clean stereo delay with tap tempo and a smooth low pass filter.
Parameters:
 * A: Delay
 * B: Feedback
 * C: Filter
 * D: Mix
 * E: Filter Duck
 * B1: Tap Tempo
 * B2: Lock Loop

Link: [Filter Delay](https://www.rebeltech.org/patch-library/patch/Filter_Delay)

### 2: Feedback Chorus
Classic triphase chorus with feedback for more extreme effects.
Parameters:
 * A: Rate
 * B: Depth
 * C: Feedback
 * D: Mix
 * E: Speedup
 * B1: Tap Tempo

Link: [Feedback Chorus](https://www.rebeltech.org/patch-library/patch/Feedback_Chorus)

### 3: Stereo Phaser
Phaser with feedback and continuously adjustable LFO shape.
Parameters:
 * A: Rate
 * B: Shape
 * C: Feedback
 * D: Mix
 * E: Speedup
 * B1: Tap Tempo

Link: https://www.rebeltech.org/patch-library/patch/Stereo_Phaser

### 4: Multimode Filter
Resonant filter, continuously morphed between low, band and high pass modes.
Parameters:
 * A: Frequency
 * B: Resonance
 * C: Filter Mode
 * D: Mix
 * E: Duck

Link: [Multimode Filter](https://www.rebeltech.org/patch-library/patch/Multimode_Filter)

### 5: DroneBox
Sympathetic Resonance Generator by Oli Larkin. An OWL classic!
Parameters:
 * A: Coarse Pitch
 * B: Fine Pitch
 * C: Decay
 * D: Mix

Link: [DroneBox](https://www.rebeltech.org/patch-library/patch/DroneBox)

### 6: Owlgazer Shimmer Reverb
A stereo ambient reverberation with a shimmer effect by Xavier Godart.
Parameters:
 * A: Decay
 * B: Tone
 * C: Shimmer
 * D: Mix

Link: [Owlgazer Shimmer Reverb](https://www.rebeltech.org/patch-library/patch/Owlgazer_Shimmer_Reverb)

### 7: Distorsionista
Intense multi-band distortion using two wave-shaper combinations, by Paul Stanghan.
Parameters:
 * A: Low Drive
 * B: Mid Drive
 * C: High Drive
 * D: Distortion

Link: [Stereo Distorsionista](https://www.rebeltech.org/patch-library/patch/Stereo_Distorsionista)

### 8: Rings Reverb
Reverb from MI Rings/Element by Émilie Gillet, rewritten for OWL by Stas Shtin.
Parameters:
 * A: Decay
 * B: Diffusion
 * C: Brightness
 * D: Mix
 * E: Expression
 * B1: Max Reverb

Link: [Rings Stereo Reverb](https://www.rebeltech.org/patch-library/patch/Rings_Stereo_Reverb)
