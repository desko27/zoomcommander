/* eslint-disable no-unused-vars */
const {
  ZOOM_TYPE_OS_TYPE, ZoomSDK_LANGUAGE_ID: ZoomSdkLanguageId, ZoomSDKError, ZoomAuthResult,
  ZoomLoginStatus, ZoomMeetingStatus, ZoomMeetingUIFloatVideoType,
  SDKCustomizedStringType, SDKCustomizedURLType, ZoomAPPLocale
} = require('../../../../lib/settings')
const ZOOMSDKMOD = require('../../../../lib/zoom_sdk.js')

// try to use system language for Zoom
const systemLanguage = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0]
const ZOOM_LANGUAGES_DICTIONARY = {
  en: ZoomSdkLanguageId.LANGUAGE_English,
  zh: ZoomSdkLanguageId.LANGUAGE_Chinese_Simplified,
  ja: ZoomSdkLanguageId.LANGUAGE_Japanese,
  es: ZoomSdkLanguageId.LANGUAGE_Spanish,
  de: ZoomSdkLanguageId.LANGUAGE_German,
  fr: ZoomSdkLanguageId.LANGUAGE_French,
  pt: ZoomSdkLanguageId.LANGUAGE_Portuguese,
  ru: ZoomSdkLanguageId.LANGUAGE_Russian,
  ko: ZoomSdkLanguageId.LANGUAGE_Korean,
  vi: ZoomSdkLanguageId.LANGUAGE_Vietnamese,
  it: ZoomSdkLanguageId.LANGUAGE_Italian
}
const zoomSystemLanguage =
  ZOOM_LANGUAGES_DICTIONARY[systemLanguage] || ZoomSdkLanguageId.LANGUAGE_English

module.exports = function initSdk ({ app }) {
  // define sdk instance
  const sdk = ZOOMSDKMOD.ZoomSDK.getInstance({
    apicallretcb: (apiname, ret) => {
      if (apiname !== 'CleanUPSDK') return
      app.quit()
    }
  })

  // setDomain
  const ret = sdk.InitSDK({
    enable_log: true,
    langid: zoomSystemLanguage,
    locale: ZoomAPPLocale.ZNSDK_APP_Locale_Default,
    logfilesize: 5
  })
  if (ZoomSDKError.SDKERR_SUCCESS !== ret) app.quit()

  return sdk
}
