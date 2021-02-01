#pragma once
#include "../common_include.h"
BEGIN_ZOOM_SDK_NAMESPACE
class IMeetingServiceWrap;
IEmojiReactionController* InitIEmojiReactionControllerFunc(IEmojiReactionControllerEvent* pEvent, IMeetingServiceWrap* pOwner);
void UninitIEmojiReactionControllerFunc(IEmojiReactionController* obj);
BEGIN_CLASS_DEFINE_WITHCALLBACK(IEmojiReactionController, IEmojiReactionControllerEvent)
NORMAL_CLASS(IEmojiReactionController)
INIT_UNINIT_WITHEVENT_AND_OWNSERVICE(IEmojiReactionController, IMeetingServiceWrap)
virtual SDKError SetEvent(IEmojiReactionControllerEvent* pEvent)
{
	external_cb = pEvent;
	return SDKERR_SUCCESS;
}
//virtual bool IsEmojiReactionEnabled() = 0;
DEFINE_FUNC_0(IsEmojiReactionEnabled, bool)
//virtual SDKError SendEmojiReaction(SDKEmojiReactionType type) = 0;
DEFINE_FUNC_1(SendEmojiReaction, SDKError, SDKEmojiReactionType, type)

//virtual void OnEmojiReactionReceived(unsigned int sender_id, SDKEmojiReactionType type) = 0;
CallBack_FUNC_2(OnEmojiReactionReceived, unsigned int, sender_id, SDKEmojiReactionType, type)

END_CLASS_DEFINE(IEmojiReactionController)
END_ZOOM_SDK_NAMESPACE