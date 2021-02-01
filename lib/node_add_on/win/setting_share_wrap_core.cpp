
#include "../setting_share_wrap_core.h"
#include "wrap/sdk_wrap.h"
#include "zoom_native_to_wrap.h"

ZSettingShareWrap::ZSettingShareWrap()
{
	
}
ZSettingShareWrap::~ZSettingShareWrap()
{
	Uninit();
}
void ZSettingShareWrap::Init()
{
	
}
void ZSettingShareWrap::Uninit()
{
	
}
ZNSDKError ZSettingShareWrap::EnableAutoFitToWindowWhenViewSharing(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		err = Map2WrapDefine(pShareSettingContext->EnableAutoFitToWindowWhenViewSharing(bEnable));
	}
	return err;

}
bool ZSettingShareWrap::IsAutoFitToWindowWhenViewSharingEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		b_isEnabled = pShareSettingContext->IsAutoFitToWindowWhenViewSharingEnabled();
	}
	return b_isEnabled;

}
ZNSDKError ZSettingShareWrap::EnableAutoFullScreenVideoWhenViewShare(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		err = Map2WrapDefine(pShareSettingContext->EnableAutoFullScreenVideoWhenViewShare(bEnable));
	}
	return err;
}
bool ZSettingShareWrap::IsAutoFullScreenVideoWhenViewShareEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		b_isEnabled = pShareSettingContext->IsAutoFullScreenVideoWhenViewShareEnabled();
	}
	return b_isEnabled;

}
bool ZSettingShareWrap::IsCurrentOSSupportAccelerateGPUWhenShare()
{
	bool b_isSupport = false;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		b_isSupport = pShareSettingContext->IsCurrentOSSupportAccelerateGPUWhenShare();
	}
	return b_isSupport;

}
ZNSDKError ZSettingShareWrap::EnableAccelerateGPUWhenShare(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		err = Map2WrapDefine(pShareSettingContext->EnableAccelerateGPUWhenShare(bEnable));
	}
	return err;
}
ZNSDKError ZSettingShareWrap::IsAccelerateGPUWhenShareEnabled(bool& bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		err = Map2WrapDefine(pShareSettingContext->IsAccelerateGPUWhenShareEnabled(bEnable));
	}
	return err;
}
ZNSDKError ZSettingShareWrap::EnableRemoteControlAllApplications(bool bEnable)
{
	ZNSDKError err = ZNSDKERR_UNKNOWN;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		err = Map2WrapDefine(pShareSettingContext->EnableRemoteControlAllApplications(bEnable));
	}
	return err;
}
bool ZSettingShareWrap::IsRemoteControlAllApplicationsEnabled()
{
	bool b_isEnabled = false;
	ZOOM_SDK_NAMESPACE::IShareSettingContext* pShareSettingContext = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetShareSettings();
	if (pShareSettingContext)
	{
		b_isEnabled = pShareSettingContext->IsRemoteControlAllApplicationsEnabled();
	}
	return b_isEnabled;

}