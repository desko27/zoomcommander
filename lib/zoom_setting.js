const ZOOMSDKMOD_GeneralSetting = require('./zoom_setting_general.js');
const ZOOMSDKMOD_RecordingSetting = require('./zoom_setting_recording.js')
const ZOOMSDKMOD_VideoSetting = require('./zoom_setting_video.js');
const ZOOMSDKMOD_AudioSetting = require('./zoom_setting_audio.js');
const ZOOMSDKMOD_ShareSetting = require('./zoom_setting_share.js');
const ZoomSettingUIMOD = require('./zoom_setting_ui_ctrl.js');
const ZoomSettingStatisticMOD = require('./zoom_setting_statistic_ctrl.js');
const ZoomSettingAccessibilityMOD = require('./zoom_setting_accessibility_ctrl.js');
const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

let ZoomGeneralSetting;
let ZoomVideoSetting;
let ZoomAudioSetting;
let ZoomShareSetting;
let ZoomRecordingSetting;
let ZoomSettingUICtrl;
let ZoomSettingStatisticCtrl;
let ZoomSettingAccessibilityCtrl;

var ZoomSetting = (function () {
  var instance;
  /**
   * Zoom Setting
   * @module zoom_setting
   * @return {ZoomSetting}
   */
  function init(opts) {
    var clientOpts = opts || {};

    // Private methods and variables
    var _addon = clientOpts.addon.GetSetObj() || null
    return {
      /**
      * Display Meeting Setting dialog.
      * @method SettingUI_ShowTheSettingDlg
      * @param {String} hParent parent setting handle (require hexadecimal)
      * @param {String} left setting dlg left pos
      * @param {String} top setting dlg top pos
      * @param {String} hSettingWnd Setting Wnd (require hexadecimal)
      * @param {Boolean} bShow show or not
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      SettingUI_ShowTheSettingDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {}
          clientOpts.addon = _addon
          let hParent = clientOpts.hParent || '0'
          let top = clientOpts.top || '0'
          let left = clientOpts.left || '0'
          let hSettingWnd = clientOpts.hSettingWnd || '0'
          let bShow = clientOpts.bShow || true
          try {
            let ShowSettingDlgParams = new messages.ShowSettingDlgParams();
            ShowSettingDlgParams.setHparent(hParent);
            ShowSettingDlgParams.setLeft(left);
            ShowSettingDlgParams.setTop(top);
            ShowSettingDlgParams.setHsettingwnd(hSettingWnd);
            ShowSettingDlgParams.setBshow(bShow);
            let bytes = ShowSettingDlgParams.serializeBinary();
            return _addon.ShowSettingDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZOOMSDKMOD_4Setting.ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /**
       * Hide meeting setting dialog.
       * @method SettingUI_HideSettingDlg
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      SettingUI_HideSettingDlg: function () {
        if (_addon) {
          return _addon.HideSettingDlg();
        }
        return ZOOMSDKMOD_4Setting.ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      GetGeneralSetting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          if (!ZoomGeneralSetting) {
            ZoomGeneralSetting = ZOOMSDKMOD_GeneralSetting.ZoomGeneralSetting.getInstance(clientOpts);
          }
          return ZoomGeneralSetting;
        }
        return null;
      },
      GetVideoSetting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {}
          clientOpts.addon = _addon
          if (!ZoomVideoSetting) {
            ZoomVideoSetting = ZOOMSDKMOD_VideoSetting.ZoomVideoSetting.getInstance(clientOpts);
          }
          return ZoomVideoSetting;
        }
        return null;
      },
      GetAudioSetting : function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          if (!ZoomAudioSetting) {
            ZoomAudioSetting = ZOOMSDKMOD_AudioSetting.ZoomAudioSetting.getInstance(clientOpts);
          }
          return ZoomAudioSetting;
        }
        return null;
      },
      GetShareSetting : function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          if (!ZoomShareSetting) {
            ZoomShareSetting = ZOOMSDKMOD_ShareSetting.ZoomShareSetting.getInstance(clientOpts);
          }
          return ZoomShareSetting;
        }
        return null;
      },
      GetRecordingSetting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          if (!ZoomRecordingSetting) {
            ZoomRecordingSetting = ZOOMSDKMOD_RecordingSetting.ZoomRecordingSetting.getInstance(clientOpts);
          }
          return ZoomRecordingSetting;
        }
        return null;
      },
      GetSettingUICtrl: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          if (!ZoomSettingUICtrl) {
            ZoomSettingUICtrl = ZoomSettingUIMOD.ZoomSettingUICtrl.getInstance(clientOpts);
          }
          return ZoomSettingUICtrl;
        }
        return null;
      },
      GetSettingStatisticCtrl: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          if (!ZoomSettingStatisticCtrl) {
            ZoomSettingStatisticCtrl = ZoomSettingStatisticMOD.ZoomSettingStatisticCtrl.getInstance(clientOpts);
          }
          return ZoomSettingStatisticCtrl;
        }
        return null;
      },
      GetSettingAccessibilityCtrl: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          if (!ZoomSettingAccessibilityCtrl) {
            ZoomSettingAccessibilityCtrl = ZoomSettingAccessibilityMOD.ZoomSettingAccessibilityCtrl.getInstance(clientOpts);
          }
          return ZoomSettingAccessibilityCtrl;
        }
        return null;
      }
    };
  };
  return {
    getInstance: function (opts) {
      if (!instance) {
        instance = init(opts);
      }
      return instance;
    }
  };
})();

module.exports = {
  ZoomSetting: ZoomSetting
}
