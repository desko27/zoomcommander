
#import "authServiceDelegate.h"
#include "../zoom_node_addon.h"
#include "../auth_service_wrap_core.h"
extern  ZNativeSDKWrap _g_native_wrap;
@implementation authServiceDelegate

+(authServiceDelegate *)share
{
    static authServiceDelegate *delegate = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        delegate = [[authServiceDelegate alloc] init];
    });
    return delegate;
}

-(instancetype)init
{
    self = [super init];
    if (self) {
        _authResult = ZNAUTHRET_NONE;
        _loginStatus = ZNLOGIN_IDLE;
        _directStatus = DirectShareStatus_None;
        return self;
    }
    return nil;
}

-(void)dealloc
{
    _authResult = ZNAUTHRET_NONE;
    _loginStatus = ZNLOGIN_IDLE;
    _directStatus = DirectShareStatus_None;
    [super dealloc];
}
- (void)onZoomSDKAuthReturn:(ZoomSDKAuthError)returnValue
{
    nativeErrorTypeHelp native_help;
    ZNAuthResult result = native_help.ZoomSDKAuthErrorTpye(returnValue);
    self.authResult = result;
    _g_native_wrap.GetAuthServiceWrap().onAuthenticationReturn(result);
}

- (void)onZoomSDKLoginResult:(ZoomSDKLoginStatus)loginStatus failReason:(ZoomSDKLoginFailReason)reason
{
    nativeErrorTypeHelp native_login_help;
    ZNLOGINSTATUS result = native_login_help.ZoomSDKLoginStatusType(loginStatus);
    self.loginStatus = result;
    ZNLoginFailReason failReason = ZNLoginFail_None;
    switch(reason){
        case ZoomSDKLoginFailReason_None:
            failReason = ZNLoginFail_None;
            break;
        case ZoomSDKLoginFailReason_EmailLoginDisabled:
            failReason = ZNLoginFail_EmailLoginDisable;
            break;
        case ZoomSDKLoginFailReason_UserNotExist:
            failReason = ZNLoginFail_UserNotExist;
            break;
        case ZoomSDKLoginFailReason_WrongPassword:
            failReason = ZNLoginFail_WrongPassword;
            break;
        case ZoomSDKLoginFailReason_AccountLocked:
            failReason = ZNLoginFail_AccountLocked;
            break;
        case ZoomSDKLoginFailReason_SDKNeedUpdate:
            failReason = ZNLoginFail_SDKNeedUpdate;
            break;
        case ZoomSDKLoginFailReason_TooManyFailedAttempts:
            failReason = ZNLoginFail_TooManyFailedAttempts;
            break;
        case ZoomSDKLoginFailReason_SMSCodeError:
            failReason = ZNLoginFail_SMSCodeError;
            break;
        case ZoomSDKLoginFailReason_SMSCodeExpired:
            failReason = ZNLoginFail_SMSCodeExpired;
            break;
        case ZoomSDKLoginFailReason_PhoneNumberFormatInValid:
            failReason = ZNLoginFail_PhoneNumberFormatInValid;
            break;
        case ZoomSDKLoginFailReason_Other_Issue:
            failReason = ZNLoginFail_OtherIssue;
            break;
        default:
            failReason = ZNLoginFail_OtherIssue;
            break;
    }
    _g_native_wrap.GetAuthServiceWrap().onLoginReturnWithReason(result,failReason);
}
- (void)onZoomSDKLogin:(ZoomSDKLoginStatus)loginStatus failReason:(NSString *)reason
{
    nativeErrorTypeHelp native_login_help;
    ZNLOGINSTATUS result = native_login_help.ZoomSDKLoginStatusType(loginStatus);
    self.loginStatus = result;
    _g_native_wrap.GetAuthServiceWrap().onLoginRet(result);
}

-(void)onZoomSDKLogout
{
    _g_native_wrap.GetAuthServiceWrap().onLogout();
}

-(void)onZoomIdentityExpired
{
    _g_native_wrap.GetAuthServiceWrap().onZoomIdentityExpired();
}

-(ZNAuthResult)getAuthResult
{
    return self.authResult;
}

-(ZNLOGINSTATUS)getLoginStatus
{
    return self.loginStatus;
}

-(void)onZoomAuthIdentityExpired
{
    _g_native_wrap.GetAuthServiceWrap().onZoomAuthIdentityExpired();
}
#pragma mark PremeetingServic
-(void)onListMeeting:(ZoomSDKPremeetingError)error MeetingList:(NSArray *)meetingList
{
    nativeErrorTypeHelp help;
    ZNPremeetingAPIResult result = help.ZNSDKPreMeetingError(error);
    ZNList<unsigned long long> list;
    if (meetingList.count == 0) {
        return;
    }
    for (ZoomSDKMeetingItem *item in meetingList) {
        long long meetingID = [item  getMeetingUniqueID];
        list.push_back(meetingID);
    }
    _g_native_wrap.GetPremeetingServiecWrap().onListMeeting(result, list);
}

-(void)onScheduleOrEditMeeting:(ZoomSDKPremeetingError)error MeetingUniqueID:(long long)meetingUniqueID
{
    nativeErrorTypeHelp help;
    ZNPremeetingAPIResult result = help.ZNSDKPreMeetingError(error);
    _g_native_wrap.GetPremeetingServiecWrap().onScheduleOrEditMeeting(result, meetingUniqueID);
}

-(void)onDeleteMeeting:(ZoomSDKPremeetingError)error
{
    nativeErrorTypeHelp help;
    ZNPremeetingAPIResult result = help.ZNSDKPreMeetingError(error);
    _g_native_wrap.GetPremeetingServiecWrap().onDeleteMeeting(result);
}

#pragma direct share
-(void)onDirectShareStatusReceived:(DirectShareStatus)status DirectShareReceived:(ZoomSDKDirectShareHandler *)handler
{
    nativeErrorTypeHelp help;
    ZNDirectShareStatus  ZNStatus = help.ZNSDKDirectShareStatus(status);
    self.directStatus = status;
    self.DirectShareHandler = handler;
    _g_native_wrap.GetAuthServiceWrap().GetDirectShareHelper().OnDirectShareStatusUpdate(ZNStatus);
}

-(void)onGetInviteEmailContent:(NSString *)content result:(ZoomSDKPremeetingError)result meetingUniqueID:(long long)meetingUniqueID
{
    ZNPremeetingAPIResult ret = ZN_PREMETAPIRET_UNKNOW;
    switch (result) {
        case ZoomSDKPremeetingError_Unknown:
            ret = ZN_PREMETAPIRET_UNKNOW;
            break;
        case ZoomSDKPremeetingError_Success:
            ret = ZN_PREMETAPIRET_SUCCESS;
            break;
        case ZoomSDKPremeetingError_Failed:
            ret = ZN_PREMETAPIRET_FAILED;
            break;
        case ZoomSDKPremeetingError_TimeOut:
            ret = ZN_PREMETAPIRET_TIMEOUT;
            break;
        default:
            break;
    }
    NSString* emailContent = nil;
    if (!content) {
        emailContent = @"";
    }else{
        emailContent = content;
    }
    _g_native_wrap.GetPremeetingServiecWrap().onGetInviteEmailContent(ret, meetingUniqueID, emailContent.UTF8String);
    
}
-(DirectShareStatus)getDirectShare
{
    return self.directStatus;
}

-(ZoomSDKDirectShareHandler *)getDirectShareHandler
{
    return self.DirectShareHandler;
}

@end
