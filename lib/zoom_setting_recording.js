const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomRecordingSetting = (function () {

  var instance;
  /**
   * Zoom Recording Setting
   * @module zoom_setting_recording
   * @param {Function} onCloudRecordingStorageInfo Notification of the current cloud recording storage information.
   * @return {ZoomRecordingSetting}
   */
  function init(opts) {
    let clientOpts = opts || {};
    // Private methods and variables
    let _addon = clientOpts.addon.GetSettingRecordingCtrl() || null;
    let _onCloudRecordingStorageInfo = clientOpts.onCloudRecordingStorageInfo || null;

    /**
      Notification of the current cloud recording storage information.
      @event onCloudRecordingStorageInfo
      @param {String} storage_total_size Specify the total storage space.
      @param {String} storage_used_size Specify the used storage space.
      @param {String} allow_exceed_storage Specify whether the used space can overflow the total space. 
    */
    function onCloudRecordingStorageInfo(storage_total_size, storage_used_size, allow_exceed_storage) {
      if (_onCloudRecordingStorageInfo) {
        _onCloudRecordingStorageInfo(storage_total_size, storage_used_size, allow_exceed_storage)
      }
    }
    
    if (_addon) {
      _addon.SetonCloudRecordingStorageInfoCB(onCloudRecordingStorageInfo);
    }

    return {
      /**
      * Set on Cloud Recording Storage Info Callback
      * @method Setting_SetonCloudRecordingStorageInfoCB
      * @param {Function} onCloudRecordingStorageInfo
      * @return {Boolean}
      */
      Setting_SetonCloudRecordingStorageInfoCB: function (onCloudRecordingStorageInfo) {
        if (_addon && onCloudRecordingStorageInfo && onCloudRecordingStorageInfo instanceof Function) {
          _onCloudRecordingStorageInfo = onCloudRecordingStorageInfo;
          return true;
        }
        return false;
      },
      /** 
      * Set the path to save the recording file.
      * @method Setting_SetRecordingPath
      * @param {String} szPath Specify the path to save the recording file.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_SetRecordingPath: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_szPath = clientOpts.zn_szPath;
          try {
            let SetRecordingPathParams = new messages.SetRecordingPathParams();
            SetRecordingPathParams.setRecpath(zn_szPath);
            let bytes = SetRecordingPathParams.serializeBinary();
            return _addon.SetRecordingPath(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the path to save the recording file.
      * @method Getting_GetRecordingPath
      * @return {String} The path to save the recording file.
      */
      Getting_GetRecordingPath: function () {
        if (_addon) {
          return _addon.GetRecordingPath();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Check if the user has the privilege to get the storage information for cloud recording.
      * @method Setting_CanGetCloudRecordingStorageInfo
      * @return {Boolean} TRUE indicates the user has the privilege. FALSE not.
      */
      Setting_CanGetCloudRecordingStorageInfo: function () {
        if (_addon) {
          return _addon.CanGetCloudRecordingStorageInfo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the storage information of cloud recording.
      * If the return value is SDKERR_SUCCESS, onCloudRecordingStorageInfo() will be triggered after the infermation has be retrieved.
      * @method Getting_GetCloudRecordingStorageInfo
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Getting_GetCloudRecordingStorageInfo: function () {
        if (_addon) {
          return _addon.GetCloudRecordingStorageInfo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the recording management URL.
      * @method Getting_GetRecordingManagementURL
      * @return {String} TRUE indicates enabled. FALSE not.
      */
      Getting_GetRecordingManagementURL: function () {
        if (_addon) {
          return _addon.GetRecordingManagementURL();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Set if it is able to get recording management URL.
      * @method Setting_CanGetRecordingManagementURL
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_CanGetRecordingManagementURL: function () {
        if (_addon) {
          return _addon.CanGetRecordingManagementURL();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Set whether to enable the function of selecting the path to save the recording file after meeting.
      * @method Setting_EnableSelectRecordFileLocationAfterMeeting
      * @param {Boolean} bEnable TRUE means to enable, FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableSelectRecordFileLocationAfterMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableSelectRecordFileLocationAfterMeetingParams = new messages.EnableSelectRecordFileLocationAfterMeetingParams();
            EnableSelectRecordFileLocationAfterMeetingParams.setBenable(bEnable);
            let bytes = EnableSelectRecordFileLocationAfterMeetingParams.serializeBinary();
            return _addon.EnableSelectRecordFileLocationAfterMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Check if the function of selecting storage path for recording file is enabled.
      * @method Setting_IsSelectRecordFileLocationAfterMeetingEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsSelectRecordFileLocationAfterMeetingEnabled: function () {
        if (_addon) {
          return _addon.IsSelectRecordFileLocationAfterMeetingEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable multi-audio stream recording.
      * @method Setting_EnableMultiAudioStreamRecord
      * @param {Boolean} bEnable TRUE indicates enabled. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableMultiAudioStreamRecord: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableMultiAudioStreamRecordParams = new messages.EnableMultiAudioStreamRecordParams();
            EnableMultiAudioStreamRecordParams.setBenable(bEnable);
            let bytes = EnableMultiAudioStreamRecordParams.serializeBinary();
            return _addon.EnableMultiAudioStreamRecord(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if multi-audio stream recording is enabled.
      * @method Setting_IsMultiAudioStreamRecordEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsMultiAudioStreamRecordEnabled: function () {
        if (_addon) {
          return _addon.IsMultiAudioStreamRecordEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable watermark of timestamp.
      * @method Setting_EnableAddTimestampWatermark
      * @param {Boolean} bEnable TRUE indicates enabled. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableAddTimestampWatermark: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAddTimestampWatermarkParams = new messages.EnableAddTimestampWatermarkParams();
            EnableAddTimestampWatermarkParams.setBenable(bEnable);
            let bytes = EnableAddTimestampWatermarkParams.serializeBinary();
            return _addon.EnableAddTimestampWatermark(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if the watermark of timestamps is enabled.
      * @method Setting_IsAddTimestampWatermarkEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsAddTimestampWatermarkEnabled: function () {
        if (_addon) {
          return _addon.IsAddTimestampWatermarkEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable the optimization for the third party video editor.
      * @method Setting_EnableOptimizeFor3rdPartyVideoEditor
      * @param {Boolean} bEnable TRUE indicates enabled. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableOptimizeFor3rdPartyVideoEditor: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableOptimizeFor3rdPartyVideoEditorParams = new messages.EnableOptimizeFor3rdPartyVideoEditorParams();
            EnableOptimizeFor3rdPartyVideoEditorParams.setBenable(bEnable);
            let bytes = EnableOptimizeFor3rdPartyVideoEditorParams.serializeBinary();
            return _addon.EnableOptimizeFor3rdPartyVideoEditor(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if the third party video editor is enabled.
      * @method Setting_IsOptimizeFor3rdPartyVideoEditorEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsOptimizeFor3rdPartyVideoEditorEnabled: function () {
        if (_addon) {
          return _addon.IsOptimizeFor3rdPartyVideoEditorEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable showing the video thumbnail when sharing.
      * @method Setting_EnableShowVideoThumbnailWhenShare
      * @param {Boolean} bEnable TRUE indicates enabled. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnableShowVideoThumbnailWhenShare: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableShowVideoThumbnailWhenShareParams = new messages.EnableShowVideoThumbnailWhenShareParams();
            EnableShowVideoThumbnailWhenShareParams.setBenable(bEnable);
            let bytes = EnableShowVideoThumbnailWhenShareParams.serializeBinary();
            return _addon.EnableShowVideoThumbnailWhenShare(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if video thumbnail is enabled when sharing.
      * @method Setting_IsShowVideoThumbnailWhenShareEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsShowVideoThumbnailWhenShareEnabled: function () {
        if (_addon) {
          return _addon.IsShowVideoThumbnailWhenShareEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Enable/Disable placing the video layout next to the shared content in recording file.
      * @method Setting_EnablePlaceVideoNextToShareInRecord
      * @param {Boolean} bEnable TRUE indicates enabled. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_EnablePlaceVideoNextToShareInRecord: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnablePlaceVideoNextToShareInRecordParams = new messages.EnablePlaceVideoNextToShareInRecordParams();
            EnablePlaceVideoNextToShareInRecordParams.setBenable(bEnable);
            let bytes = EnablePlaceVideoNextToShareInRecordParams.serializeBinary();
            return _addon.EnablePlaceVideoNextToShareInRecord(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Determine if placing video next to the shared content in recording file is enabled.
      * @method Setting_IsPlaceVideoNextToShareInRecordEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
      Setting_IsPlaceVideoNextToShareInRecordEnabled: function () {
        if (_addon) {
          return _addon.IsPlaceVideoNextToShareInRecordEnabled();
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
  ZoomRecordingSetting: ZoomRecordingSetting
} 