const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomGeneralSetting = (function () {
  var instance;
  /**
   * Zoom General Setting
   * @module zoom_setting_general
   * @return {ZoomGeneralSetting}
  */
  function init(opts) {
    let clientOpts = opts || {};

    // Private methods and variables
    let _addon = clientOpts.addon.GetSettingGeneralCtrl() || null;
    
    return {
      /** 
       * Enable or disable dual screen mode.
       * @method Setting_EnableDualScreenMode
       * @param {Boolean} zn_bEnable TRUE indicates to set to enable the dual screen mode.
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
       */
      Setting_EnableDualScreenMode: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_bEnable = clientOpts.zn_bEnable;
          try {
            let EnableDualScreenModeParams = new messages.EnableDualScreenModeParams();
            EnableDualScreenModeParams.setBenable(zn_bEnable);
            let bytes = EnableDualScreenModeParams.serializeBinary();
            return _addon.EnableDualScreenMode(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable the aero mode when sharing the screen.
      * The function can only be called in windows 7 environment.
      * @method Setting_TurnOffAeroModeInSharing
      * @param {Boolean} zn_bEnable TRUE indicates to turn off the aero mode when sharing the screen.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_TurnOffAeroModeInSharing: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_bEnable = clientOpts.zn_bEnable;
          try {
            let TurnOffAeroModeInSharingParams = new messages.TurnOffAeroModeInSharingParams();
            TurnOffAeroModeInSharingParams.setBturnoff(zn_bEnable);
            let bytes = TurnOffAeroModeInSharingParams.serializeBinary();
            return _addon.TurnOffAeroModeInSharing(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to use the split screen mode, which enables the attendees to view the lectures or the gallery.
      * @method Setting_EnableSplitScreenMode
      * @param {Boolean} zn_bEnable TRUE indicates to enter the split screen mode.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableSplitScreenMode: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_bEnable = clientOpts.zn_bEnable;
          try {
            let EnableSplitScreenModeParams = new messages.EnableSplitScreenModeParams();
            EnableSplitScreenModeParams.setBenable(zn_bEnable);
            let bytes = EnableSplitScreenModeParams.serializeBinary();
            return _addon.EnableSplitScreenMode(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if the dual screen mode is supported.
      * @method Checking_IsDualScreenModeEnabled
      * @return {Boolean} TRUE indicates to enable the dual screen mode.
      */
      Checking_IsDualScreenModeEnabled: function (opts) {
        if (_addon) {
          return _addon.IsDualScreenModeEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Determine if the aero mode is turned off when sharing the screen.
      * @method Checking_IsAeroModeInSharingTurnOff
      * @return {Boolean} TRUE indicates to turn off the mode. 
      */
      Checking_IsAeroModeInSharingTurnOff: function (opts) {
        if (_addon) {
          return _addon.IsAeroModeInSharingTurnOff();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if it is able to enter the full screen video mode automatically when join meeting.
      * @method Checking_IsAutoFullScreenVideoWhenJoinMeetingEnabled
      * @return {Boolean} TRUE indicates to enter the full screen video mode. 
      */
      Checking_IsAutoFullScreenVideoWhenJoinMeetingEnabled: function (opts) {
        if (_addon) {
          return _addon.IsAutoFullScreenVideoWhenJoinMeetingEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Determine if the split screen mode is enabled.
       * @method Checking_IsSplitScreenModeEnabled
       * @return {Boolean} TRUE indicates enabled. FALSE not.
       */
      Checking_IsSplitScreenModeEnabled: function (opts) {
        if (_addon) {
          return _addon.IsSplitScreenModeEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable reminder window when user exits the meeting. Available only for normal attendees (non-host).
      * @method Setting_EnableDisplayReminderWindowWhenExit
      * @param {Boolean} bEnable TRUE indicates to enable reminder window.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableDisplayReminderWindowWhenExit: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableDisplayReminderWindowWhenExitParams = new messages.EnableDisplayReminderWindowWhenExitParams();
            EnableDisplayReminderWindowWhenExitParams.setBenable(bEnable);
            let bytes = EnableDisplayReminderWindowWhenExitParams.serializeBinary();
            return _addon.EnableDisplayReminderWindowWhenExit(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if reminder window is enabled when user exits the meeting.
      * @method Setting_IsDisplayReminderWindowWhenExitEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsDisplayReminderWindowWhenExitEnabled: function () {
        if (_addon) {
          return _addon.IsDisplayReminderWindowWhenExitEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable to show the elapsed time of the meeting.
      * @method Setting_EnableShowMyMeetingElapseTime
      * @param {Boolean} bEnable TRUE indicates to show the elapsed time. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableShowMyMeetingElapseTime: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableShowMyMeetingElapseTimeParams = new messages.EnableShowMyMeetingElapseTimeParams();
            EnableShowMyMeetingElapseTimeParams.setBenable(bEnable);
            let bytes = EnableShowMyMeetingElapseTimeParams.serializeBinary();
            return _addon.EnableShowMyMeetingElapseTime(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if showing elapsed time of the meeting is enabled.
      * @method Setting_IsRemoteControlAllApplicationsEnabled
      * @return {Boolean} TRUE indicates to show. FALSE not.
      */
      Setting_IsShowMyMeetingElapseTimeEnabled: function () {
        if (_addon) {
          return _addon.IsShowMyMeetingElapseTimeEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
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
  ZoomGeneralSetting: ZoomGeneralSetting
}