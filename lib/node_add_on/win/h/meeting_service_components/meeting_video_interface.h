/*!
* \file meeting_video_interface.h
* \brief Meeting Service Video Interface
* 
*/
#ifndef _MEETING_VIDEO_INTERFACE_H_
#define _MEETING_VIDEO_INTERFACE_H_
#include "..\zoom_sdk_def.h"
#include "..\zoom_sdk_util_define.h"
BEGIN_ZOOM_SDK_NAMESPACE

/*! \enum VideoStatus
    \brief The video status of the user.
    Here are more detailed structural descriptions.
*/
enum VideoStatus
{
	Video_ON, ///<Video is on.
	Video_OFF, ///<Video is off.
	Video_Mute_ByHost, ///<Video is muted by host.
};

/// \brief Process after the user receives the requirement from the host to turn on the video.
class IRequestStartVideoHandler
{
public:
	virtual ~IRequestStartVideoHandler(){};
	/// \brief Get the user ID who asks to turn on the video.
	/// \return If the function succeeds, the return value is the user ID. FALSE 0.
	virtual unsigned int GetReqFromUserId() = 0;
	/// \brief Instance to ignore the requirement, return nothing and finally self-destroy.
	virtual SDKError Ignore() = 0;
	/// \brief Instance to accept the requirement, turn on the video and finally self-destroy.
	virtual SDKError Accept() = 0;
	
	/// \brief Ignore the request to enable the video in the meeting and finally the instance self-destroys.
	virtual SDKError Cancel() = 0;
};

/// \brief Meeting video controller event callback
///
class IMeetingVideoCtrlEvent
{
public:
	/// \brief Callback event of the user video status changes.
	/// \param userId The user ID whose video status changes
	/// \param status New video status. For more details, see \link VideoStatus \endlink enum.
	virtual void onUserVideoStatusChange(unsigned int userId, VideoStatus status) = 0;

	/// \brief Callback event of the user video spotlight status changes. 
	/// \param bSpotlight TRUE indicates that the video is currently spotlighted.
	/// \param userid The ID of user whose spotlight status changes.
	virtual void onSpotlightVideoChangeNotification(bool bSpotlight, unsigned int userid) = 0;

	/// \brief Callback event of the requirement to turn on the video from the host.
	/// \param handler_ A pointer to the IRequestStartVideoHandler. For more details, see \link IRequestStartVideoHandler \endlink.
	virtual void onHostRequestStartVideo(IRequestStartVideoHandler* handler_) = 0;

	/// \brief Callback event of the active speaker video user changes. 
	/// \param userid The ID of user who becomes the new active speaker.
	virtual void onActiveSpeakerVideoUserChanged(unsigned int userid) = 0;

	/// \brief Callback event of the active video user changes. 
	/// \param userid The ID of user who becomes the new active speaker.
	virtual void onActiveVideoUserChanged(unsigned int userid) = 0;
};

enum PinResult
{
	PinResult_Success = 0,
	PinResult_Fail_NotEnoughUsers,  /// user counts less than 2
	PinResult_Fail_ToMuchPinnedUsers, /// pinned user counts more than 9
	PinResult_Fail_UserCannotBePinned, /// user in view only mode or silent mode or active
	PinResult_Fail_VideoModeDoNotSupport, /// other reasons	
	PinResult_Fail_NoPrivilegeToPin,  /// current user has no privilege to pin
	PinResult_Fail_MeetingDoNotSupport, /// webinar and in view only meeting
	PinResult_Unknown = 100,
};

enum SpotlightResult
{
	SpotResult_Success = 0,
	SpotResult_Fail_NotEnoughUsers,  /// user counts less than 2
	SpotResult_Fail_ToMuchSpotlightedUsers, /// spotlighted user counts is more than 9
	SpotResult_Fail_UserCannotBeSpotlighted, /// user in view only mode or silent mode or active
	SpotResult_Fail_UserWithoutVideo, /// user doesn't turn on video
	SpotResult_Fail_NoPrivilegeToSpotlight,  /// current user has no privilege to spotlight
	SpotResult_Fail_UserNotSpotlighted, ///user is not spotlighted
	SpotResult_Unknown = 100,
};
/// \brief Meeting video controller interface
///
class IMeetingVideoController
{
public:
	/// \brief Set the meeting video controller callback event handler
	/// \param pEvent A pointer to the IRequestStartVideoHandler that receives the video controller event. 
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	virtual SDKError SetEvent(IMeetingVideoCtrlEvent* pEvent) = 0;
	
	/// \brief Turn off the user's own video.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid for both Zoom style and customize user interface mode.
	virtual SDKError MuteVideo() = 0;

	/// \brief Turn on the user's own video.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid for both Zoom style and customize user interface mode.
	virtual SDKError UnmuteVideo() = 0;

	/// \brief Determine if it is able to pin the video of the specified user to the first view. 
	/// \param userid Specifies the user ID to be determined.
	/// \param [out] result Indicates if it is able to pin. It validates only when the return value is SDKErr_Success.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode. 
	virtual SDKError CanPinToFirstView(unsigned int userid, PinResult& result) = 0;

