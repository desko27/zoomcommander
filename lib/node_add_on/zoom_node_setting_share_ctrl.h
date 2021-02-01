#ifndef _ZOOM_NODE_SETTING_SHARE_CTRL_H_
#define _ZOOM_NODE_SETTING_SHARE_CTRL_H_
#include "zoom_node_common_include.h"
#include "zoom_native_sdk_wrap_core.h"
#include "zoom_singleton_wrap_class.h"

extern ZNativeSDKWrap _g_native_wrap;
class ZOOM_NODE_HIDE ZoomNodeSettingShareCtrlWrap :
	public ZoomWrapObject<ZoomNodeSettingShareCtrlWrap >
{
	friend class ZoomWrapObject<ZoomNodeSettingShareCtrlWrap >;
private:
	ZoomNodeSettingShareCtrlWrap();
	~ZoomNodeSettingShareCtrlWrap();
public:
	static void EnableAutoFitToWindowWhenViewSharing(const v8::FunctionCallbackInfo<v8::Value>& args);       
	static void IsAutoFitToWindowWhenViewSharingEnabled(const v8::FunctionCallbackInfo<v8::Value>& args);           
	static void EnableAutoFullScreenVideoWhenViewShare(const v8::FunctionCallbackInfo<v8::Value>& args);                       
	static void IsAutoFullScreenVideoWhenViewShareEnabled(const v8::FunctionCallbackInfo<v8::Value>& args);                     
	static void IsCurrentOSSupportAccelerateGPUWhenShare(const v8::FunctionCallbackInfo<v8::Value>& args);            
	static void EnableAccelerateGPUWhenShare(const v8::FunctionCallbackInfo<v8::Value>& args);                         
	static void IsAccelerateGPUWhenShareEnabled(const v8::FunctionCallbackInfo<v8::Value>& args);                     
	static void EnableRemoteControlAllApplications(const v8::FunctionCallbackInfo<v8::Value>& args);                   
	static void IsRemoteControlAllApplicationsEnabled(const v8::FunctionCallbackInfo<v8::Value>& args);              
	
	static v8::Persistent<v8::Function> constructor;
};
template<>
static void InitClassAttribute<ZoomNodeSettingShareCtrlWrap >(const v8::Local<v8::FunctionTemplate>& tpl, v8::Isolate* isolate)
{
	tpl->SetClassName(v8::String::NewFromUtf8(
		isolate, "ZoomNodeSettingShareCtrlWrap", v8::NewStringType::kInternalized).ToLocalChecked());
	tpl->InstanceTemplate()->SetInternalFieldCount(1);

	// Prototype
	
	NODE_SET_PROTOTYPE_METHOD(tpl, "EnableAutoFitToWindowWhenViewSharing", ZoomNodeSettingShareCtrlWrap::EnableAutoFitToWindowWhenViewSharing);       
	NODE_SET_PROTOTYPE_METHOD(tpl, "IsAutoFitToWindowWhenViewSharingEnabled", ZoomNodeSettingShareCtrlWrap::IsAutoFitToWindowWhenViewSharingEnabled);              
	NODE_SET_PROTOTYPE_METHOD(tpl, "EnableAutoFullScreenVideoWhenViewShare", ZoomNodeSettingShareCtrlWrap::EnableAutoFullScreenVideoWhenViewShare);           
	NODE_SET_PROTOTYPE_METHOD(tpl, "IsAutoFullScreenVideoWhenViewShareEnabled", ZoomNodeSettingShareCtrlWrap::IsAutoFullScreenVideoWhenViewShareEnabled);            
	NODE_SET_PROTOTYPE_METHOD(tpl, "IsCurrentOSSupportAccelerateGPUWhenShare", ZoomNodeSettingShareCtrlWrap::IsCurrentOSSupportAccelerateGPUWhenShare);           
	NODE_SET_PROTOTYPE_METHOD(tpl, "EnableAccelerateGPUWhenShare", ZoomNodeSettingShareCtrlWrap::EnableAccelerateGPUWhenShare);                            
	NODE_SET_PROTOTYPE_METHOD(tpl, "IsAccelerateGPUWhenShareEnabled", ZoomNodeSettingShareCtrlWrap::IsAccelerateGPUWhenShareEnabled);                         
	NODE_SET_PROTOTYPE_METHOD(tpl, "EnableRemoteControlAllApplications", ZoomNodeSettingShareCtrlWrap::EnableRemoteControlAllApplications);                       
	NODE_SET_PROTOTYPE_METHOD(tpl, "IsRemoteControlAllApplicationsEnabled", ZoomNodeSettingShareCtrlWrap::IsRemoteControlAllApplicationsEnabled);                    
}
template<>
static v8::Persistent<v8::Function>* GetConstructor<ZoomNodeSettingShareCtrlWrap >() {
	return &ZoomNodeSettingShareCtrlWrap::constructor;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


#endif
