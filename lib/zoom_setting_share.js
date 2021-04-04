const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomShareSetting = (function () {
  var instance;
  /**
   * Zoom Share Setting
   * @module zoom_setting_share
   * @return {ZoomShareSetting}
   */
  function init(opts) {
    let clientOpts = opts || {};

    // Private methods and variables
    let _addon = clientOpts.addon.GetSettingShareCtrl() || null;
    
    return {
      /** 
      * Enable or disable to auto-fit the ZOOM window when viewing the shared content.
      * @method Setting_EnableAutoFitToWindowWhenViewSharing
      * @param {Boolean} bEnable TRUE indicates to resize automatically.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableAutoFitToWindowWhenViewSharing: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAutoFitToWindowWhenViewSharingParams = new messages.EnableAutoFitToWindowWhenViewSharingParams();
            EnableAutoFitToWindowWhenViewSharingParams.setBenable(bEnable);
            let bytes = EnableAutoFitToWindowWhenViewSharingParams.serializeBinary();
            return _addon.EnableAutoFitToWindowWhenViewSharing(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if it is able to auto-fit the ZOOM window when viewing the shared content.
      * @method Setting_IsAutoFitToWindowWhenViewSharingEnabled
      * @return {Boolean} TRUE indicates to resize automatically.
      */
      Setting_IsAutoFitToWindowWhenViewSharingEnabled: function () {
        if (_addon) {
          return _addon.IsAutoFitToWindowWhenViewSharingEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to enter the full screen video mode automatically when viewing the sharing.
      * @method Setting_EnableAutoFullScreenVideoWhenViewShare
      * @param {Boolean} bEnable TRUE indicates to enter the full screen video mode.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableAutoFullScreenVideoWhenViewShare: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAutoFullScreenVideoWhenViewShareParams = new messages.EnableAutoFullScreenVideoWhenViewShareParams();
            EnableAutoFullScreenVideoWhenViewShareParams.setBenable(bEnable);
            let bytes = EnableAutoFullScreenVideoWhenViewShareParams.serializeBinary();
            return _addon.EnableAutoFullScreenVideoWhenViewShare(bytes); 
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if it is enable to enter the full screen video mode automatically when viewing the sharing.
      * @method Setting_IsAutoFullScreenVideoWhenViewShareEnabled
      * @return {Boolean} TRUE indicates to enter the full screen video mode.
      */
      Setting_IsAutoFullScreenVideoWhenViewShareEnabled: function () {
        if (_addon) {
          return _addon.IsAutoFullScreenVideoWhenViewShareEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if the operating system supports the GPU acceleration when user shares.
      * @method Setting_IsCurrentOSSupportAccelerateGPUWhenShare
      * @return {Boolean} TRUE indicates support. FALSE not.
      */
      Setting_IsCurrentOSSupportAccelerateGPUWhenShare: function () {
        if (_addon) {
          return _addon.IsCurrentOSSupportAccelerateGPUWhenShare();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable the GPU acceleration when user shares.
      * @method Setting_EnableAccelerateGPUWhenShare
      * @param {Boolean} bEnable TRUE indicates to enable the acceleration. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableAccelerateGPUWhenShare: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAccelerateGPUWhenShareParams = new messages.EnableAccelerateGPUWhenShareParams();
            EnableAccelerateGPUWhenShareParams.setBenable(bEnable);
            let bytes = EnableAccelerateGPUWhenShareParams.serializeBinary();
            return _addon.EnableAccelerateGPUWhenShare(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if GPU acceleration is enabled when user shares.
      * @method Setting_IsAccelerateGPUWhenShareEnabled
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_IsAccelerateGPUWhenShareEnabled: function () {
        if (_addon) {
          return _addon.IsAccelerateGPUWhenShareEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/disable remote control of all applications.
      * @method Setting_EnableRemoteControlAllApplications
      * @param {Boolean} bEnable TRUE indicates to enable the remote control. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableRemoteControlAllApplications: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableRemoteControlAllApplicationsParams = new messages.EnableRemoteControlAllApplicationsParams();
            EnableRemoteControlAllApplicationsParams.setBenable(bEnable);
            let bytes = EnableRemoteControlAllApplicationsParams.serializeBinary();
            return _addon.EnableRemoteControlAllApplications(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if remote control of all applications is enabled.
      * @method Setting_IsRemoteControlAllApplicationsEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsRemoteControlAllApplicationsEnabled: function () {
        if (_addon) {
          return _addon.IsRemoteControlAllApplicationsEnabled();
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
  ZoomShareSetting: ZoomShareSetting
}