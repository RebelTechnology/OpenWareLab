## C++ OWL Patches

To use the OWL Patch API, all you have to do is create a class that derives from Patch and implement the processAudio() method. See the [API Documentation](https://www.rebeltech.org/docs/) for details, 


## Memory Management

OWL Patches supports user allocated heap memory (new/delete and malloc/free), using a custom allocation method. If heap is used, then all heap memory must be allocated in the patch constructor, and care must be taken to free all used memory in the destructor.


## Library Support
All functions defined in the standard math.h library are available, but processing-intensive functions should be avoided if possible, or their use should be minimised. The ARM CMSIS-DSP libraries are also available to use, with very useful functionality including FFT, FIR and convolution. Some standard math.h functions have been replaced with ARM optimised code:

* sin() / sinf()
* cos() / cosf()
* exp() / expf()
* pow() / powf()

OWL Patches are compiled with single precision floats, not doubles. Use of doubles should be avoided.

## Language Standard
OWL Patches are written in standard C++, compiled using the Gnu ARM gcc cross-compiler, which supports many C++0x and C++11 language features. If you want your patches to compile for other platforms, you may need to be more conservative with newer language features. In particular, Visual Studio C++ doesn't support some C99 features such as variable length arrays.

## Naming Convention
Classes should be named in UpperCamelCase; methods, functions and variables in lowerCamelCase.

Patches should be named after their function, e.g. FuzzPatch, and be located in a .hpp file called e.g. FuzzPatch.hpp. It is fine to use several files and `#include` the headers, both with C and C++ implementations. All `.c` and `.cpp` files in the patch directory will be compiled as separate compilation units and linked in.

## Patch Lifecycle

When the patch constructor is called, the blocksize, sample rate and number of channels will always be known. All memory allocation and setup should be done in the constructor, not on the first call to `processAudio()`.

## Inputs and Outputs

### Parameters

In the patch constructor, the patch should register the name and assignment of the parameters that it uses.

```
    registerParameter(PARAMETER_A, "Gain");
```
In the patch, a float value in the range 0.0 (inclusive) to 1.0 (exclusive) represents the parameter setting, and can be retrieved like so:

```
    float gain = getParameterValue(PARAMETER_A);
```

To set the value of an output parameter (e.g. a parameter assigned to a CV output) use `setParameterValue()`. Again the value should be in the rage `[0, 1)`.

```
  void setParameterValue(PatchParameterId pid, float value);
```

### Buttons, Gates and Triggers

Buttons can be read with `isButtonPressed()`:

```
if(isButtonPressed(BUTTON_B))
```

Additionally a callback method exists which you can override to handle button changes:

```
  void buttonChanged(PatchButtonId bid, uint16_t value, uint16_t samples){
    switch(bid){
    case BUTTON_A:
...
```

Output trigger/gates can be controlled with `setButton()`:

```
  setButton(PUSHBUTTON, true);
```

## MIDI

Incoming MIDI messages are passed on to the `processMidi()` callback method. Override this to provide your own MIDI handling procedures:

```
  void processMidi(MidiMessage msg){
    if(msg.isNoteOn()){
...
```

To send MIDI messages, use `sendMidi(MidiMessage msg)`. The MidiMessage class has convencience functions for creating common message types:

```
      sendMidi(MidiMessage::note(channel, note, velocity));
```

See the [MidiMessage API](https://www.rebeltech.org/docs/classMidiMessage.html) for more useful information.
