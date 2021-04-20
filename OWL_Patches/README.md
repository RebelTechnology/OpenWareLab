## Creating OWL Patches

OWL patches can be programmed in any of the supported languages:
* [Pure Data](PureData)
* [FAUST](Faust)
* [C++](CPlusPlus)
* [Max Gen](MaxGen)
* [SOUL](Soul)
* [Maximilian](Maximilian)
* [DaisySP](DaisySP)

Regardless of language, there are primarily two ways [1] of creating and loading a patch. The easiest is to use our online patch library, but it is also quite straightforward to set up a local, i.e. offline, build environment with simple command line tools.

[1] For Max Gen, there is also an OWL Package available which makes it possible to compile and load patches from within Max. See the [Max Gen](MaxGen) instructions for more details.

### Online Instructions
To create an OWL patch using our online compiler, open the [Patch Library](https://www.rebeltech.org/patch-library/) with a Web MIDI enabled browser (e.g. Chrome), log in (create an account if necessary), go to [My Patches](https://www.rebeltech.org/patch-library/patches/my-patches/), and click Create patch. Now upload your patch files, which can be
* .cpp, .c, .hpp, .h for C++ patches
* .pd for Pure Data
* .dsp for FAUST
* .gendsp plus the generated .cpp and .h files produced by Max Gen
* .cpp for Maximilian
* .soul and optionally .soulpatch for SOUL

Make sure the correct 'main file' is selected. This should be where your C++ Patch class resides, or the Pure Data top level, or main, patch file. Select the appropriate compilation type, then click `Save and Compile`. Wait for compilation to finish, click `Connect To Device`, and then click `Load` to run the patch on the device. If you want to store it in a memory slot, click `Store` and select which slot to store it in.

To update the files, change the compilation type or main file, or remove patch files, simply click on the `+` icon next to the file tabs on the patch details page. Uploading files with the same name as an existing one will update that copy of the file on the server.

Instead of uploading files, you can also link directly to files in a GitHub repo. To do so, simply copy-paste a link to the file. The latest version of the linked files will be requested each time the patch is compiled.

### Offline Instructions
You can also compile OWL patches offline using [OwlProgram](https://github.com/pingdynasty/OwlProgram). For details on using OwlProgram, please see the [project readme](https://github.com/pingdynasty/OwlProgram/blob/develop/README.md).
