#include "zoom_node_setting_share_ctrl.h"


ZoomNodeSettingShareCtrlWrap::ZoomNodeSettingShareCtrlWrap()
{

}

ZoomNodeSettingShareCtrlWrap::~ZoomNodeSettingShareCtrlWrap()
{

}
void ZoomNodeSettingShareCtrlWrap::EnableAutoFitToWindowWhenViewSharing(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableAutoFitToWindowWhenViewSharingParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableAutoFitToWindowWhenViewSharingParams >(args, proto_params))
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		if (!proto_params.has_benable())
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		bool _bEnable = false;
		convertBool(proto_params.benable(), _bEnable);

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().EnableAutoFitToWindowWhenViewSharing(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}

void ZoomNodeSettingShareCtrlWrap::IsAutoFitToWindowWhenViewSharingEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bDisable = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().IsAutoFitToWindowWhenViewSharingEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bDisable);
	args.GetReturnValue().Set(bret);
}

void ZoomNodeSettingShareCtrlWrap::EnableAutoFullScreenVideoWhenViewShare(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableAutoFullScreenVideoWhenViewShareParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableAutoFullScreenVideoWhenViewShareParams >(args, proto_params))
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		if (!proto_params.has_benable())
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		bool _bEnable = false;
		convertBool(proto_params.benable(), _bEnable);

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().EnableAutoFullScreenVideoWhenViewShare(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingShareCtrlWrap::IsAutoFullScreenVideoWhenViewShareEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bEnable = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().IsAutoFullScreenVideoWhenViewShareEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bEnable);
	args.GetReturnValue().Set(bret);
}

void ZoomNodeSettingShareCtrlWrap::IsCurrentOSSupportAccelerateGPUWhenShare(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bEnable = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().IsCurrentOSSupportAccelerateGPUWhenShare();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bEnable);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingShareCtrlWrap::EnableAccelerateGPUWhenShare(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableAccelerateGPUWhenShareParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableAccelerateGPUWhenShareParams >(args, proto_params))
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		if (!proto_params.has_benable())
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		bool _bEnable = false;
		convertBool(proto_params.benable(), _bEnable);

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().EnableAccelerateGPUWhenShare(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingShareCtrlWrap::IsAccelerateGPUWhenShareEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	auto context = isolate->GetCurrentContext();
	bool zn_bEnable = false;
	ZNSDKError err = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().IsAccelerateGPUWhenShareEnabled(zn_bEnable);
	v8::HandleScope scope(isolate);
	v8::Local<v8::Object> node = v8::Object::New(isolate);
	node->Set(context, v8::String::NewFromUtf8(isolate, "err", v8::NewStringType::kInternalized).ToLocalChecked(), v8::Integer::New(isolate, (int32_t)err));
	node->Set(context, v8::String::NewFromUtf8(isolate, "bEnable", v8::NewStringType::kInternalized).ToLocalChecked(), v8::Boolean::New(isolate, zn_bEnable));

	args.GetReturnValue().Set(node);
}
void ZoomNodeSettingShareCtrlWrap::EnableRemoteControlAllApplications(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableRemoteControlAllApplicationsParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableRemoteControlAllApplicationsParams >(args, proto_params))
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		if (!proto_params.has_benable())
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		bool _bEnable = false;
		convertBool(proto_params.benable(), _bEnable);

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().EnableRemoteControlAllApplications(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingShareCtrlWrap::IsRemoteControlAllApplicationsEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bEnable = _g_native_wrap.GetSettingServiceWrap().GetSettingShareCtrl().IsRemoteControlAllApplicationsEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bEnable);
	args.GetReturnValue().Set(bret);
}
