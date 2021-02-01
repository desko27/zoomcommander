#pragma once
#include "zoom_native_sdk_wrap_core_def.h"

class ZSettingGeneralWrap
{
public:
	ZSettingGeneralWrap();
	virtual ~ZSettingGeneralWrap();
	void Init();
	void Uninit();

	ZNSDKError EnableDualScreenMode(bool bEnable);
	ZNSDKError TurnOffAeroModeInSharing(bool bEnable);
	ZNSDKError EnableAutoFullScreenVideoWhenJoinMeeting(bool bEnable);
	ZNSDKError EnableSplitScreenMode(bool bEnable);
	bool IsDualScreenModeEnabled();
	bool IsAeroModeInSharingTurnOff();
	bool IsAutoFullScreenVideoWhenJoinMeetingEnabled();
	bool IsSplitScreenModeEnabled();

	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	ZNSDKError EnableDisplayReminderWindowWhenExit(bool bEnable);
	bool IsDisplayReminderWindowWhenExitEnabled();

	ZNSDKError EnableShowMyMeetingElapseTime(bool bEnable);
	bool IsShowMyMeetingElapseTimeEnabled();
};
