const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomSettingUICtrl = (function () {
  var instance;
  /**
   * Zoom Setting UI Ctrl
   * @module zoom_setting_ui_ctrl
   * @return {ZoomSettingUICtrl}
   */
  function init(opts) {
    let clientOpts = opts || {};
    let _addon = clientOpts.addon.GetSettingUIStrategyCtrl() || null;

    return {
      // Public methods and variables
      /** 
      * Hide the link to check the advanced settings on the General Setting page or not.
      * @method SettingUI_DisableAdvancedFeatures4GeneralSetting
      * @param {Boolean} bDisable TRUE indicates to hide the link
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      SettingUI_DisableAdvancedFeatures4GeneralSetting: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let bDisable = clientOpts.bDisable;
          try {
            let DisableAdvancedFeatures4GeneralSettingParams = new messages.DisableAdvancedFeatures4GeneralSettingParams();
            DisableAdvancedFeatures4GeneralSettingParams.setBdisable(bDisable);
            let bytes = DisableAdvancedFeatures4GeneralSettingParams.serializeBinary();
            return _addon.DisableAdvancedFeatures4GeneralSetting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Hide the Account Setting page or not
      * @method SettingUI_DisableAccountSettingTabPage
      * @param {Boolean} bDisable TRUE indicates to hide the account setting page
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      SettingUI_DisableAccountSettingTabPage: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let bDisable = clientOpts.bDisable;
          try {
            let DisableAccountSettingTabPageParams = new messages.DisableAccountSettingTabPageParams();
            DisableAccountSettingTabPageParams.setBdisable(bDisable);
            let bytes = DisableAccountSettingTabPageParams.serializeBinary();
            return _addon.DisableAccountSettingTabPage(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Custome the tab page show or hide
      * @method SettingUI_ConfSettingDialogShownTabPage
      * @param {Number} number settingDlgShowTabPageOption, Every bit indicates whether to show a certain tab page
       1. bit 1: indicates whether to show virtual background page. "1" show, "0" not show
       2. bit 2: indicates to whether to show video page. "1" show, "0" not show
       3. bit 3: indicates to whether to show staticstics page. "1" show, "0" not show
       4. bit 4: indicates to whether to show recording page. "1" show, "0" not show
       5. bit 5: indicates to whether to show general page. "1" show, "0" not show
       6. bit 6: indicates to whether to show feed back page. "1" show, "0" not show
       7. bit 7: indicates to whether to show audio page. "1" show, "0" not show
       8. bit 8: indicates to whether to show advance feature page. "1" show, "0" not show
       9. bit 9: indicates to whether to show accessibility page. "1" show, "0" not show
      * @return {Number}
      */
      SettingUI_ConfSettingDialogShownTabPage: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let number = clientOpts.number;
          try {
            let ConfSettingDialogShownTabPageParams = new messages.ConfSettingDialogShownTabPageParams();
            ConfSettingDialogShownTabPageParams.setShowoption(number);
            let bytes = ConfSettingDialogShownTabPageParams.serializeBinary();
            return _addon.ConfSettingDialogShownTabPage(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Set the visibility of the AUTOMATICALLY COPY INVITE URL check-box on the General Setting page.
      * @method SettingUI_HideAutoCopyInviteLinkCheckBox
      * @param {Boolean} bHide TRUE indicates to hide the check box.
      * @return {Number} Defined in: {@link ZoomSDKError} 
      */
      SettingUI_HideAutoCopyInviteLinkCheckBox: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let bHide = clientOpts.bHide;
          try {
            let HideAutoCopyInviteLinkCheckBoxParams = new messages.HideAutoCopyInviteLinkCheckBoxParams();
            HideAutoCopyInviteLinkCheckBoxParams.setBhide(bHide);
            let bytes = HideAutoCopyInviteLinkCheckBoxParams.serializeBinary();
            return _addon.HideAutoCopyInviteLinkCheckBox(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Custom the url link show or hide
      * @method SettingUI_ConfigToShowUrlLinksInSetting
      * @param {Number} showOption (require hexadecimal) Every bit indicates whether to show a certain url link, From right to left, every bit indicates as:
       1. bit 1: indicates whether to show the view more setting url in general page. "1" show, "0" not show.
       2. bit 2: indicates whether to show the support center url in video page. "1" show, "0" not show.
       3. bit 3: indicates whether to show the learn more url of suppress background noise in audio page. "1" show, "0" not show.
       4. bit 4: indicates whether to show the learn more url of screen capture mode in share screen and vb page. "1" show, "0" not show.
      * @return {Number} Defined in: {@link ZoomSDKError} 
      */
      SettingUI_ConfigToShowUrlLinksInSetting: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let showOption = clientOpts.showOption;
          try {
            let ConfigToShowUrlLinksInSettingParams = new messages.ConfigToShowUrlLinksInSettingParams();
            ConfigToShowUrlLinksInSettingParams.setShowoption(showOption);
            let bytes = ConfigToShowUrlLinksInSettingParams.serializeBinary();
            return _addon.ConfigToShowUrlLinksInSetting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
    };
  };
 
  return {
    getInstance: function(opts) {
      if (!instance) {
        instance = init(opts);
      }
      return instance;
    }
  };
})();

module.exports = {
  ZoomSettingUICtrl: ZoomSettingUICtrl
}
