#pragma once
#include "zoom_native_sdk_wrap_core_def.h"

class ZSettingShareWrap
{
public:
	ZSettingShareWrap();
	virtual ~ZSettingShareWrap();
	void Init();
	void Uninit();

	ZNSDKError EnableAutoFitToWindowWhenViewSharing(bool bEnable);
	bool IsAutoFitToWindowWhenViewSharingEnabled();
	ZNSDKError EnableAutoFullScreenVideoWhenViewShare(bool bEnable);
	bool IsAutoFullScreenVideoWhenViewShareEnabled();
	bool IsCurrentOSSupportAccelerateGPUWhenShare();
	ZNSDKError EnableAccelerateGPUWhenShare(bool bEnable);
	ZNSDKError IsAccelerateGPUWhenShareEnabled(bool& bEnable);
	ZNSDKError EnableRemoteControlAllApplications(bool bEnable);
	bool IsRemoteControlAllApplicationsEnabled();
};
