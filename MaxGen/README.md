## Max Gen OWL Patches

The OWL platform is capable of running patches created with Cycling'74 [Max Gen](https://cycling74.com/tutorials/gen~-for-beginners-part-1-a-place-to-start).

To create an OWL Gen patch using our online compiler, open the [Patch Library](https://www.rebeltech.org/patch-library/) with a Web MIDI enabled browser (e.g. Chrome), log in (create an account if necessary), go to [My Patches](https://www.rebeltech.org/patch-library/patches/my-patches/), and click Create patch. Now upload the .cpp and .h files produced by Max Gen, and (optionally) your .gendsp file. Select compilation type `gen`. Click `Save and Compile`, wait for compilation to finish, click `Connect To Device`, and then click `Load` to run the patch on the device. If you want to store it in a memory slot, click `Store` and select which slot to store it in.

More information on creating patches is available [here](../OWL_Patches/Creating_Patches.md).

There is also an OWL Package available which you can download using the Max package manager. [This Cycling'74 article](https://cycling74.com/articles/review-getting-to-know-the-owl-pedal-part-2) explains how to use it.

## Examples

* [Gen Template Patch](https://www.rebeltech.org/patch-library/patch/GenTemplate)
* [Gen MIDI Test](https://www.rebeltech.org/patch-library/patch/Gen_MIDI_Test)

## Signal Inputs and Outputs

Audio signals enter and leave the patch by `in` and `out` objects; index 1 and 2 correspond to left and right audio inputs. Full scale signals are in the range -1 to 1.


## Input Parameters

Input parameters are automatically assigned based on their names: A, B, C, D, et c. In Max Gen, `E` represents Euler's number, so instead we use `Exp` to assign to OWL parameter E. Buttons and input trigger/gates can be assigned with `ButtonA`, `ButtonB`, `ButtonC` and `ButtonD`. If you don't specify min, max and default attributes then the defaults are: `min 0`, `max 1`, and `default` is halfways between min and max.

## Output Parameters

Our online compiler generates patch metadata based on the information entered on the patch details page. This metadata is used to assign any 'extra' output channels that your gen~ patch may have. This way you can add CV outs, triggers, and gates in any combination, and assign them to any output.

In addition, the metadata includes all the parameter names entered on the patch details page. This means that on e.g. Magus, instead of showing `A`, `B` and `C`, the parameters can be given proper, meaningful names.

So in order to use output parameters (control voltage outputs) and buttons (gates/triggers) in a Max Gen OWL patch, you have to add an output channel for each one in your gen patch. Parameters should come first, then buttons, in the order they are assigned. E.g. first Parameter F and G, then Button 4 and 5.
After that, the parameters and buttons must be correctly defined on the patch details page. And when the patch metadata changes, the patch must be recompiled for the changes to have an effect.

In gen~ all outputs are audio signals, so to convert to CV outputs the values will be averaged each block. For triggers and gates, any value within the block that is over 0.5 will set the output high, otherwise it will be low. The values sent to these outputs from gen~ should be from 0.0 to 1.0, which will be converted to full scale CV or trigger/gate output.

A simple example using output parameters can be seen and tried [here](https://www.rebeltech.org/patch-library/patch/Gen_Metadata_Test). It simply maps input parameters A and B to output parameters F and G, and buttons 1 and 2 to output buttons 4 and 5.

If you are using the OWL Watcher within Max, then you will have to follow the link to our patch library to edit the patch details there.

## Extended Parameters

Even if your target device has a limited number of hardware controls, you can still use extended parameters which you can control over MIDI. For example, the Lich has knobs and CV for parameters A, B, C and D. If you add parameters E, F, G and H in your patch, you will be able to control them with MIDI CC messages. Same goes for parameters AA to AH, and BA to BH, et c, giving you up to 40 software parameters that can be assigned. More information on MIDI Mappings is available [here](../OWL_Patches/MIDI_Mappings.md).

## MIDI

Max Gen doesn't support MIDI messages directly, but you can still receive incoming note messages using some special parameters. [freq], [gain], and [gate] are automatically updated when Note On and Off messages are received. And [bend] responds to pitch bend changes. For a simple example synthesizer patch see [Gen MIDI Test](https://www.rebeltech.org/patch-library/patch/Gen_MIDI_Test).

## Known Bugs and Limitations

The OWL platform uses optimised implementations of some mathematical operations, such as trigonometric, exponential and logarithmic functions. This provides a significant performance improvement, but comes at the cost of precision. Normally this will be entirely negligible. In some cases however, such as certain filters operating at very low or very high frequencies, this difference may be distinct and audible. To disable these optimised functions, place any or all of the following `undef` directives in the .cpp file produced by gen, right after the `#include` section:

```
#undef sinf
#undef cosf
#undef sqrt
#undef powf
#undef expf
#undef exp2f
#undef exp10f
#undef logf
#undef log2f
#undef log10f
```

You can also disable exponential and logarithmic optimisations by removing the `-ffast-math` compilation flag.

Another difference is that the hardware uses 32-bit single floating point precision, while Max on a desktop operates with 64-bit double precision floats. We've not identified any case of audible difference due to this.


## Resources

* [Tutorials](https://www.rebeltech.org/tutorials/)
* [Max gen patches](https://www.rebeltech.org/patch-library/patches/tags/MaxMSP)