	/// \brief Pin the video of the assigned user to the first view.
	/// \param userid Specifies the user ID to be pinned. 
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode. 
	virtual SDKError PinVideoToFirstView(unsigned int userid) = 0;

	/// \brief Unpin the video of the assigned user from the first view.
	/// \param userid Specifies the user ID to be unpinned. 
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode. 
	virtual SDKError UnPinVideoFromFirstView(unsigned int userid) = 0;

	/// \brief Unpin all the videos from the first view.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual SDKError UnPinAllVideosFromFirstView() = 0;

	/// \brief Get the list of all the pinned user in the first view.
	/// \return If the function succeeds, the return value is the list of the pinned user in the first view.
	///Otherwise failed, the return value is NULL.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual IList<unsigned int >* GetPinnedUserListFromFirstView() = 0;

	/// \brief Determine if it is able to pin the video of the specified user to the second view. 
	/// \param userid Specifies the user ID to be determined.
	/// \param [out] result Indicates if it is able to pin. It validates only when the return value is SDKErr_Success.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode. 
	virtual SDKError CanPinToSecondView(unsigned int userid, PinResult& result) = 0;

	/// \brief Pin the video of the assigned user to the second view.
	/// \param userid Specifies the user ID to be pinned. 
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode. 
	virtual SDKError PinVideoToSecondView(unsigned int userid) = 0;

	/// \brief Unpin the video of the assigned user from the second view.
	/// \param userid Specifies the user ID to be unpinned. 
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode. 
	virtual SDKError UnPinVideoFromSecondView(unsigned int userid) = 0;

	/// \brief Get the list of all the pinned user in the second view.
	/// \return If the function succeeds, the return value is the list of the pinned user in the second view.
	///Otherwise failed, the return value is NULL.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual IList<unsigned int >* GetPinnedUserListFromSecondView() = 0;

	/// \brief Determine if it is able to spotlight the video of the specified user in the meeting. 
	/// \param userid Specifies the user ID to be determined.
	/// \param [out] result Indicates if it is able to spotlight. It validates only when the return value is SDKErr_Success.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual SDKError CanSpotlight(unsigned int userid, SpotlightResult& result) = 0;
	
	/// \brief Determine if it is able to unspotlight the video of the specified user in the meeting. 
	/// \param userid Specifies the user ID to be determined.
	/// \param [out] result Indicates if it is able to unspotlight. It validates only when the return value is SDKErr_Success.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual SDKError CanUnSpotlight(unsigned int userid, SpotlightResult& result) = 0;

	/// \brief Spotlight the video of the assigned user to the first view.
	/// \param userid Specifies the user ID to be spotlighted.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual SDKError SpotlightVideo(unsigned int userid) = 0;

	/// \brief Unspotlight the video of the assigned user to the first view.
	/// \param userid Specifies the user ID to be unspotlighted.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual SDKError UnSpotlightVideo(unsigned int userid) = 0;

	/// \brief Unpin all the videos from the first view.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual SDKError UnSpotlightAllVideos() = 0;

	/// \brief Get the list of all the spotlighted user in the meeting.
	/// \return If the function succeeds, the return value is the list of the spotlighted user in the meeting.
	///Otherwise failed, the return value is NULL.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual IList<unsigned int >* GetSpotlightedUserList() = 0;

	/// \brief Display or not the user who does not turn on the video in the video all mode.
	/// \return TRUE indicates to hide, FALSE show.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid only for Zoom style user interface mode.
	virtual SDKError HideOrShowNoVideoUserOnVideoWall(bool bHide) = 0;

	/// \brief Query if it is able to demand the specified user to turn on the video.
	/// \param userid Specifies the user ID to query.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid for both Zoom style and customize user interface mode.
	virtual SDKError CanAskAttendeeToStartVideo(unsigned int userid) = 0;

	/// \brief Demand the assigned user to turn on the video.
	/// \param userid Specifies the user ID to demand.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid for both Zoom style and customize user interface mode.
	virtual SDKError AskAttendeeToStartVideo(unsigned int userid) = 0;

	/// \brief Query if it is able to demand the specified user to turn off the video.
	/// \param userid Specifies the user ID to query.  
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid for both Zoom style and customize user interface mode.
	virtual SDKError CanStopAttendeeVideo(unsigned int userid) = 0;

	/// \brief Turn off the video of the assigned user.
	/// \param userid Specifies the user ID to turn off.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks Valid for both Zoom style and customize user interface mode.
	virtual SDKError StopAttendeeVideo(unsigned int userid) = 0;

	/// \brief Get camera controller interface.
	/// \return If the function succeeds, the return value is a pointer to ICameraController. Otherwise returns NULL.
	virtual ICameraController* GetMyCameraController() = 0;
};
END_ZOOM_SDK_NAMESPACE
#endif