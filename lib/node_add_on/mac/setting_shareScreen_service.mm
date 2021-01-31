#include "Header_include.h"
#include "sdk_native_error.h"
#include "../setting_share_wrap_core.h"

ZSettingShareWrap::ZSettingShareWrap()
{
    
}
ZSettingShareWrap::~ZSettingShareWrap()
{
    
}
void ZSettingShareWrap::Init()
{
    
}
void ZSettingShareWrap::Uninit()
{
    
}

ZNSDKError ZSettingShareWrap::EnableAutoFitToWindowWhenViewSharing(bool bEnable)
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKShareScreenSetting *shareScreen = [service getShareScreenSetting];
    if(!shareScreen){
        return ZNSDKERR_SERVICE_FAILED;
    }
    bool isEnable = IsAutoFitToWindowWhenViewSharingEnabled();
    if (isEnable == bEnable)
        return ZNSDKERR_SUCCESS;
    
    ZoomSDKError ret =[shareScreen enableSetShareScreen:bEnable SettingCmd:shareSettingCmd_AutoFitWindowWhenViewShare];
    nativeErrorTypeHelp  Help_type;
    return Help_type.ZoomSDKErrorType(ret);
}
bool ZSettingShareWrap::IsAutoFitToWindowWhenViewSharingEnabled()
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return false;
    }
    ZoomSDKShareScreenSetting *shareScreen = [service getShareScreenSetting];
    if(shareScreen){
        BOOL ret = [shareScreen isEnableToSettingShare:shareSettingCmd_AutoFitWindowWhenViewShare];
        return (ret == YES) ? true : false;
    }
    return false;
}
ZNSDKError ZSettingShareWrap::EnableAutoFullScreenVideoWhenViewShare(bool bEnable)
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKShareScreenSetting *shareScreen = [service getShareScreenSetting];
    if(!shareScreen){
        return ZNSDKERR_SERVICE_FAILED;
    }
    bool isEnable = IsAutoFullScreenVideoWhenViewShareEnabled();
    if (isEnable == bEnable)
        return ZNSDKERR_SUCCESS;
    
    ZoomSDKError ret =[shareScreen enableSetShareScreen:bEnable SettingCmd:shareSettingCmd_enterFullScreen];
    nativeErrorTypeHelp  Help_type;
    return Help_type.ZoomSDKErrorType(ret);
}
bool ZSettingShareWrap::IsAutoFullScreenVideoWhenViewShareEnabled()
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return false;
    }
    ZoomSDKShareScreenSetting *shareScreen = [service getShareScreenSetting];
    if(shareScreen){
        BOOL ret = [shareScreen isEnableToSettingShare:shareSettingCmd_enterFullScreen];
        return (ret == YES) ? true : false;
    }
    return false;
}
bool ZSettingShareWrap::IsCurrentOSSupportAccelerateGPUWhenShare()
{
    return false;
}
ZNSDKError ZSettingShareWrap::EnableAccelerateGPUWhenShare(bool bEnable)
{
    return ZNSDKERR_NO_IMPL;
}
ZNSDKError ZSettingShareWrap::IsAccelerateGPUWhenShareEnabled(bool& bEnable)
{
    return ZNSDKERR_NO_IMPL;
}
ZNSDKError ZSettingShareWrap::EnableRemoteControlAllApplications(bool bEnable)
{
    return ZNSDKERR_NO_IMPL;
}
bool ZSettingShareWrap::IsRemoteControlAllApplicationsEnabled()
{
    return false;
}
