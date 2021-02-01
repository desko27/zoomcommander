#include "zoom_node_setting_general_ctrl.h"


ZoomNodeSettingGeneralCtrlWrap::ZoomNodeSettingGeneralCtrlWrap()
{

}

ZoomNodeSettingGeneralCtrlWrap::~ZoomNodeSettingGeneralCtrlWrap()
{

}
void ZoomNodeSettingGeneralCtrlWrap::EnableDualScreenMode(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableDualScreenModeParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableDualScreenModeParams >(args, proto_params))
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

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().EnableDualScreenMode(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::TurnOffAeroModeInSharing(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::TurnOffAeroModeInSharingParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::TurnOffAeroModeInSharingParams >(args, proto_params))
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		if (!proto_params.has_bturnoff())
		{
			err = ZNSDKERR_INVALID_PARAMETER;
			break;
		}
		bool _bTureOff = false;
		convertBool(proto_params.bturnoff(), _bTureOff);

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().TurnOffAeroModeInSharing(_bTureOff);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}

void ZoomNodeSettingGeneralCtrlWrap::EnableAutoFullScreenVideoWhenJoinMeeting(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableAutoFullScreenVideoWhenJoinMeetingParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableAutoFullScreenVideoWhenJoinMeetingParams >(args, proto_params))
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

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().EnableAutoFullScreenVideoWhenJoinMeeting(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::EnableSplitScreenMode(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableSplitScreenModeParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableSplitScreenModeParams >(args, proto_params))
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

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().EnableSplitScreenMode(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::IsDualScreenModeEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bDisable = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().IsDualScreenModeEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bDisable);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::IsAeroModeInSharingTurnOff(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bDisable = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().IsAeroModeInSharingTurnOff();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bDisable);
	args.GetReturnValue().Set(bret);
}

void ZoomNodeSettingGeneralCtrlWrap::IsAutoFullScreenVideoWhenJoinMeetingEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bDisable = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().IsAutoFullScreenVideoWhenJoinMeetingEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bDisable);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::IsSplitScreenModeEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bDisable = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().IsSplitScreenModeEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bDisable);
	args.GetReturnValue().Set(bret);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void ZoomNodeSettingGeneralCtrlWrap::EnableDisplayReminderWindowWhenExit(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableDisplayReminderWindowWhenExitParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableDisplayReminderWindowWhenExitParams >(args, proto_params))
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

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().EnableDisplayReminderWindowWhenExit(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::IsDisplayReminderWindowWhenExitEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bEnable = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().IsDisplayReminderWindowWhenExitEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bEnable);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::EnableShowMyMeetingElapseTime(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	ZNSDKError err = ZNSDKERR_SUCCESS;
	do
	{
		com::electron::sdk::proto::EnableShowMyMeetingElapseTimeParams proto_params;
		if (!SetProtoParam<com::electron::sdk::proto::EnableShowMyMeetingElapseTimeParams >(args, proto_params))
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

		err = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().EnableShowMyMeetingElapseTime(_bEnable);
	} while (false);
	
	v8::Local<v8::Integer> bret = v8::Integer::New(isolate, (int32_t)err);
	args.GetReturnValue().Set(bret);
}
void ZoomNodeSettingGeneralCtrlWrap::IsShowMyMeetingElapseTimeEnabled(const v8::FunctionCallbackInfo<v8::Value>& args)
{
	v8::Isolate* isolate = args.GetIsolate();
	bool zn_bEnable = _g_native_wrap.GetSettingServiceWrap().GetSettingGeneralCtrl().IsShowMyMeetingElapseTimeEnabled();
	v8::Local<v8::Boolean> bret = v8::Boolean::New(isolate, zn_bEnable);
	args.GetReturnValue().Set(bret);
}
