

#include "../meeting_participants_wrap_core.h"
#include "../meeting_service_wrap_core.h"
#include "Header_include.h"
#include "sdk_native_error.h"
ZMeetingParticipantsWrap &ZMeetingServiceWrap::GetMeetingParticipantsCtrl()
{
    return m_meeting_participants_ctrl;
}

ZMeetingParticipantsWrap::ZMeetingParticipantsWrap()
{
    m_pSink = 0;
}

ZMeetingParticipantsWrap::~ZMeetingParticipantsWrap()
{
    m_pSink = 0;
}

void ZMeetingParticipantsWrap::Init()
{
    
}

void ZMeetingParticipantsWrap::Uninit()
{
    
}

void ZMeetingParticipantsWrap::SetSink(ZNativeSDKMeetingParticipantsWrapSink *pSink)
{
    m_pSink = pSink;
}

ZNUserInfomation ZMeetingParticipantsWrap::GetUserInfomationByUserID(unsigned int userid)
{
    ZNUserInfomation user;
    user.userInfoType = ZN_FAKE_USERINFO;
    ZoomSDKMeetingService *service = [[ZoomSDK sharedSDK] getMeetingService];
    if (!service) {
        return user;
    }
    ZoomSDKMeetingActionController *controller = [service getMeetingActionController];
    if (!controller) {
        return user;
    }
    ZoomSDKUserInfo *userInfo = [controller getUserByUserID:userid];
    if (!userInfo) {
        return user;
    }
    NSString *usName = [userInfo getUserName];
    if (!usName) {
        usName = @"";
    }
    user.userName = usName.UTF8String;
    /*
    NSString *usEmail = [userInfo getEmail];
    if (!usEmail) {
        usEmail = @"";
    }
    user.email = usEmail.UTF8String;
     */
    bool ishost = [userInfo isHost];
    user.isHost = ishost;
    unsigned int usID = [userInfo getUserID];
    user.userID = usID;
    bool isVon = [userInfo  isVideoOn];
    user.isVideoOn = isVon;
    bool isAon = [userInfo isAudioMuted];
    user.isAudioMuted = isAon;
    bool isSelf = [userInfo isMySelf];
    user.isMySelf = isSelf;
    UserRole roles = [userInfo getUserRole];
    nativeErrorTypeHelp  Help_type;
    user.userRole = Help_type.ZNSDKUserRole(roles);
    bool  isPPU = [userInfo isPurePhoneUser];
    user.isPurePhoneUser = isPPU;
    ZoomSDKWebinarAttendeeStatus *webinar = [userInfo GetWebinarAttendeeStatus];
    bool isAttend = webinar.isAttendeeCanTalk;
    user.webinarAttendeeStatus = isAttend;
    ZoomSDKAudioStatus status = [userInfo getAudioStatus];
    ZNAudioStatus znStatus = Help_type.ZNSDKUserAudioStatus(status);
    user.audioStatus = znStatus;
    user.userInfoType = ZN_REAL_USERINFO;
    NSString *participantID = [userInfo getParticipantID];
    if (!participantID) {
        participantID = @"";
    }
    user.participantID = [participantID UTF8String];

    return user;
}

ZNSDKError ZMeetingParticipantsWrap::LowerHand(unsigned int userid)
{
    ZoomSDKMeetingService *service = [[ZoomSDK sharedSDK] getMeetingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKMeetingActionController *action = [service getMeetingActionController];
    if (action) {
        ZoomSDKError ret = [action raiseHand:NO UserID:userid];
        nativeErrorTypeHelp  Help_type;
        return Help_type.ZoomSDKErrorType(ret);
    }
    return ZNSDKERR_SERVICE_FAILED;
}

ZNSDKError ZMeetingParticipantsWrap::LowerAllHands()
{
    ZoomSDKMeetingService *service = [[ZoomSDK sharedSDK] getMeetingService];
    if (!service){
        return ZNSDKERR_SERVICE_FAILED;
    }
    ZoomSDKMeetingActionController *action = [service getMeetingActionController];
    if (action) {
        ZoomSDKError ret = [action actionMeetingWithCmd:ActionMeetingCmd_LowerAllHands userID:0 onScreen:ScreenType_First];
        nativeErrorTypeHelp  Help_type;
        return Help_type.ZoomSDKErrorType(ret);
    }
    return ZNSDKERR_SERVICE_FAILED;
}


ZNList<unsigned int> ZMeetingParticipantsWrap::GetParticipantsList()
{
    ZNList<unsigned int> list;
    ZoomSDKMeetingService *service = [[ZoomSDK sharedSDK] getMeetingService];
    if (!service) {
        return list;
    }
    ZoomSDKMeetingActionController  *action = [service getMeetingActionController];
    if (!action) {
        return list;
    }
    NSArray *listArr = [action getParticipantsList];
    for (NSNumber *userid in listArr) {
        unsigned int ID = userid.intValue;
        list.push_back(ID);
    }
    return list;
}

//callback
void ZMeetingParticipantsWrap::onHostChangeNotification(unsigned int userId)
{
    if (m_pSink)
    {
        m_pSink->onHostChangeNotification(userId);
    }
}

void ZMeetingParticipantsWrap::onUserJoin(std::vector<unsigned int> lstUserID, std::string strUserList)
{
    if (m_pSink)
    {
        m_pSink->onUserJoin(lstUserID,strUserList);
    }
}

void ZMeetingParticipantsWrap::onLowOrRaiseHandStatusChange(unsigned int userId, bool isRaisedHand)
{
    if (m_pSink)
    {
        m_pSink->onLowOrRaiseHandStatusChange(userId,isRaisedHand);
    }
}

void ZMeetingParticipantsWrap::onUserNameChange(unsigned int userId, ZoomSTRING userName)
{
    if (m_pSink)
    {
        m_pSink->onUserNameChange(userId,userName);
    }
}


void ZMeetingParticipantsWrap::onUserLeft(std::vector<unsigned int> lstUserID, std::string strUserList)
{
    if (m_pSink)
    {
        m_pSink->onUserLeft(lstUserID,strUserList);
    }
}
