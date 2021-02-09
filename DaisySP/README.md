# DaisySP

OWL patches in C++ can use objects from the [DaisySP library](https://electro-smith.github.io/DaisySP/index.html) directly. While it was written to run on Daisy platform, there's nothing preventing compatibility with OWL patches in its code.


## DaisySP patch structure

Integrating DaisySP into an OWL patch takes just a few simple steps:

1. Import main library header by adding `#include "daisysp.h"`

2. Import libray namespace into current patch with `using namespace daisysp;` statement

3. Add required objects as patch members. It's also possible to use object pointer and create objects dynamically in constructor to delay memory allocation.

4. Call each object's `::Init()` method in patch constructor. Most objects require passing sample rate, so it becomes something like `object.Init(getSampleRate());`

5. Update object parameters with `object.Set*()` calls inside your patch's `processAudio(...)` method

6. Generate object audio by calling `object.Process(...);` inside a for-loop once for every sample.


## Example patch

[Filthy kick](https://www.rebeltech.org/patch-library/patch/FilthyKick) shows how to use all of the above.
