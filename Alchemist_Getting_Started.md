# Alchemist Synthesizer and Effects Unit

## Getting Started
To use the Alchemist, just plug it into a computer, USB charger or 9V DC (centre positive) supply. Attach a pair of headphones to the front stereo out socket.

![Alchemist Functional Diagram](https://user-images.githubusercontent.com/648870/79698500-a646a700-8289-11ea-8e15-1b7536b5788f.png)

To change the output volume of the device, hold down the MODE button and turn the C knob (right side) to adjust.

To get you started, and hopefully inspired, we have pre-loaded your Alchemist with a small selection of sound making patches. They share the same controls:
Knob A: Tempo
Knob B: Pitch
Knob C: Intensity
Knob D: Volume

To select a patch, hold down the MODE button (top left corner) and turn the D knob (bottom centre). You can then select one of the five pre-loaded patches on the device. As you turn the knob you will see the LED change between blue (odd numbered patches) and green (even numbered patches).

You can also change volume remotely by sending a MIDI Volume (Control Change 7) message to the device, and the patch can be changed with a MIDI Program Change.

## Loading Patches
You can easily load patches from our patch library by connecting your Alchemist to a computer and, using Chrome, navigating to https://www.rebeltech.org/patch-library/.
Find a patch that you want to try out, click CONNECT TO OWL, then LOAD. The patch will immediately be sent to the device.

## Making Patches
Making your own patches is easy! You can use Max Gen, Pure data, FAUST or C++ and we have a wealth of tutorials and examples available, see https://www.rebeltech.org/tutorials/.

## Firmware Upgrade
Your Alchemist has a built in bootloader which lets you upgrade the firmware on the device over its USB MIDI connection. To activate the bootloader, connect the device to a computer using the USB cable, and hold down the B button while the device is starting up. The LED will blink red/green three times to indicate that it is entering bootloader mode.
Problems and Support
If you have any questions at all please don’t hesitate to ask us on our online forum: https://community.rebeltech.org
