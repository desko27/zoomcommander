const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomVideoSetting = (function () {
  let instance;
  /**
   * Zoom Video Setting
   * @module zoom_setting_video
   * @param {Function} onComputerCamDeviceChanged Callback event if the SDK detects that the computer camera devices have been changed.
   * @param {Function} onDefaultCamDeviceChanged Notify the user that a camera device is selected.
   * @return {ZoomVideoSetting}
   */
  function init(opts) {
 
    let clientOpts = opts || {};

    // Private methods and variables
    let _addon = clientOpts.addon.GetSettingVideoCtrl() || null;
    let _onComputerCamDeviceChanged = clientOpts.onComputerCamDeviceChanged || null;
    let _onDefaultCamDeviceChanged = clientOpts.onDefaultCamDeviceChanged || null;
    
    let deviceItem = {};
    function ParseDeviceList(str) {
      str.forEach(function (item, index) {
        deviceItem.deviceName = item.deviceName
        deviceItem.deviceId = item.deviceId
        deviceItem.isSelected = item.isSelected
      });
      return deviceItem;
    }
    
    /**
      Callback event if the SDK detects that the computer camera devices have been changed.
      @event onComputerCamDeviceChanged
      @param {Array} newCameraList The new list of all camera devices plugged into the computer. 
    */
    function onComputerCamDeviceChanged(newCameraList) {
      if (_onComputerCamDeviceChanged) {
        _onComputerCamDeviceChanged(newCameraList)
      }
    }
    
    /**
      Notify the user that a camera device is selected.
      @event onDefaultCamDeviceChanged
      @param {String} deviceId Specify a device to be selected.
      @param {String} deviceName Specify the device name assigned by deviceId.
    */
    function onDefaultCamDeviceChanged(deviceId, deviceName) {
      if (_onDefaultCamDeviceChanged) {
        _onDefaultCamDeviceChanged(deviceId, deviceName)
      }
    }
    
    if (_addon) {
      _addon.SetComputerCamDeviceChangedCB(onComputerCamDeviceChanged);
      _addon.SetDefaultCamDeviceChangedCB(onDefaultCamDeviceChanged);
    }

    return {
      /**
      * Set Computer Cam Device Changed Callback
      * @method Setting_SetComputerCamDeviceChangedCB
      * @param {Function} onComputerCamDeviceChanged
      * @return {Boolean}
      */
      Setting_SetComputerCamDeviceChangedCB: function (onComputerCamDeviceChanged) {
        if (_addon && onComputerCamDeviceChanged && onComputerCamDeviceChanged instanceof Function) {
          _onComputerCamDeviceChanged = onComputerCamDeviceChanged;
          return true;
        }
        return false;
      },
      /**
      * Set Default Cam Device Changed Callback
      * @method Setting_SetDefaultCamDeviceChangedCB
      * @param {Function} onDefaultCamDeviceChanged
      * @return {Boolean}
      */
      Setting_SetDefaultCamDeviceChangedCB: function (onDefaultCamDeviceChanged) {
        if (_addon && onDefaultCamDeviceChanged && onDefaultCamDeviceChanged instanceof Function) {
          _onDefaultCamDeviceChanged = onDefaultCamDeviceChanged;
          return true;
        }
        return false;
      },
      /** 
      * Select camera device.
      * @method Setting_SelectVideoCamera
      * @param {String} zn_deviceId Specify a device to be selected.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_SelectVideoCamera: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_deviceId = clientOpts.zn_deviceId || deviceItem.deviceId;
          try {
            let SelectVideoCameraParams = new messages.SelectVideoCameraParams();
            SelectVideoCameraParams.setDeviceid(zn_deviceId);
            let bytes = SelectVideoCameraParams.serializeBinary();
            return _addon.SelectVideoCamera(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get camera device list.
      * @method Setting_GetCameraList
      * @return {Array} If the function succeed, the return value the is camera device list. Otherwise failed, returns NULL.
      */
      Setting_GetCameraList: function () {
        if (_addon) {
          let devicelist_str = _addon.GetCameraList();
          return ParseDeviceList(devicelist_str);
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable video mirror effect.
      * @method Setting_EnableVideoMirrorEffect
      * @param {Boolean} zn_bEnable TRUE indicates to enable the video mirror effect.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableVideoMirrorEffect: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_bEnable = clientOpts.zn_bEnable;
          try {
            let EnableVideoMirrorEffectParams = new messages.EnableVideoMirrorEffectParams();
            EnableVideoMirrorEffectParams.setBenable(zn_bEnable);
            let bytes = EnableVideoMirrorEffectParams.serializeBinary();
            return _addon.EnableVideoMirrorEffect(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * Enable or disable the video facial beauty effect.
      * @method Setting_EnableFaceBeautyEffect
      * @param {Boolean} zn_bEnable TRUE indicates to enable the video facial beauty effect.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableFaceBeautyEffect: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_bEnable = clientOpts.zn_bEnable;
          try {
            let EnableFaceBeautyEffectParams = new messages.EnableFaceBeautyEffectParams();
            EnableFaceBeautyEffectParams.setBenable(zn_bEnable);
            let bytes = EnableFaceBeautyEffectParams.serializeBinary();
            return _addon.EnableFaceBeautyEffect(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Check if Video Mirror Effect Enabled
      * @method Checking_IsMirrorEffectEnabled
      * @return {Boolean}
      */
      Checking_IsMirrorEffectEnabled: function () {
        if (_addon) {
          return _addon.IsMirrorEffectEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * Get the flag to enable/disable the video facial beauty effect.
      * @method Checking_IsFaceBeautyEffectEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Checking_IsFaceBeautyEffectEnabled: function (opts) {
        if (_addon) {
          return _addon.IsFaceBeautyEffectEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * Enable or disable HD video.
      * @method Setting_EnableHDVideo
      * @param {Boolean} bEnable TRUE indicates to enable the HD video.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableHDVideo: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableHDVideoParams = new messages.EnableHDVideoParams();
            EnableHDVideoParams.setBenable(bEnable);
            let bytes = EnableHDVideoParams.serializeBinary();
            return _addon.EnableHDVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable/disable the HD video.
      * @method Setting_IsHDVideoEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsHDVideoEnabled: function () {
        if (_addon) {
          return _addon.IsHDVideoEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to show the username on the video.
      * @method Setting_EnableAlwaysShowNameOnVideo
      * @param {Boolean} bEnable TRUE indicates to show the username on the video.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableAlwaysShowNameOnVideo: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAlwaysShowNameOnVideoParams = new messages.EnableAlwaysShowNameOnVideoParams();
            EnableAlwaysShowNameOnVideoParams.setBenable(bEnable);
            let bytes = EnableAlwaysShowNameOnVideoParams.serializeBinary();
            return _addon.EnableAlwaysShowNameOnVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable/disable to show the username on video.
      * @method Setting_IsAlwaysShowNameOnVideoEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsAlwaysShowNameOnVideoEnabled: function () {
        if (_addon) {
          return _addon.IsAlwaysShowNameOnVideoEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to turn off the video when join meeting
      * @method Setting_EnableAutoTurnOffVideoWhenJoinMeeting
      * @param {Boolean} bEnable TRUE indicates to enable to turn off the video when join meeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableAutoTurnOffVideoWhenJoinMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAutoTurnOffVideoWhenJoinMeetingParams = new messages.EnableAutoTurnOffVideoWhenJoinMeetingParams();
            EnableAutoTurnOffVideoWhenJoinMeetingParams.setBenable(bEnable);
            let bytes = EnableAutoTurnOffVideoWhenJoinMeetingParams.serializeBinary();
            return _addon.EnableAutoTurnOffVideoWhenJoinMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable to turn off the video when join meeting.
      * @method Setting_IsAutoTurnOffVideoWhenJoinMeetingEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsAutoTurnOffVideoWhenJoinMeetingEnabled: function () {
        if (_addon) {
          return _addon.IsAutoTurnOffVideoWhenJoinMeetingEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable the 16V9 video mode.
      * @method Setting_EnableAlwaysUse16v9
      * @param {Boolean} bEnable TRUE indicates to enable the 16V9 video mode.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableAlwaysUse16v9: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAlwaysUse16v9Params = new messages.EnableAlwaysUse16v9Params();
            EnableAlwaysUse16v9Params.setBenable(bEnable);
            let bytes = EnableAlwaysUse16v9Params.serializeBinary();
            return _addon.EnableAlwaysUse16v9(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable/disable the 16V9 video mode.
      * @method Setting_IsAlwaysUse16v9
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsAlwaysUse16v9: function () {
        if (_addon) {
          return _addon.IsAlwaysUse16v9();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to spotlight the video.
      * @method Setting_EnableSpotlightSelf
      * @param {Boolean} bEnable TRUE indicates to enable to spotlight the video.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableSpotlightSelf: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableSpotlightSelfParams = new messages.EnableSpotlightSelfParams();
            EnableSpotlightSelfParams.setBenable(bEnable);
            let bytes = EnableSpotlightSelfParams.serializeBinary();
            return _addon.EnableSpotlightSelf(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable/disable to spotlight video.
      * @method Setting_IsSpotlightSelfEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsSpotlightSelfEnabled: function () {
        if (_addon) {
          return _addon.IsSpotlightSelfEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable the hardware acceleration.
      * @method Setting_EnableHardwareEncode
      * @param {Boolean} bEnable TRUE indicates to enable the hardware acceleration.
      * @param {Number} encodeType Defined in: {@link ZoomSDKVideoHardwareEncodeType} 
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableHardwareEncode: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          let encodeType = clientOpts.encodeType;
          try {
            let EnableHardwareEncodeParams = new messages.EnableHardwareEncodeParams();
            EnableHardwareEncodeParams.setBenable(bEnable);
            EnableHardwareEncodeParams.setEncodetype(encodeType);
            let bytes = EnableHardwareEncodeParams.serializeBinary();
            return _addon.EnableHardwareEncode(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable/disable the hardware acceleration.
      * @method Setting_IsHardwareEncodeEnabled
      * @param {Number} encodeType Defined in: {@link ZoomSDKVideoHardwareEncodeType} 
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsHardwareEncodeEnabled: function () {
        if (_addon) {
          let clientOpts = opts || {};
          let encodeType = clientOpts.encodeType;
          try {
            let IsHardwareEncodeEnabledParams = new messages.IsHardwareEncodeEnabledParams();
            IsHardwareEncodeEnabledParams.setEncodetype(encodeType);
            let bytes = IsHardwareEncodeEnabledParams.serializeBinary();
            return _addon.IsHardwareEncodeEnabled(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to show the participants in Gallery View up to 49 per screen.
      * @method Setting_Enable49VideoesInGallaryView
      * @param {Boolean} bEnable TRUE indicates to show the participants in Gallery View up to 49 per screen.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_Enable49VideoesInGallaryView: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let Enable49VideoesInGallaryViewParams = new messages.Enable49VideoesInGallaryViewParams();
            Enable49VideoesInGallaryViewParams.setBenable(bEnable);
            let bytes = Enable49VideoesInGallaryViewParams.serializeBinary();
            return _addon.Enable49VideoesInGallaryView(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable/disable to show the participants in Gallery View up to 49 per screen.
      * @method Setting_Is49VideoesInGallaryViewEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_Is49VideoesInGallaryViewEnabled: function () {
        if (_addon) {
          return _addon.Is49VideoesInGallaryViewEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to hide the non-video participants.
      * @method Setting_EnableHideNoVideoUsersOnWallView
      * @param {Boolean} bEnable TRUE indicates to hide the non-video Participants.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableHideNoVideoUsersOnWallView: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableHideNoVideoUsersOnWallViewParams = new messages.EnableHideNoVideoUsersOnWallViewParams();
            EnableHideNoVideoUsersOnWallViewParams.setBenable(bEnable);
            let bytes = EnableHideNoVideoUsersOnWallViewParams.serializeBinary();
            return _addon.EnableHideNoVideoUsersOnWallView(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable/disable to hide non-video participants.
      * @method Setting_IsHideNoVideoUsersOnWallViewEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsHideNoVideoUsersOnWallViewEnabled: function () {
        if (_addon) {
          return _addon.IsHideNoVideoUsersOnWallViewEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable or disable to show the video preview dialog when join meeting
      * @method Setting_EnableVideoPreviewDialog
      * @param {Boolean} bEnable TRUE indicates to enable to show the video preview dialog when join meeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableVideoPreviewDialog: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableVideoPreviewDialogParams = new messages.EnableVideoPreviewDialogParams();
            EnableVideoPreviewDialogParams.setBenable(bEnable);
            let bytes = EnableVideoPreviewDialogParams.serializeBinary();
            return _addon.EnableVideoPreviewDialog(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the flag to enable to show the video preview dialog when join meeting.
      * @method Setting_IsVideoPreviewDialogEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsVideoPreviewDialogEnabled: function () {
        if (_addon) {
          return _addon.IsVideoPreviewDialogEnabled();
        }
        return false;
      }
    };
};
  return {
    getInstance: function (opts) {
      if (!instance) {
        instance = init(opts)
      }
      return instance
    }
  };
})();

module.exports = {
  ZoomVideoSetting: ZoomVideoSetting
}