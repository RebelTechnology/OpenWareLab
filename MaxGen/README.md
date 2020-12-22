## Max Gen OWL Patches

The OWL platform is capable of running patches created with Cycling'74 [Max Gen](https://cycling74.com/tutorials/gen~-for-beginners-part-1-a-place-to-start).

To create an OWL Gen patch using our online compiler, open the [Patch Library](https://www.rebeltech.org/patch-library/) with a Web MIDI enabled browser (e.g. Chrome), log in (create an account if necessary), go to [My Patches](https://www.rebeltech.org/patch-library/patches/my-patches/), and click Create patch. Now upload the .cpp and .h files produced by Max Gen, and (optionally) your .gendsp file. Select compilation type `gen`. Click `Save and Compile`, wait for compilation to finish, click `Connect To Device`, and then click `Load` to run the patch on the device. If you want to store it in a memory slot, click `Store` and select which slot to store it in.

## Examples

* [Gen Template Patch](https://www.rebeltech.org/patch-library/patch/GenTemplate)
* [Gen MIDI Test](https://www.rebeltech.org/patch-library/patch/Gen_MIDI_Test)


## Signal Inputs and Outputs

Audio signals enter and leave the patch by `in` and `out` objects; index 1 and 2 correspond to left and right audio inputs. Full scale signals are in the range -1 to 1.


## Input Parameters

Input parameters are automatically assigned based on their names: A, B, C, D, et c. In Max Gen, `E` represents Euler's number, so instead we use `Exp` to assign to OWL parameter E. Buttons and input trigger/gates can be assigned with `ButtonA`, `ButtonB`, `ButtonC` and `ButtonD`. If you don't specify min, max and default attributes then the defaults are: `min 0`, `max 1`, and `default` is halfways between min and max.

## Output Parameters

To send a signal to the CV outputs of your device, simply add one or more extra audio outputs to your gen patch. These will be automatically assigned to CV output parameters: Output 3 will go to output parameter F, out 4 to parameter G et c. Signal values from 0 to 1 are converted to full scale CV output.


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
