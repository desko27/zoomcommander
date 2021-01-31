#include "meeting_emoji_reaction_wrap.h"
#include "../meeting_service_wrap.h"
BEGIN_ZOOM_SDK_NAMESPACE
IEmojiReactionController* InitIEmojiReactionControllerFunc(IEmojiReactionControllerEvent* pEvent, IMeetingServiceWrap* pOwner)
{
	if (pOwner && pOwner->GetSDKObj())
	{
		ZOOM_SDK_NAMESPACE::IEmojiReactionController* pObj = pOwner->GetSDKObj()->GetMeetingEmojiReactionController();
		if (pObj)
		{
			pObj->SetEvent(pEvent);
		}
		return pObj;
	}

	return NULL;
}

void UninitIEmojiReactionControllerFunc(IEmojiReactionController* obj)
{
	if (obj)
	{
		obj->SetEvent(NULL);
	}
}

//virtual bool IsEmojiReactionEnabled() = 0;
IMPL_FUNC_0(IEmojiReactionController, IsEmojiReactionEnabled, bool, false)
//virtual SDKError SendEmojiReaction(SDKEmojiReactionType type) = 0;
IMPL_FUNC_1(IEmojiReactionController, SendEmojiReaction, SDKError, SDKEmojiReactionType, type, SDKERR_UNINITIALIZE)

END_ZOOM_SDK_NAMESPACE