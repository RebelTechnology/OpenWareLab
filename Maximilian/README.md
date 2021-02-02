## Maximilian OWL Patches

OpenWare supports compiling and running [Maximilian](https://github.com/micknoise/Maximilian/) patches.

### Instructions
The easiest way to run Maximilian code on an OWL device is to use our online compiler. Go to [the patch library](https://www.rebeltech.org/patch-library/patches/my-patches/) and, if necessary, create an account. Then click on My Patches, Create patch, and upload the .cpp file that your patch is in. Make sure to specify Compilation type `maximilian`, and select the correct Main File (this should be your main .cpp file).

You can also compile Maximilian patches offline using [OwlProgram](https://github.com/pingdynasty/OwlProgram). For details on using OwlProgram, see the project readme.

## Inputs and Outputs

### Input Parameters
We have introduced the `maxiParam` object to allow easy control of patch parameters. Simply declare a `maxiParam` instead of a `double`, and use it the same way. It will then be automatically assigned to an OWL parameter. By default the value range is 0 to 1.0, and the given parameter name is "A", "B" et c. This can be changed in the `setup()` function like so:

```
maxiParam freq; // declare the parameter

void setup() {
    freq.minValue = 20;
    freq.maxValue = 2000;
    freq.name = "Frequency";
    freq = 440; // set initial value
}
```

Within the code the `maxiParam` can be used just like a double, because it overloads the `(double)` cast and assignment operators.

### Examples

- Amplitude Modulation: [Maximilian AM1](https://www.rebeltech.org/patch-library/patch/Maximilian_AM1)
- Simple synth with user parameters: [Maximilian Monosynth](https://www.rebeltech.org/patch-library/patch/Maximilian_Monosynth)

## Known Bugs and Limitations
* Samples (maxiSample) are not yet supported
* OpenWare uses single precision floats instead of doubles. Filters might blow up more easily.
* Output parameters (i.e. CV out) is not yet supported
* MIDI is not yet supported
* Buttons, gates and triggers are not yet supported

## Resources

* [Maximilian GitHub repo](https://github.com/micknoise/Maximilian/)
