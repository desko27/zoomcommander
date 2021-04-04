
#include "../setting_ui_strategy_wrap_core.h"
#include "wrap/sdk_wrap.h"
#include "zoom_native_to_wrap.h"

ZSettingUIStrategyWrap::ZSettingUIStrategyWrap()
{
	
}
ZSettingUIStrategyWrap::~ZSettingUIStrategyWrap()
{
	Uninit();
}
void ZSettingUIStrategyWrap::Init()
{
	
}
void ZSettingUIStrategyWrap::Uninit()
{
	
}
void ZSettingUIStrategyWrap::DisableAdvancedFeatures4GeneralSetting(bool bDisable)
{
	ZOOM_SDK_NAMESPACE::ISettingUIStrategy* pSettingUIStrategy = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetSettingUIStrategy();
	if (pSettingUIStrategy)
	{
		pSettingUIStrategy->DisableAdvancedFeatures4GeneralSetting(bDisable);
	}
}
void ZSettingUIStrategyWrap::DisableAccountSettingTabPage(bool bDisable)
{
	ZOOM_SDK_NAMESPACE::ISettingUIStrategy* pSettingUIStrategy = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetSettingUIStrategy();
	if (pSettingUIStrategy)
	{
		pSettingUIStrategy->DisableAccountSettingTabPage(bDisable);
	}
}
void ZSettingUIStrategyWrap::HideAutoCopyInviteLinkCheckBox(bool bHide)
{
	ZOOM_SDK_NAMESPACE::ISettingUIStrategy* pSettingUIStrategy = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetSettingUIStrategy();
	if (pSettingUIStrategy)
	{
		pSettingUIStrategy->HideAutoCopyInviteLinkCheckBox(bHide);
	}
}
void ZSettingUIStrategyWrap::ConfigToShowUrlLinksInSetting(unsigned long showOption)
{
	ZOOM_SDK_NAMESPACE::SettingDlgShowUrlOption sdk_showOption;

	sdk_showOption.bShowGeneralViewMoreSetting = showOption & ZNSettingDlgURL_General_ViewMoreSettings;
	sdk_showOption.bShowVideoSupportCenter = showOption & ZNSettingDlgURL_Video_SupportCenter;
	sdk_showOption.bShowAudioLearnMore = showOption & ZNSettingDlgURL_Audio_LearnMore;
	sdk_showOption.bShowShareAndVBLearnMore = showOption & ZNSettingDlgURL_Share_and_VB_LearnMore;
	
	ZOOM_SDK_NAMESPACE::ISettingUIStrategy* pSettingUIStrategy = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetSettingUIStrategy();
	if (pSettingUIStrategy)
	{
		pSettingUIStrategy->ConfigToShowUrlLinksInSetting(sdk_showOption);
	}
}
void ZSettingUIStrategyWrap::ConfSettingDialogShownTabPage(unsigned long showOption)
{
	ZOOM_SDK_NAMESPACE::SettingDlgShowTabPageOption sdk_showOption;

	sdk_showOption.bShowAccessibility = showOption & SETTING_DLG_SHOW_ACCESSIBILITY_TABPAGE;
	sdk_showOption.bShowAdvancedFeature = showOption & SETTING_DLG_SHOW_ADVANCED_FEATURE_TABPAGE;
	sdk_showOption.bShowAudio = showOption & SETTING_DLG_SHOW_AUDIO_TABPAGE;
	sdk_showOption.bShowFeedback = showOption & SETTING_DLG_SHOW_FEEDBACK_TABPAGE;
	sdk_showOption.bShowGeneral = showOption & SETTING_DLG_SHOW_GENERAL_TABPAGE;
	sdk_showOption.bSHowRecording = showOption & SETTING_DLG_SHOW_RECORDING_TABPAGE;
	sdk_showOption.bShowStatistics = showOption & SETTING_DLG_SHOW_STATISTICS_TABPAGE;
	sdk_showOption.bShowVideo = showOption & SETTING_DLG_SHOW_VIDEO_TABPAGE;
	sdk_showOption.bShowVirtualBackGround = showOption & SETTING_DLG_SHOW_VIRTUAL_BACK_GROUND_TABPAGE;
	ZOOM_SDK_NAMESPACE::ISettingUIStrategy* pSettingUIStrategy = ZOOM_SDK_NAMESPACE::CSDKWrap::GetInst().GetSettingServiceWrap().GetSettingUIStrategy();
	if (pSettingUIStrategy)
	{
		pSettingUIStrategy->ConfSettingDialogShownTabPage(sdk_showOption);
	}
}
