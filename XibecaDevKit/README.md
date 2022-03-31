### xdk

![xdk](/assets/images/xdk.jpg)

The Xibeca Dev Kit is a prototyping and development board for the Xibeca platform.

### Getting Started
Connect the DC power supply, and connect a USB cable to your computer. The power LED on the board will light up, and a USB Audio and MIDI interface will appear under the name OWL-XIBECA. You can now interact with the device over MIDI.
Using a browser with WebMIDI (e.g. Chromium/Chrome) open the [device page](https://www.rebeltech.org/patch-library/device/). Click Connect To Device to see the device status and firmware version.

### Loading and Storing Patches
DSP programs, which we call patches, can be loaded into RAM or stored on the device. To try out a patch, go to the [patch library](https://www.rebeltech.org/patch-library/patches/) and select the patch you want to try. Click the `Device` sub-tab (next to `About`) then `Connect to Device`. Click `LOAD` to upload the patch (by MIDI SysEx) and run it from device RAM. To store a patch, select the patch slot. Stored patches can be recalled by sending a MIDI Program Change command, e.g. sending `PC 3` will load the patch stored in slot 3. By default, the patch in slot 1 is loaded on startup.

### Flashing Firmware
The device is updated in DFU mode. There are two ways to enter DFU mode, either by sending a MIDI bootloader command, or by shorting the BOOT jumper on the back of the Xibeca.
To send a bootloader command, connect the device and go to the [extended web control](https://pingdynasty.github.io/OwlWebControl/extended.html) page. Click Reset to Boot Loader. Now open the [OWL Web DFU](https://rebeltechnology.github.io/webdfu_owl/owl/). Click `Connect to OWL`. Choose the firmware binary file you want to flash the device with. Click `Enable advanced mode` then `Flash bootloader`.

### Remote Debugging
The Xibeca board has a miniature 10-pin SWD programming header on the back. Connect a programmer, e.g. an STLinkV2 with [Olimex JTAG 20-10 adapter](https://www.olimex.com/Products/ARM/JTAG/ARM-JTAG-20-10/). Pin 1 is furthest away from the micro-USB connector. A remote debug session can now be set up with OpenOCD and arm-none-eabi-gdb. Firmware source code and OpenOCD configuration scripts are available in the [OpenWare](https://github.com/RebelTechnology/OpenWare) firmware repository.

### Reference
* [OpenWare](https://github.com/RebelTechnology/OpenWare) OWL firmware
* [OwlProgram SDK](https://github.com/RebelTechnology/OpenWare) Offline patch compilation
* [Xibeca Dev Kit Ports](Noctua_proto_Xibeca_PORTS.pdf) (pdf) Input and output diagram
* [Xibeca Dev Kit iBOM](ibom_Xibeca_Proto.html) Interactive BOM and layout
* [Xibeca Overview](Xibeca%20Overview.pdf) (pdf) Platform introduction and pinout
* [Xibeca Alternate Pin Functions](Xibeca%20Alternate%20Pin%20Functions.pdf) (pdf) Pinout with all pin functions

<!-- ![Xibeca](/assets/images/Xibeca.png) -->
