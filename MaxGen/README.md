## Max Gen OWL Patches

The OWL platform is capable of running patches created with Cycling'74 [Max Gen](https://cycling74.com/tutorials/gen~-for-beginners-part-1-a-place-to-start).

To create an OWL Gen patch using our online compiler, open the [Patch Library](https://www.rebeltech.org/patch-library/) with a Web MIDI enabled browser (e.g. Chrome), log in (create an account if necessary), go to [My Patches](https://www.rebeltech.org/patch-library/patches/my-patches/), and click Create patch. Now upload the .cpp and .h files produced by Max Gen, and (optionally) your .gendsp file. Select compilation type `gen`. Click `Save and Compile`, wait for compilation to finish, click `Connect To Device`, and then click `Load` to run the patch on the device. If you want to store it in a memory slot, click `Store` and select which slot to store it in.

More information on creating patches is available [here](../OWL_Patches/Creating_Patches.md).

There is also an OWL Package available which you can download using the Max package manager. [This Cycling'74 article](https://cycling74.com/articles/review-getting-to-know-the-owl-pedal-part-2) explains how to use it.

## Examples

* [Gen Template Patch](https://www.rebeltech.org/patch-library/patch/GenTemplate)
* [Gen MIDI Test](https://www.rebeltech.org/patch-library/patch/Gen_MIDI_Test)

## Signal Inputs and Outputs

Audio and CV signals enter and leave the patch by `in` and `out` objects.

In L : audio In automatically scaled to a -1 to 1 signal out of the `in 1` object in gen~
       CV In L (from 0 to 10V), scaled to a -1 to 1 signal out of the `in 1` object in gen~. Don’t know why but the signal is inverted in gen~, so you’ve to invert it back with the `* -1` object.

In R : audio In automatically scaled to a -1 to 1 signal out of the `in 2` object in gen~
       CV In R (from 0 to 10V), scaled to a -1 to 1 signal out of the `in 2` object in gen~. Same here, need to be inverted.

CVs In (A, B, C D) from 0 to 10 V are added to the corresponding knob value (from 0 to 1) and scaled to 0 to 1 before entering the gen~ `param` object.
By default, you get a scaled signal from `@min 0` to `@max 1` out of `param A`, or B, or C, or D object in gen~. The `@min` and `@max` param object attributes clamp and scale the signal again if needed.

If you set A CV full clockwise and pot A full clockwise too, you get a 0 to 11 signal which is clamped to 0 to 1. It is scaled/clamped again by the `@min` and `@max ` attributes from the `param` object in max. If you use A CV for pitch control from an external sequencer, you’ll notice some strange behaviours. In this particular case, what you can do is setting the A CV full clockwise and use the pot A as an offset.

For instance, if you use a Moog Mother 32 as a sequencer for your Lich, you’ll plug the KB output from the Mama to the A CV full clockwise of the Lich. Thinking that the mother KB output range is from -4V to +4V, every note that is under 0V will be a C0. You can then use the pot A to offset the A CV value by +4V !

Gate 1 and 2 normalized with the corresponding buttons: signal of 0 or 1 from `param ButtonA` or B object in gen~ according to the state of the gate in signal.

## Input Parameters

Input parameters are automatically assigned based on their names: A, B, C, D, et c. In Max Gen, `E` represents Euler's number, so instead we use `Exp` to assign to OWL parameter E. Buttons and input trigger/gates can be assigned with `ButtonA`, `ButtonB`, `ButtonC` and `ButtonD`. If you don't specify min, max and default attributes then the defaults are: `min 0`, `max 1`, and `default` is halfways between min and max.

## Output Parameters

Our online compiler generates patch metadata based on the information entered on the patch details page. This metadata is used to assign any 'extra' output channels that your gen~ patch may have. This way you can add CV outs, triggers, and gates in any combination, and assign them to any output.

In addition, the metadata includes all the parameter names entered on the patch details page. This means that on e.g. Magus, instead of showing `A`, `B` and `C`, the parameters can be given proper, meaningful names.

So in order to use output parameters (control voltage outputs) and buttons (gates/triggers) in a Max Gen OWL patch, you have to add an output channel for each one in your gen patch. Parameters should come first, then buttons, in the order they are assigned. E.g. first Parameter F and G, then Button 4 and 5.
After that, the parameters and buttons must be correctly defined on the patch details page. And when the patch metadata changes, the patch must be recompiled for the changes to have an effect.

In gen~ all outputs are audio signals, so to convert to CV outputs the values will be averaged each block. For triggers and gates, any value within the block that is over 0.5 will set the output high, otherwise it will be low. The values sent to these outputs (`out 3`, `out 4` and `out 5`) from gen~ should be scaled from 0.0 to 1.0 before entering to “out” object in gen~. Signal will be converted to full scale unipolar CV or trigger/gate output.

You can offset outputs 3 or 4 by adding tenths of volts. For instance adding 0.5 to the signal before leaving gen~ will offset the output by 5 V.

Finally, you’ll have to define out 3, out 4 and out 5 parameters using the online compiler as follow : https://community.rebeltech.org/uploads/default/original/1X/bb43042ec39b7fba9c945bf5137c2be407f34984.png

Don't forget to compile again the code before loading it to Lich : https://community.rebeltech.org/uploads/default/original/1X/19736bd36b247a9c7ae9c35b2bab91f23e32f354.jpeg

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
* [Max gen~ operators](https://docs.cycling74.com/max8/vignettes/gen~_operators)
