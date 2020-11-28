## C++ OWL Patches

To make an OWL Patch, all you have to do is create a class that derives from Patch and implement the `processAudio()` method. See the [API Documentation](https://www.rebeltech.org/docs/) for reference.


## Memory Management

OWL Patches supports user allocated heap memory (new/delete and malloc/free), using a custom allocation method. If heap is used, then all heap memory must be allocated in the patch constructor, and care must be taken to free all used memory in the destructor. Most classes in the OWL Patch Library provide static `create()` and `destroy()` methods, which should be used instead of RAII.


## Library Support
The OWL Patch API includes many efficient and easy to use implementations of common DSP classes.
Additionally, all functions defined in the standard math.h library are available. Some standard math.h functions have been replaced with ARM optimised code, such as `sin()`, `cos()`, exponential and logarithmic functions.
OWL Patches are compiled with single precision floats, not doubles. Use of doubles should be avoided.

## Language Standard
OWL Patches are written in standard C++, compiled using the Gnu ARM gcc cross-compiler, which supports many C++0x and C++11 language features. If you want your patches to compile for other platforms, you may need to be more conservative with newer language features. In particular, Visual Studio C++ doesn't support some C99 features such as variable length arrays.
To make efficient code with minimal overheads, certain things should be avoided. In particular exceptions, and libraries that use them such as the Standard Template Library (std::vector, std::string et c).

## Naming Convention
Classes should be named in UpperCamelCase; methods, functions and variables in lowerCamelCase.

Patches should be named after their function, e.g. `FuzzPatch`, and be located in a .hpp file called e.g. `FuzzPatch.hpp`. It is fine to use several files and `#include` the headers, both with C and C++ implementations. All `.c` and `.cpp` files in the patch directory will be compiled as separate compilation units and linked in.

## Patch Lifecycle

When the patch constructor is called, the blocksize, sample rate and number of channels will always be known. All memory allocation and setup should be done in the constructor, not on the first call to `processAudio()`.

## Inputs and Outputs
### Parameters

In the patch constructor, the patch should register the name and assignment of the parameters that it uses. Output parameters (e.g CV outputs) should be suffixed with a `>` character.

```
    registerParameter(PARAMETER_A, "Gain");
    registerParameter(PARAMETER_G, "LFO>");
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


### Audio
The first class you should get familiar with is `FloatArray`, which contains a channel of audio. It is delivered to you in a `SampleBuffer` in the `processAudio()` callback.

```
  void processAudio(AudioBuffer &buffer){
    FloatArray left = buffer.getSamples(LEFT_CHANNEL);
    FloatArray right = buffer.getSamples(RIGHT_CHANNEL);
```

`FloatArray` is written so that you can pretend that it is a an actual array of floats, or a `float*`.

```
   float sample = left[i];
```

The job of an OWL Patch is to replace the incoming audio samples with some new output audio. The same `FloatArray` object is used for both purposes: first you read the samples, then you write them. A simple stereo gain patch that simply multiplies each sample by a scalar could look like this:

```
class GainPatch : public Patch {
public:
  GainPatch(){
    registerParameter(PARAMETER_A, "Gain");
  }

  void processAudio(AudioBuffer &buffer){
    float gain = getParameterValue(PARAMETER_A);
    FloatArray left = buffer.getSamples(LEFT_CHANNEL);
    FloatArray right = buffer.getSamples(RIGHT_CHANNEL);
    for(int i=0; i<buffer.getSize(); ++i){
      left[i] = gain*left[i];
      right[i] = gain*right[i];
    }
  }
};
```

`FloatArray` defines many useful methods. In this case, instead of iterating over each sample in the buffer, we could have just called:

```
   left.multiply(gain);
```
to scale the level of every sample in the buffer. For more information see the [FloatArray API](https://www.rebeltech.org/docs/classFloatArray.html).

FloatArrays are also very useful for other things, like delay buffers, samples, filter coefficients. To allocate a new FloatArray on the heap, use its static `create()` and `destroy()` methods, and make sure to only do this within the call stack of the patch constructor and destructor. The same applies to many other classes in our library. On an embedded device, we don't want to allocate any memory in the audio processing functions, because this will lead to fragmentation and a heap of problems. So to speak. So instead we call our `create()` and `destroy()` functions like this:

```
class EchoPatch : public Patch {
private:
  FloatArray buffer;
public:
  EchoPatch(){
    registerParameter(PARAMETER_A, "Gain");
    // create a 1024 samples long buffer
    buffer = FloatArray::create(1024);
  }
  ~EchoPatch(){
    FloatArray::destroy(buffer);
  }
};
```

FloatArray is a very light-weight object (it only wraps a `float*` and a `size_t`) which is why we use value semantics instead of pointers or references. Other objects, such as [BiquadFilter](https://www.rebeltech.org/docs/classBiquadFilter.html) (used for cascaded high/low/notch/shelf filters), are passed by pointer.


### MIDI

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

## Screen Patches
For hardware that have an OLED screen (such as Magus) you can write to its screen buffer directly in a callback method. To enable the callback, instead of extending the `Patch` base class, extend `MonochromeScreenPatch`, and overload its `processScreen()` callback:

```
class MyScreenPatch : public MonchromeScreenPatch {
    void processScreen(MonochromeScreenBuffer& screen){
       ...
    }
};
```

Most common `draw` functions are available in the ScreenBuffer class, such as `drawLine()`, `drawCircle()` and `drawRectangle()`, and methods for writing text. See the [ScreenBuffer API](https://www.rebeltech.org/docs/classScreenBuffer.html) for details.
