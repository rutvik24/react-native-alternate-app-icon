#include <jni.h>
#include "AlternateAppIconOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::alternateappicon::initialize(vm);
}