#pragma once
#include "../common_include.h"
#include "../camera_controller_wrap.h"
BEGIN_ZOOM_SDK_NAMESPACE
class IMeetingServiceWrap;
IMeetingVideoController* InitIMeetingVideoControllerFunc(IMeetingVideoCtrlEvent* pEvent, IMeetingServiceWrap* pOwner);
void UninitIMeetingVideoControllerFunc(IMeetingVideoController* obj);
BEGIN_CLASS_DEFINE_WITHCALLBACK(IMeetingVideoController, IMeetingVideoCtrlEvent)
NORMAL_CLASS(IMeetingVideoController)
INIT_UNINIT_WITHEVENT_AND_OWNSERVICE(IMeetingVideoController, IMeetingServiceWrap)
virtual SDKError SetEvent(IMeetingVideoCtrlEvent* pEvent)
{
	external_cb = pEvent;
	return SDKERR_SUCCESS;
}
//virtual SDKError MuteVideo() = 0;
DEFINE_FUNC_0(MuteVideo, SDKError)
//virtual SDKError UnmuteVideo() = 0;
DEFINE_FUNC_0(UnmuteVideo, SDKError)
//virtual SDKError CanPinToFirstView(unsigned int userid, PinResult& result) = 0;
DEFINE_FUNC_2(CanPinToFirstView, SDKError, unsigned int, userid, PinResult&, result)
//virtual SDKError UnPinVideoFromFirstView(unsigned int userid) = 0;
DEFINE_FUNC_1(UnPinVideoFromFirstView, SDKError, unsigned int, userid)
//virtual SDKError UnPinAllVideosFromFirstView() = 0;
DEFINE_FUNC_0(UnPinAllVideosFromFirstView, SDKError)
//virtual IList<unsigned int >* GetPinnedUserListFromFirstView() = 0;
DEFINE_FUNC_0(GetPinnedUserListFromFirstView, IList<unsigned int >*)
//virtual SDKError CanPinToSecondView(unsigned int userid, PinResult& result) = 0;
DEFINE_FUNC_2(CanPinToSecondView, SDKError, unsigned int, userid, PinResult&, result)
//virtual SDKError PinVideoToSecondView(unsigned int userid) = 0;
DEFINE_FUNC_1(PinVideoToSecondView, SDKError, unsigned int, userid)
//virtual SDKError UnPinVideoFromSecondView(unsigned int userid) = 0;
DEFINE_FUNC_1(UnPinVideoFromSecondView, SDKError, unsigned int, userid)
//virtual IList<unsigned int >* GetPinnedUserListFromSecondView() = 0;
DEFINE_FUNC_0(GetPinnedUserListFromSecondView, IList<unsigned int >*)
//virtual SDKError CanSpotlight(unsigned int userid, SpotlightResult& result) = 0;
DEFINE_FUNC_2(CanSpotlight, SDKError, unsigned int, userid, SpotlightResult&, result)
//virtual SDKError CanUnSpotlight(unsigned int userid, SpotlightResult& result) = 0;
DEFINE_FUNC_2(CanUnSpotlight, SDKError, unsigned int, userid, SpotlightResult&, result)
//virtual SDKError UnSpotlightVideo(unsigned int userid) = 0;
DEFINE_FUNC_1(UnSpotlightVideo, SDKError, unsigned int, userid)
//virtual SDKError UnSpotlightAllVideos() = 0;
DEFINE_FUNC_0(UnSpotlightAllVideos, SDKError)
//virtual IList<unsigned int >* GetSpotlightedUserList() = 0;
DEFINE_FUNC_0(GetSpotlightedUserList, IList<unsigned int >*)
//virtual SDKError PinVideo(bool bPin, bool bFirstView, unsigned int userid) = 0;
DEFINE_FUNC_1(PinVideoToFirstView, SDKError, unsigned int, userid)
//virtual SDKError SpotlightVideo(bool bSpotlight, unsigned int userid) = 0;
DEFINE_FUNC_1(SpotlightVideo, SDKError, unsigned int, userid)
//virtual SDKError HideOrShowNoVideoUserOnVideoWall(bool bHide) = 0;
DEFINE_FUNC_1(HideOrShowNoVideoUserOnVideoWall, SDKError, bool, bHide)
//virtual SDKError CanAskAttendeeToStartVideo(unsigned int userid) = 0;
DEFINE_FUNC_1(CanAskAttendeeToStartVideo, SDKError, unsigned int, userid)
//virtual SDKError AskAttendeeToStartVideo(unsigned int userid) = 0;
DEFINE_FUNC_1(AskAttendeeToStartVideo, SDKError, unsigned int, userid)
//virtual SDKError CanStopAttendeeVideo(unsigned int userid) = 0;
DEFINE_FUNC_1(CanStopAttendeeVideo, SDKError, unsigned int, userid)
//virtual SDKError StopAttendeeVideo(unsigned int userid) = 0;
DEFINE_FUNC_1(StopAttendeeVideo, SDKError, unsigned int, userid)

#if (defined UserInterfaceClass)
private:
//virtual ICameraController* GetMyCameraController() = 0;
DEFINE_FUNC_0(GetMyCameraController, ICameraController*)
public:
#define T_GetMyCameraController _GetMyCameraController
#else
#define T_GetMyCameraController GetMyCameraController
#endif
DEFINE_FUNC_AND_MEMBER(T_GetMyCameraController, ICameraControllerWrap)


//virtual void onUserVideoStatusChange(unsigned int userId, VideoStatus status) = 0;
CallBack_FUNC_2(onUserVideoStatusChange, unsigned int, userId, VideoStatus, status)
//virtual void onSpotlightVideoChangeNotification(bool bSpotlight, unsigned int userid) = 0;
CallBack_FUNC_2(onSpotlightVideoChangeNotification, bool, bSpotlight, unsigned int, userid)
//	virtual void onHostRequestStartVideo(IRequestStartVideoHandler* handler_) = 0;
CallBack_FUNC_1(onHostRequestStartVideo, IRequestStartVideoHandler*, handler_)
//virtual void onActiveSpeakerVideoUserChanged(unsigned int userid) = 0;
CallBack_FUNC_1(onActiveSpeakerVideoUserChanged, unsigned int, userid)
//virtual void onActiveVideoUserChanged(unsigned int userid) = 0;
CallBack_FUNC_1(onActiveVideoUserChanged, unsigned int, userid)
END_CLASS_DEFINE(IMeetingVideoController)
END_ZOOM_SDK_NAMESPACE