## Max Gen OWL Patches

The OWL platform is capable of running patches created with Cycling'74 [Max Gen](https://cycling74.com/tutorials/gen~-for-beginners-part-1-a-place-to-start).

To create an OWL Gen patch using our online compiler, open the [Patch Library](https://www.rebeltech.org/patch-library/) with a Web MIDI enabled browser (e.g. Chrome), log in (create an account if necessary), go to [My Patches](https://www.rebeltech.org/patch-library/patches/my-patches/), and click Create patch. Now upload the .cpp and .h files produced by Max Gen, and (optionally) your .gendsp file. Select compilation type `gen`. Click `Save and Compile`, wait for compilation to finish, click `Connect To Device`, and then click `Load` to run the patch on the device. If you want to store it in a memory slot, click `Store` and select which slot to store it in.

## Examples

* [Gen Template Patch](https://www.rebeltech.org/patch-library/patch/GenTemplate)
* [Gen MIDI Test](https://www.rebeltech.org/patch-library/patch/Gen_MIDI_Test)

## Input Parameters

Input parameters are automatically assigned based on their names: A, B, C, et c. In Max Gen, `E` represents Euler's number, so instead we use `Exp` to assign to OWL parameter E. Buttons and input trigger/gates can be assigned with `ButtonA`, `ButtonB`, `ButtonC` and `ButtonD`.

## Output Parameters

To send a signal to the CV outputs of your device, simply add one or more extra audio outputs to your gen patch. These will be automatically assigned to CV output parameters: Output 3 will go to output parameter F, out 4 to parameter G et c.


## MIDI

Max Gen doesn't support MIDI messages directly, but you can still receive incoming note messages using some special parameters. [freq], [gain], and [gate] are automatically updated when Note On and Off messages are received. And [bend] responds to pitch bend changes. For a simple example synthesizer patch see [Gen MIDI Test](https://www.rebeltech.org/patch-library/patch/Gen_MIDI_Test).

## Resources

More documentation coming soon, meanwhile please see our excellent [tutorials](https://www.rebeltech.org/tutorials/).
