#include "meeting_video_wrap.h"
#include "../meeting_service_wrap.h"
BEGIN_ZOOM_SDK_NAMESPACE
IMeetingVideoController* InitIMeetingVideoControllerFunc(IMeetingVideoCtrlEvent* pEvent, IMeetingServiceWrap* pOwner)
{
	if (pOwner && pOwner->GetSDKObj())
	{
		ZOOM_SDK_NAMESPACE::IMeetingVideoController* pObj = pOwner->GetSDKObj()->GetMeetingVideoController();
		if (pObj)
		{
			pObj->SetEvent(pEvent);
		}
		return pObj;
	}

	return NULL;
}

void UninitIMeetingVideoControllerFunc(IMeetingVideoController* obj)
{
	if (obj)
	{
		obj->SetEvent(NULL);
	}
}

//virtual SDKError MuteVideo() = 0;
IMPL_FUNC_0(IMeetingVideoController, MuteVideo, SDKError, SDKERR_UNINITIALIZE)
//virtual SDKError UnmuteVideo() = 0;
IMPL_FUNC_0(IMeetingVideoController, UnmuteVideo, SDKError, SDKERR_UNINITIALIZE)
//virtual SDKError PinVideo(bool bPin, bool bFirstView, unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, PinVideoToFirstView, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError CanPinToFirstView(unsigned int userid, PinResult& result) = 0;
IMPL_FUNC_2(IMeetingVideoController, CanPinToFirstView, SDKError, unsigned int, userid, PinResult&, result, SDKERR_UNINITIALIZE)
//virtual SDKError UnPinVideoFromFirstView(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, UnPinVideoFromFirstView, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError UnPinAllVideosFromFirstView() = 0;
IMPL_FUNC_0(IMeetingVideoController, UnPinAllVideosFromFirstView, SDKError, SDKERR_UNINITIALIZE)
//virtual IList<unsigned int >* GetPinnedUserListFromFirstView() = 0;
IMPL_FUNC_0(IMeetingVideoController, GetPinnedUserListFromFirstView, IList<unsigned int >*, NULL)
//virtual SDKError CanPinToSecondView(unsigned int userid, PinResult& result) = 0;
IMPL_FUNC_2(IMeetingVideoController, CanPinToSecondView, SDKError, unsigned int, userid, PinResult&, result, SDKERR_UNINITIALIZE)
//virtual SDKError PinVideoToSecondView(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, PinVideoToSecondView, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError UnPinVideoFromSecondView(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, UnPinVideoFromSecondView, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual IList<unsigned int >* GetPinnedUserListFromSecondView() = 0;
IMPL_FUNC_0(IMeetingVideoController, GetPinnedUserListFromSecondView, IList<unsigned int >*, NULL)
//virtual SDKError CanSpotlight(unsigned int userid, SpotlightResult& result) = 0;
IMPL_FUNC_2(IMeetingVideoController, CanSpotlight, SDKError, unsigned int, userid, SpotlightResult&, result, SDKERR_UNINITIALIZE)
//virtual SDKError CanUnSpotlight(unsigned int userid, SpotlightResult& result) = 0;
IMPL_FUNC_2(IMeetingVideoController, CanUnSpotlight, SDKError, unsigned int, userid, SpotlightResult&, result, SDKERR_UNINITIALIZE)
//virtual SDKError UnSpotlightVideo(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, UnSpotlightVideo, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError UnSpotlightAllVideos() = 0;
IMPL_FUNC_0(IMeetingVideoController, UnSpotlightAllVideos, SDKError, SDKERR_UNINITIALIZE)
//virtual IList<unsigned int >* GetSpotlightedUserList() = 0;
IMPL_FUNC_0(IMeetingVideoController, GetSpotlightedUserList, IList<unsigned int >*, NULL)
//virtual SDKError SpotlightVideo(bool bSpotlight, unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, SpotlightVideo, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError HideOrShowNoVideoUserOnVideoWall(bool bHide) = 0;
IMPL_FUNC_1(IMeetingVideoController, HideOrShowNoVideoUserOnVideoWall, SDKError, bool, bHide, SDKERR_UNINITIALIZE)
//virtual SDKError CanAskAttendeeToStartVideo(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, CanAskAttendeeToStartVideo, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError AskAttendeeToStartVideo(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, AskAttendeeToStartVideo, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError CanStopAttendeeVideo(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, CanStopAttendeeVideo, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)
//virtual SDKError StopAttendeeVideo(unsigned int userid) = 0;
IMPL_FUNC_1(IMeetingVideoController, StopAttendeeVideo, SDKError, unsigned int, userid, SDKERR_UNINITIALIZE)

#if (defined UserInterfaceClass)
//virtual ICameraController* GetMyCameraController() = 0;
IMPL_FUNC_0(IMeetingVideoController, GetMyCameraController, ICameraController*, NULL)
#endif
IMPL_FUNC_AND_MEMBER(IMeetingVideoController, T_GetMyCameraController, ICameraControllerWrap)

END_ZOOM_SDK_NAMESPACE