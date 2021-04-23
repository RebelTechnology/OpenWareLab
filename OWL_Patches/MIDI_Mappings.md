## OWL MIDI Mappings

Different OWL devices have different hardware controls, such as knobs, buttons, encoders and control voltages. MIDI Control Change messages can be used to update parameters that don't have a designated hardware control.

### Parameters

Each OWL parameter has an associated MIDI CC:
```
  PATCH_PARAMETER_A      = 20,
  PATCH_PARAMETER_B      = 21,
  PATCH_PARAMETER_C      = 22,
  PATCH_PARAMETER_D      = 23,
  PATCH_PARAMETER_E      = 24,
  PATCH_PARAMETER_F      = 1, 
  PATCH_PARAMETER_G      = 12,
  PATCH_PARAMETER_H      = 13,
  PATCH_PARAMETER_AA     = 75,
  PATCH_PARAMETER_AB     = 76,
  PATCH_PARAMETER_AC     = 77,
  PATCH_PARAMETER_AD     = 78,
  PATCH_PARAMETER_AE     = 79,
  PATCH_PARAMETER_AF     = 80,
  PATCH_PARAMETER_AG     = 81,
  PATCH_PARAMETER_AH     = 82,
  PATCH_PARAMETER_BA     = 83,
  PATCH_PARAMETER_BB     = 84,
  PATCH_PARAMETER_BC     = 85,
  PATCH_PARAMETER_BD     = 86,
  PATCH_PARAMETER_BE     = 87,
  PATCH_PARAMETER_BF     = 88,
  PATCH_PARAMETER_BG     = 89,
  PATCH_PARAMETER_BH     = 90,
  PATCH_PARAMETER_CA     = 91,
  PATCH_PARAMETER_CB     = 92,
  PATCH_PARAMETER_CC     = 93,
  PATCH_PARAMETER_CD     = 94,
  PATCH_PARAMETER_CE     = 95,
  PATCH_PARAMETER_CF     = 96,
  PATCH_PARAMETER_CG     = 97,
  PATCH_PARAMETER_CH     = 98,
  PATCH_PARAMETER_DA     = 99,
  PATCH_PARAMETER_DB     = 100,
  PATCH_PARAMETER_DC     = 101,
  PATCH_PARAMETER_DD     = 102,
  PATCH_PARAMETER_DE     = 103,
  PATCH_PARAMETER_DF     = 104,
  PATCH_PARAMETER_DG     = 105,
  PATCH_PARAMETER_DH     = 106
```

The value is scaled from 7-bit MIDI range: 0 to 127, to OWL parameter range: 0.0 to 1.0.

If you send a MIDI value to a parameter that is already controlled by hardware then the value will generally snap back to the hardware setting (though not on Magus).

### Buttons

To simulate pressing the `PUSHBUTTON` you can send a value of 127 to `CC 25` for the down-press, followed by value 0 for the release.
To control the other buttons, put the button ID as the CC value and send a message to CC 27 to turn it on (press), and CC 28 to turn it off again (release).

```
  PATCH_BUTTON           = 25, /* LED Pushbutton: 0=not pressed, 127=pressed */
  PATCH_BUTTON_ON        = 27, /* Switch a button on: 0-127 button id */
  PATCH_BUTTON_OFF       = 28, /* Switch a button off: 0-127 button id */
```

The button ID's are as follows:

```
  PUSHBUTTON = 1,
  BUTTON_1 = 4,
  BUTTON_2 = 5,
  BUTTON_3 = 6,
  BUTTON_4 = 7,
  BUTTON_5 = 8,
  BUTTON_6 = 9,
  BUTTON_7 = 10,
  BUTTON_8 = 11
```
Button 1 is sometimes referred to as Button A, Button 2 as Button B et c.

### Volume

The output volume of the device can be controlled with MIDI CC 7, with values from 0 (mute) to 127 for maximum volume.


### Reference
The full set of MIDI mappings is available [here](https://www.rebeltech.org/docs/OpenWareMidiControl_8h_source.html).
