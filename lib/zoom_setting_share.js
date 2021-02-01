const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

/**
*@module
*/
var ZoomShareSetting = (function () {
  var instance;
  /**
   * mode: Zoom SDK Share Settings Service Init
   * @param {Object} addon zoom sdk module
   * @return {ZoomShareSetting}
  */
  function init(opts) {
    let clientOpts = opts || {};

    // Private methods and variables
    let _addon = clientOpts.addon.GetSettingShareCtrl() || null;
    
    return {
      /** 
      * mode: Enable Auto Fit To Window When View Sharing
      * @param {Boolean} bEnable Enable or not
      * @return {ZoomSDKError}
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
      * mode: Check if Is Auto Fit To Window When View Sharing Enabled.
      * @return {ZoomSDKError}
      */
      Setting_IsAutoFitToWindowWhenViewSharingEnabled: function () {
        if (_addon) {
          return _addon.IsAutoFitToWindowWhenViewSharingEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * mode: Enable Auto Full Screen Video When View Share
      * @param {Boolean} bEnable Enable or not
      * @return {ZoomSDKError}
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
      * mode: Is Auto Full Screen Video When View Share Enabled
      * @return {ZoomSDKError}
      */
      Setting_IsAutoFullScreenVideoWhenViewShareEnabled: function () {
        if (_addon) {
          return _addon.IsAutoFullScreenVideoWhenViewShareEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * mode: Is Current OS Support Accelerate GPU When Share
      * @return {ZoomSDKError}
      */
      Setting_IsCurrentOSSupportAccelerateGPUWhenShare: function () {
        if (_addon) {
          return _addon.IsCurrentOSSupportAccelerateGPUWhenShare();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * mode: Enable Accelerate GPU When Share
      * @param {Boolean} bEnable Enable or not
      * @return {ZoomSDKError}
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
      * mode: Is Accelerate GPU When Share Enabled
      * @return {ZoomSDKError}
      */
      Setting_IsAccelerateGPUWhenShareEnabled: function () {
        if (_addon) {
          return _addon.IsAccelerateGPUWhenShareEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * mode: Enable Remote Control All Applications
      * @param {Boolean} bEnable Enable or not
      * @return {ZoomSDKError}
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
      * mode: Is Remote Control All Applications Enabled
      * @return {ZoomSDKError}
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
    /**
     * mode: Get Zoom SDK Share Setting Service Module
     * @return {ZoomShareSetting}
    */
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