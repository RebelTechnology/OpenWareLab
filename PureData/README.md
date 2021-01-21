## Pure Data OWL Patches

OpenWare devices are capable of running Pure Data patches that have been compiled first with Heavy, then with the GCC ARM cross-compiler.

Currently Pd extensions are not supported, only (most) Pd Vanilla objects. See this [list of supported objects](SupportedObjects.md). Notably `expr`, `expr~` and `vline` are not currently supported.

### Instructions
The easiest way to run a Pure Data patch on an OWL device is to use the online compiler. Go to [the patch library](https://www.rebeltech.org/patch-library/patches/my-patches/) and, if necessary, create an account. Then click on My Patches, Create patch, and upload all .pd files that your patch requires. Make sure to specify Compilation type `pd`, and select the correct Main File (your top level Pd file).

You can also compile Pd patches offline using [OwlProgram](https://github.com/pingdynasty/OwlProgram) and a local installation of [hvcc](https://github.com/pingdynasty/hvcc.git) (the Heavy compiler; use our fork to take advantage of OWL-specific features and bug fixes). For details on using OwlProgram, see the project readme.

## Inputs and Outputs

### Parameters
There is a legacy and a recommended way to assign `[receive]` objects to specific OWL parameters. The legacy way is to use e.g. `[receive Channel-A]` to receive a value (between 0 and 1) from OWL parameter A. The recommended way is to use the `@owl` attribute.

    [receive NAME @owl PARAM MIN MAX DEFAULT]

receive a value called `NAME`, assigned to OWL parameter `PARAM`, in the range `MIN` to `MAX`, with default value `DEFAULT`.

example:

    [r Freq @owl A 220 880 440]

defines a receiver (`r` is shorthand for `receive`) called `Freq`, assigned to OWL parameter `A`. The output is a float in the range 220.0 to 880.0 with default value 440.0.

MIN, MAX and DEFAULT are optional. If omitted, MIN is 0, MAX is 1, and DEFAULT is calculated as the midway between the two. It is fine to declare only MIN and MAX, only MIN, none, or all.

The compiler supports up to 24 parameters, in three groups of eight, named from A to H, AA to AH and BA to BH, but the available hardware assignments vary depending on the OWL device. Magus has 20 CV inputs/outputs, OWL Pedal, OWL Modular and Wizard have 5, Alchemist has 4. All 24 OWL parameters can also be controlled by MIDI, as each is associated with a MIDI CC controller.

Output parameters can be assigned in the same way, using `[send]` instead of `[receive]`. The compiler will add `>` to the end of the parameter name, to ensure it is recognised as an output.

### Buttons, Gates and Triggers
For hardware that supports input and output triggers, gates, and buttons, these can be assigned with the names `B1` through `B8`, or `Push` for PUSHBUTTON. Output values from `[receive]` are `0` for *off*, `1` for *on*. Any `[send]` value greater than `0.5` will be interpreted as *on*. 

### Examples

For a simple example patch that uses both input and output parameters and buttons, see e.g. this [Witch Pd Template](https://www.rebeltech.org/patch-library/patch/Witch_Template).

A library of Heavy compatible Pure data abstractions is available [here](https://github.com/enzienaudio/heavylib)

Also make sure to check out our excellent Pure data [tutorials](https://www.rebeltech.org/tutorials/).

## Debugging

A very useful feature for debugging is the [print] object. If you send a message to [print] it will be sent out as an OWL patch message. This means that if you are using the patch library and are connected to the device then the messages will appear in the browser. You can add a string construction argument which will be concatenated with the received message.
Messages are limited to maximum 62 characters long. If you have several [print] objects in your patch then only the most recently fired message will be sent. If you want to view several values simultaneously you can always [pack] them together into one message. On a device that has a screen (such as the Magus) the message will also appear in realtime on the screen.


## MIDI

Patches can send and receive MIDI messages with the usual Pd Vanilla MIDI I/O objects: `[notein]`, `[bendin]`, `[ctlin]`, `[pgmin]`, and `[noteout]`, `[bendout]`, `[ctlout]`, `[pgmout]`.
For an example see [this patch](https://www.rebeltech.org/patch-library/patch/PD_MIDI).

## Known Bugs and Limitations

* MIDI input objects don't filter when given initialisation arguments: `[notein]`,`[ctlin]` et c always produce *all* messages from *all* channels.
* Raw MIDI receive and send with `[midiin]` and `[midiout]` is not yet supported.
* Heavy does not support `[list]` (workaround [here](https://forum.pdpatchrepo.info/topic/12820/replacement-for-list/3)).
* Heavy does not support numbers in `[unpack]`, e.g. `[unpack 0 0]` gives `Heavy only supports arguments 'f' and 's' to unpack.` Workaround is to use `f` instead, e.g. `[unpack f f]`, and if necessary prime the default values with a `[loadbang]` and `[0 0(`.
* Heavy does not accept arguments and control connections to: `[rzero~]`, `[rzero_rev~]`, `[czero~]`, `[czero_rev~]`. In Heavy, these objects accept only signal inputs. Arguments and control connections are ignored.


## Resources

* [Tutorials](https://www.rebeltech.org/tutorials/)
* [Pure data patches](https://www.rebeltech.org/patch-library/patches/tags/Pure%20Data)