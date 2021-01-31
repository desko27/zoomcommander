#ifndef _zoom_native_to_wrap_h_
#define _zoom_native_to_wrap_h_
#include "../zoom_native_sdk_wrap_core_def.h"
#include "wrap/sdk_wrap.h"
ZNSDKError Map2WrapDefine(ZOOM_SDK_NAMESPACE::SDKError err);
ZNAuthResult Map2WrapDefine(ZOOM_SDK_NAMESPACE::AuthResult result);
ZNLOGINSTATUS Map2WrapDefine(ZOOM_SDK_NAMESPACE::LOGINSTATUS status);
ZNAccountInfo Map2WrapDefine(ZOOM_SDK_NAMESPACE::IAccountInfo* pAccountInfo);
ZNMeetingStatus Map2WrapDefine(ZOOM_SDK_NAMESPACE::MeetingStatus status);
ZNMeetingType Map2WrapDefine(ZOOM_SDK_NAMESPACE::MeetingType type);
ZNConnectionQuality Map2WrapDefine(ZOOM_SDK_NAMESPACE::ConnectionQuality quality);
ZNAudioStatus Map2WrapDefine(ZOOM_SDK_NAMESPACE::AudioStatus status);
ZNVideoStatus Map2WrapDefine(ZOOM_SDK_NAMESPACE::VideoStatus status);
ZNH323CalloutStatus Map2WrapDefine(ZOOM_SDK_NAMESPACE::H323CalloutStatus status);
ZNH323DeviceType Map2WrapDefine(ZOOM_SDK_NAMESPACE::H323DeviceType type);
ZNFreeMeetingEndingReminderType Map2WrapDefine(ZOOM_SDK_NAMESPACE::IFreeMeetingEndingReminderHandler::FreeMeetingEndingReminderType type);
ZNFreeMeetingNeedUpgradeType Map2WrapDefine(ZOOM_SDK_NAMESPACE::IMeetingConfigurationFreeMeetingEvent::FreeMeetingNeedUpgradeType type);
ZNPremeetingAPIResult Map2WrapDefine(ZOOM_SDK_NAMESPACE::PremeetingAPIResult result);
ZNDirectShareStatus Map2WrapDefine(ZOOM_SDK_NAMESPACE::DirectShareStatus status);
ZNShareStatus Map2WrapDefine(ZOOM_SDK_NAMESPACE::SharingStatus status);
ZNAudioType Map2WrapDefine(ZOOM_SDK_NAMESPACE::AudioType type);
ZNUserRole Map2WrapDefine(ZOOM_SDK_NAMESPACE::UserRole role);
ZNSMSVerificationCodeErr Map2WrapDefine(SMSVerificationCodeErr err);
ZNLoginFailReason Map2WrapDefine(ZOOM_SDK_NAMESPACE::LoginFailReason reason);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
ZNSettingsNetWorkType Map2WrapDefine(ZOOM_SDK_NAMESPACE::SettingsNetWorkType role);
ZNSettingConnectionType Map2WrapDefine(ZOOM_SDK_NAMESPACE::SettingConnectionType role);
ZNRequiredInfoType Map2WrapDefine(ZOOM_SDK_NAMESPACE::IMeetingPasswordAndScreenNameHandler::RequiredInfoType type);
ZNWebinarNeedRegisterType Map2WrapDefine(ZOOM_SDK_NAMESPACE::IWebinarNeedRegisterHandler::WebinarNeedRegisterType type);
ZNAudioCallbackActionInfo Map2WrapDefine(ZOOM_SDK_NAMESPACE::AudioCallbackActionInfo info);
ZNRecordingStatus Map2WrapDefine(ZOOM_SDK_NAMESPACE::RecordingStatus info);
ZN_SDK_ECHO_CANCELLATION_LEVEL Map2WrapDefine(ZOOM_SDK_NAMESPACE::SDK_ECHO_CANCELLATION_LEVEL level);
//convert js to sdk
ZOOM_SDK_NAMESPACE::SDK_LANGUAGE_ID Map2SDKDefine(ZNSDK_LANGUAGE_ID id);
ZOOM_SDK_NAMESPACE::SDKUserType Map2SDKDefine(ZNSDKUserType type);
ZOOM_SDK_NAMESPACE::LeaveMeetingCmd Map2SDKDefine(ZNLeaveMeetingCmd cmd);
ZOOM_SDK_NAMESPACE::ZoomUserType Map2SDKDefine(ZNZoomUserType type);
ZOOM_SDK_NAMESPACE::SDKFloatVideoType Map2SDKDefine(ZNSDKFloatVideoType type);
ZOOM_SDK_NAMESPACE::SDKViewType Map2SDKDefine(ZNSDKViewType type);
ZOOM_SDK_NAMESPACE::AnnotationToolType Map2SDKDefine(ZNAnnotationToolType type);
ZOOM_SDK_NAMESPACE::AnnotationClearType Map2SDKDefine(ZNAnnotationClearType type);
ZOOM_SDK_NAMESPACE::SettingTabPage Map2SDKDefine(ZNSettingTabPage tabPage);
ZOOM_SDK_NAMESPACE::SDKCustomizedStringType Map2SDKDefine(ZNSDKCustomizedStringType type);
ZOOM_SDK_NAMESPACE::SDKCustomizedURLType Map2SDKDefine(ZNSDKCustomizedURLType type);
ZOOM_SDK_NAMESPACE::H323DeviceType Map2SDKDefine(ZNH323DeviceType type);
ZOOM_SDK_NAMESPACE::SDKMinimizeUIMode Map2SDKDefine(ZNSDKMinimizeUIMode mode);
ZOOM_SDK_NAMESPACE::SDK_APP_Locale Map2SDKDefine(ZNSDK_APP_Locale mode);
ZOOM_SDK_NAMESPACE::CustomizedLanguageType Map2SDKDefine(ZNCustomizedLanguageType customizedLanguageType);

ZOOM_SDK_NAMESPACE::ZoomSDKVideoRenderMode Map2SDKDefine(ZNZoomSDKVideoRenderMode videoRenderType);
ZOOM_SDK_NAMESPACE::ZoomSDKRawDataMemoryMode Map2SDKDefine(ZNSDKRawDataMemoryMode rawdataMemoryMode);
ZOOM_SDK_NAMESPACE::ZoomSDKRawDataType Map2SDKDefine(ZNZoomSDKRawDataType type);
ZOOM_SDK_NAMESPACE::ZoomSDKResolution Map2SDKDefine(ZNZoomSDKResolution resolution);
ZOOM_SDK_NAMESPACE::VIDEO_HARDWARE_ENCODE_TYPE Map2SDKDefine(ZN_VIDEO_HARDWARE_ENCODE_TYPE encodeType);
ZOOM_SDK_NAMESPACE::ZoomSDKRenderPostProcessing Map2SDKDefine(ZNZoomSDKRenderPostProcessing postProcessing);
ZOOM_SDK_NAMESPACE::ZoomSDKVideoCaptureMethod Map2SDKDefine(ZNZoomSDKVideoCaptureMethod method);
ZOOM_SDK_NAMESPACE::SDK_ECHO_CANCELLATION_LEVEL Map2SDKDefine(ZN_SDK_ECHO_CANCELLATION_LEVEL level);
//convert zoomstring to string
std::string wStr2Str(const ZoomSTRING& s);
//convert string to zoomstring
ZoomSTRING Str2WStr(const std::string& s);
#endif // !_zoom_native_to_wrap_h_
