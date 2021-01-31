#pragma once
#include <node.h>
#include <v8.h>
#include "electron_sdk.pb.h"
#if (V8_MAJOR_VERSION >= 7)
#define USING_V8_NEW_STRING
#endif

#if (defined WIN32)
#define WIN32_LEAN_AND_MEAN
#include <Windows.h>
#endif
#include <node_object_wrap.h>

#include "zoom_v8_to_c.h"
#ifdef WIN32
#define ZOOM_NODE_HIDE
#else
#define ZOOM_NODE_HIDE __attribute__((visibility("hidden")))
#endif
