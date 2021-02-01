
#include "../setting_general_wrap_core.h"
#include "wrap/sdk_wrap.h"
#include "zoom_native_to_wrap.h"

ZSettingGeneralWrap::ZSettingGeneralWrap()
{
	
}
ZSettingGeneralWrap::~ZSettingGeneralWrap()
{
	Uninit();
}
void ZSettingGeneralWrap::Init()
{
	
}
void ZSettingGeneralWrap::Uninit()
{
	
}
ZNSDKError ZSettingGeneralWrap::EnableDualScreenMode(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		err = Map2WrapDefine(pGeneralSettingContext->EnableDualScreenMode(bEnable));
	}
	return err;
}
ZNSDKError ZSettingGeneralWrap::TurnOffAeroModeInSharing(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		err = Map2WrapDefine(pGeneralSettingContext->TurnOffAeroModeInSharing(bEnable));
	}
	return err;
	
}
ZNSDKError ZSettingGeneralWrap::EnableAutoFullScreenVideoWhenJoinMeeting(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		err = Map2WrapDefine(pGeneralSettingContext->EnableAutoFullScreenVideoWhenJoinMeeting(bEnable));
	}
	return err;
	
}
ZNSDKError ZSettingGeneralWrap::EnableSplitScreenMode(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		err = Map2WrapDefine(pGeneralSettingContext->EnableSplitScreenMode(bEnable));
	}
	return err;
	
}
bool ZSettingGeneralWrap::IsDualScreenModeEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		b_isEnabled = pGeneralSettingContext->IsDualScreenModeEnabled();
	}
	return b_isEnabled;
	
}
bool ZSettingGeneralWrap::IsAeroModeInSharingTurnOff()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		b_isEnabled = pGeneralSettingContext->IsAeroModeInSharingTurnOff();
	}
	return b_isEnabled;
	
}

bool ZSettingGeneralWrap::IsAutoFullScreenVideoWhenJoinMeetingEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		b_isEnabled = pGeneralSettingContext->IsAutoFullScreenVideoWhenJoinMeetingEnabled();
	}
	return b_isEnabled;
	
}
bool ZSettingGeneralWrap::IsSplitScreenModeEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		b_isEnabled = pGeneralSettingContext->IsSplitScreenModeEnabled();
	}
	return b_isEnabled;
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ZNSDKError ZSettingGeneralWrap::EnableDisplayReminderWindowWhenExit(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		err = Map2WrapDefine(pGeneralSettingContext->EnableDisplayReminderWindowWhenExit(bEnable));
	}
	return err;
}
bool ZSettingGeneralWrap::IsDisplayReminderWindowWhenExitEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		b_isEnabled = pGeneralSettingContext->IsDisplayReminderWindowWhenExitEnabled();
	}
	return b_isEnabled;

}
ZNSDKError ZSettingGeneralWrap::EnableShowMyMeetingElapseTime(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		err = Map2WrapDefine(pGeneralSettingContext->EnableShowMyMeetingElapseTime(bEnable));
	}
	return err;
}
bool ZSettingGeneralWrap::IsShowMyMeetingElapseTimeEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IGeneralSettingContext* pGeneralSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetGeneralSettings();
	if (pGeneralSettingContext)
	{
		b_isEnabled = pGeneralSettingContext->IsShowMyMeetingElapseTimeEnabled();
	}
	return b_isEnabled;

}