#include "audio_setting_context_wrap.h"
#include "setting_service_wrap.h"
BEGIN_ZOOM_SDK_NAMESPACE
IAudioSettingContext* InitIAudioSettingContextFunc(IAudioSettingContextEvent* pEvent, ISettingServiceWrap* pOwner)
{
	if (pOwner && pOwner->GetSDKObj())
	{
		ZOOM_SDK_NAMESPACE::IAudioSettingContext* pObj = pOwner->GetSDKObj()->GetAudioSettings();
		if (pObj)
		{
			pObj->SetAudioDeviceEvent(pEvent);
		}

		return pObj;
	}

	return NULL;
}

void UninitIAudioSettingContextFunc(IAudioSettingContext* pObj)
{
	if (pObj)
	{
		pObj->SetAudioDeviceEvent(NULL);
	}
}

//virtual IList<IMicInfo* >* GetMicList() = 0;
IMPL_FUNC_0(IAudioSettingContext, GetMicList, IList<IMicInfo*>*, NULL)
//virtual SDKError SelectMic(const wchar_t* deviceId, const wchar_t* deviceName) = 0;
IMPL_FUNC_2(IAudioSettingContext, SelectMic, SDKError, const wchar_t*, deviceId, const wchar_t*, deviceName, SDKERR_UNINITIALIZE)
//virtual IList<ISpeakerInfo* >* GetSpeakerList() = 0;
IMPL_FUNC_0(IAudioSettingContext, GetSpeakerList, IList<ISpeakerInfo* >*, NULL)
//virtual SDKError SelectSpeaker(const wchar_t* deviceId, const wchar_t* deviceName) = 0;
IMPL_FUNC_2(IAudioSettingContext, SelectSpeaker, SDKError, const wchar_t*, deviceId, const wchar_t*, deviceName, SDKERR_UNINITIALIZE)
//virtual SDKError EnableAutoJoinAudio(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableAutoJoinAudio, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsAutoJoinAudioEnabled() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsAutoJoinAudioEnabled, bool, false)
//virtual SDKError EnableAutoAdjustMic(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableAutoAdjustMic, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsAutoAdjustMicEnabled() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsAutoAdjustMicEnabled, bool, false)
//virtual SDKError EnableStereoAudio(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableStereoAudio, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsStereoAudioEnable() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsStereoAudioEnable, bool, false)
//virtual SDKError EnableMicOriginalInput(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableMicOriginalInput, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsMicOriginalInputEnable() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsMicOriginalInputEnable, bool, false)
//virtual SDKError EnableHoldSpaceKeyToSpeak(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableHoldSpaceKeyToSpeak, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsHoldSpaceKeyToSpeakEnabled() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsHoldSpaceKeyToSpeakEnabled, bool, false)
//virtual SDKError EnableAlwaysMuteMicWhenJoinVoip(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableAlwaysMuteMicWhenJoinVoip, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsAlwaysMuteMicWhenJoinVoipEnabled() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsAlwaysMuteMicWhenJoinVoipEnabled, bool, false)
//virtual SDKError EnableSuppressAudioNotify(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableSuppressAudioNotify, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsSuppressAudioNotifyEnabled() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsSuppressAudioNotifyEnabled, bool, false)
//virtual ITestAudioDeviceHelper* GetTestAudioDeviceHelper() = 0;
IMPL_FUNC_0(IAudioSettingContext, GetTestAudioDeviceHelper, ITestAudioDeviceHelper*, NULL)

//virtual SDKError	SetMicVol(FLOAT& value) = 0;
IMPL_FUNC_1(IAudioSettingContext, SetMicVol, SDKError, FLOAT&, value, SDKERR_UNINITIALIZE)
//virtual SDKError    GetMicVol(FLOAT& value) = 0;
IMPL_FUNC_1(IAudioSettingContext, GetMicVol, SDKError, FLOAT&, value, SDKERR_UNINITIALIZE)
//virtual SDKError	SetSpeakerVol(FLOAT& value) = 0;
IMPL_FUNC_1(IAudioSettingContext, SetSpeakerVol, SDKError, FLOAT&, value, SDKERR_UNINITIALIZE)
//virtual SDKError    GetSpeakerVol(FLOAT& value) = 0;
IMPL_FUNC_1(IAudioSettingContext, GetSpeakerVol, SDKError, FLOAT&, value, SDKERR_UNINITIALIZE)
//virtual SDKError SetEchoCancellationLevel(SDK_ECHO_CANCELLATION_LEVEL level) = 0;
IMPL_FUNC_1(IAudioSettingContext, SetEchoCancellationLevel, SDKError, SDK_ECHO_CANCELLATION_LEVEL, level, SDKERR_UNINITIALIZE)
//virtual SDK_ECHO_CANCELLATION_LEVEL GetEchoCancellationLevel() = 0;
IMPL_FUNC_0(IAudioSettingContext, GetEchoCancellationLevel, SDK_ECHO_CANCELLATION_LEVEL, SDK_ECHO_CANCELLATION_DEFAULT)
//virtual SDK_AUDIO_DEVICE_RAW_MODE_TYPE GetAudioSignalProcessType() = 0;
IMPL_FUNC_0(IAudioSettingContext, GetAudioSignalProcessType, SDK_AUDIO_DEVICE_RAW_MODE_TYPE, SDK_AUDIO_DEVICE_RAW_MODE_DEFAULT)
//virtual SDKError SetAudioSignalProcessType(SDK_AUDIO_DEVICE_RAW_MODE_TYPE type) = 0;
IMPL_FUNC_1(IAudioSettingContext, SetAudioSignalProcessType, SDKError, SDK_AUDIO_DEVICE_RAW_MODE_TYPE, type, SDKERR_UNINITIALIZE)
//virtual SDKError DisableEchoCancellation(bool bDisable) = 0;
IMPL_FUNC_1(IAudioSettingContext, DisableEchoCancellation, SDKError, bool, bDisable, SDKERR_UNINITIALIZE)
//virtual bool IsEchoCancellationDisabled() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsEchoCancellationDisabled, bool, false)
//virtual SDKError EnableHighFidelityMusicMode(bool bEnable) = 0;
IMPL_FUNC_1(IAudioSettingContext, EnableHighFidelityMusicMode, SDKError, bool, bEnable, SDKERR_UNINITIALIZE)
//virtual bool IsHighFidelityMusicModeDisabled() = 0;
IMPL_FUNC_0(IAudioSettingContext, IsHighFidelityMusicModeDisabled, bool, false)
END_ZOOM_SDK_NAMESPACE
