/* eslint-disable no-unused-vars */
const {
  ZOOM_TYPE_OS_TYPE, ZoomSDKError, ZoomAuthResult, ZoomLoginStatus,
  ZoomMeetingStatus, ZoomMeetingUIFloatVideoType, SDKCustomizedStringType,
  SDKCustomizedURLType, ZoomAPPLocale
} = require('../../../../lib/settings')
const ZOOMSDKMOD = require('../../../../lib/zoom_sdk.js')

module.exports = function initSdk ({ app }) {
  // define sdk instance
  const sdk = ZOOMSDKMOD.ZoomSDK.getInstance({
    path: './../sdk/mac/',
    apicallretcb: (apiname, ret) => {
      if (apiname !== 'CleanUPSDK') return
      app.quit()
    }
  })

  // setDomain
  const ret = sdk.InitSDK({
    locale: ZoomAPPLocale.ZNSDK_APP_Locale_Default,
    logfilesize: 5
  })
  if (ZoomSDKError.SDKERR_SUCCESS !== ret) app.quit()

  return sdk
}
