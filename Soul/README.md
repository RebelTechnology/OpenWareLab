## SOUL OWL Patches

OpenWare has preliminary support for [SOUL](https://soul.dev/) patches. It is early days, and some things may not work so well yet!

### Instructions
The easiest way to run a SOUL patch on an OWL device is to use our online compiler. Go to [the patch library](https://www.rebeltech.org/patch-library/patches/my-patches/) and, if necessary, create an account. Then click on My Patches, Create patch, and upload the .soul and .soulpatch files that your patch requires. Make sure to specify Compilation type `soul`, and select the correct Main File (this should be your .soulpatch file if you have one, but you can also just use a single .soul file).

A current limitation is that the main graph must have the same name as the patch file, as this name is also used by the code generator for the main class.

You can also compile SOUL patches offline using [OwlProgram](https://github.com/pingdynasty/OwlProgram) and a local installation of [soul](https://github.com/soul-lang/SOUL). For details on using OwlProgram, see the project readme.

## Inputs and Outputs

### Input Parameters
SOUL patch parameters will be automatically mapped to OWL parameters in the order that they are specified. The value is scaled to the min and max specified in the SOUL patch, and the initial value is set in the patch constructor.

### Output Parameters
Not yet supported

### Buttons, Gates and Triggers
Not yet supported

### Examples

- Audio effect: [SOUL Delay](https://www.rebeltech.org/patch-library/patch/SOUL_Delay)
- MIDI synth: [SOUL SineSynth](https://www.rebeltech.org/patch-library/patch/SOUL_SineSynth)

## MIDI

Patches can receive MIDI input.

## Known Bugs and Limitations
* Samples and other resources are not yet supported
* Performance is not great, some examples don't work in realtime (e.g. Reverb, PadSynth, TX patches)

## Resources

* [SOUL Website](https://soul.dev/)
* [SOUL GitHub Project](https://github.com/soul-lang/SOUL)
