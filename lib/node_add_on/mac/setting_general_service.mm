#include "../setting_general_wrap_core.h"
#include "../meeting_service_wrap_core.h"
#include "sdk_native_error.h"
#import "Header_include.h"
ZSettingGeneralWrap::ZSettingGeneralWrap()
{
    
}

ZSettingGeneralWrap::~ZSettingGeneralWrap()
{
    
}

void ZSettingGeneralWrap::Init()
{
    
}

void ZSettingGeneralWrap::Uninit()
{
    
}

ZNSDKError ZSettingGeneralWrap::EnableDualScreenMode(bool bEnable)
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(general){
        ZoomSDKError ret =[general enableMeetingSetting:bEnable SettingCmd:MeetingSettingCmd_DualScreenMode];
        nativeErrorTypeHelp  Help_type;
        return Help_type.ZoomSDKErrorType(ret);
    }
    return ZNSDKERR_SERVICE_FAILED;
}

ZNSDKError ZSettingGeneralWrap::TurnOffAeroModeInSharing(bool bEnable)
{
    return ZNSDKERR_NO_IMPL;
}

ZNSDKError ZSettingGeneralWrap::EnableAutoFullScreenVideoWhenJoinMeeting(bool bEnable)
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(general){
        
        ZoomSDKError ret =[general enableMeetingSetting:bEnable SettingCmd:MeetingSettingCmd_AutoFullScreenWhenJoinMeeting];
        nativeErrorTypeHelp  Help_type;
        return Help_type.ZoomSDKErrorType(ret);
    }
    return ZNSDKERR_SERVICE_FAILED;
}

ZNSDKError ZSettingGeneralWrap::EnableSplitScreenMode(bool bEnable)
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(general){
        ZoomSDKError ret =[general enableSetShareScreen:bEnable SettingCmd:shareSettingCmd_sideToSideMode];
        nativeErrorTypeHelp  Help_type;
        return Help_type.ZoomSDKErrorType(ret);
    }
    return ZNSDKERR_SERVICE_FAILED;
}

bool ZSettingGeneralWrap::IsDualScreenModeEnabled()
{
    return false;
}

bool ZSettingGeneralWrap::IsAeroModeInSharingTurnOff()
{
    return false;
}


bool ZSettingGeneralWrap::IsAutoFullScreenVideoWhenJoinMeetingEnabled()
{
    return false;
}

bool ZSettingGeneralWrap::IsSplitScreenModeEnabled()
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return false;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(general){
        BOOL ret = [general isEnableToSettingShare:shareSettingCmd_sideToSideMode];
        return (ret == YES) ? true : false;
    }
    return false;
}

ZNSDKError ZSettingGeneralWrap::EnableDisplayReminderWindowWhenExit(bool bEnable)
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(!general){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKError ret =[general  setConfirmLeavingMeeting:bEnable];
    nativeErrorTypeHelp  Help_type;
    return Help_type.ZoomSDKErrorType(ret);
}

bool ZSettingGeneralWrap::IsDisplayReminderWindowWhenExitEnabled()
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return false;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(general){
        BOOL ret = [general isEnableConfirmLeavingMeeting];
        return (ret == YES) ? true : false;
    }
    return false;
}

ZNSDKError ZSettingGeneralWrap::EnableShowMyMeetingElapseTime(bool bEnable)
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(!general){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKError ret =[general enableToShowMeetingTime:bEnable];
    nativeErrorTypeHelp  Help_type;
    return Help_type.ZoomSDKErrorType(ret);
}

bool ZSettingGeneralWrap::IsShowMyMeetingElapseTimeEnabled()
{
    ZoomSDKSettingService *service = [[ZoomSDK sharedSDK] getSettingService];
    if (!service){
        return false;
    }
    ZoomSDKGeneralSetting *general = [service getGeneralSetting];
    if(general){
        BOOL ret = [general isShowLockMeetingTime];
        return (ret == YES) ? true : false;
    }
    return false;
}
