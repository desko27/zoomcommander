/*!
* \file meeting_emoji_reaction_interface.h
* \brief Meeting Service Emoji Reaction Interface. 
* \remarks Valid for both ZOOM style and user custom interface mode.
*/
#ifndef _MEETING_EMOJI_REACTION_INTERFACE_H_
#define _MEETING_EMOJI_REACTION_INTERFACE_H_
#include "..\zoom_sdk_def.h"

BEGIN_ZOOM_SDK_NAMESPACE

/*! \enum SDKEmojiReactionType
	\brief Specify the emoji reaction type.
	Here are more detailed enum descriptions.
*/
typedef enum tagSDKEmojiReactionType
{
	SDKEmojiReactionType_None = 0,
	SDKEmojiReactionType_Clap,
	SDKEmojiReactionType_Thumbsup,
	SDKEmojiReactionType_Heart,
	SDKEmojiReactionType_Joy,
	SDKEmojiReactionType_Openmouth,
	SDKEmojiReactionType_Tada,
}SDKEmojiReactionType;

/// \brief Emoji Reaction controller callback event.
///
class IEmojiReactionControllerEvent
{
public:
	/// \brief Emoji reaction callback. This function is used to inform the user once received the reaction sent by others or user himself.
	/// \param sender_id Specify the user id of the reaction sender.
	/// \param type Specify the type of the received reaction.
	virtual void OnEmojiReactionReceived(unsigned int sender_id, SDKEmojiReactionType type) = 0;
};

/// \brief Emoji Reaction controller interface.
class IEmojiReactionController
{
public:
	/// \brief Configure the meeting emoji reaction controller callback event handler.
	/// \param pEvent An object pointer to the IEmojiReactionControllerEvent that receives the meeting reaction callback event. For more details, see \link IEmojiReactionControllerEvent \endlink.
	/// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	/// \remarks The SDK use pEvent to transmit the callback event to the user's application. If the function is not called or failed, the user's application is unabled to retrieve the callback event.
	virtual SDKError SetEvent(IEmojiReactionControllerEvent* pEvent) = 0;
	
	/// \brief Determine if the reactions feature is enabled in the meeting.
	virtual bool IsEmojiReactionEnabled() = 0;
	
	/// \brief Send the reaction.
	/// \param type Specify the reaction type to be sent.
	/// /// \return If the function succeeds, the return value is SDKErr_Success.
	///Otherwise failed. To get extended error information, see \link SDKError \endlink enum.
	virtual SDKError SendEmojiReaction(SDKEmojiReactionType type) = 0;
};

END_ZOOM_SDK_NAMESPACE
#endif