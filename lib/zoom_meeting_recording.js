let { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomMeetingRecording = (function () {
  var instance;
  /**
  * Zoom Meeting Recording
  * @module zoom_meeting_recording
  * @param {Function} onRecording2MP4Done Callback event of ending the conversion to MP4 format.
  * @param {Function} onRecording2MP4Processing Callback event of the process of the conversion to MP4 format.
  * @param {Function} onRecordingStatus Callback event that the status of local recording changes, Defined in: {@link ZNRecordingStatus}
  * @param {Function} onCloudRecordingStatus Callback event that the status of cloud recording changes, Defined in: {@link ZNRecordingStatus}
  * @param {Function} onRecordPriviligeChanged Callback event that the recording authority changes.
  * @param {Function} onCustomizedLocalRecordingSourceNotification Callback event that the local recording source changes in the custom user interface mode.
  * @return {ZoomMeetingRecording}
  */
  function init(opts) {
    let clientOpts = opts || {};
    // Private methods and variables
    let _addon = clientOpts.addon.GetMeetingRecordingCtrl() || null;
    let _onRecording2MP4Done = clientOpts.onRecording2MP4Done || null;
    let _onRecording2MP4Processing = clientOpts.onRecording2MP4Processing || null;
    let _onRecordingStatus = clientOpts.onRecordingStatus || null;
    let _onCloudRecordingStatus = clientOpts.onCloudRecordingStatus || null;
    let _onRecordPriviligeChanged = clientOpts.onRecordPriviligeChanged || null;
    let _onCustomizedLocalRecordingSourceNotification = clientOpts.onCustomizedLocalRecordingSourceNotification || null;

    /**
      Callback event of ending the conversion to MP4 format.
      In order to trigger this callback correctly, you need call EnableLocalRecordingConvertProgressBarDialog(false) before you start a meeting.
      @event onRecording2MP4Done
      @param {Boolean} success TRUE indicates to convert successfully. FALSE not.
      @param {String} result This value is used to save the error code only when the convert fails.
      @param {String} path If the conversion is successful, this value is used to save the path of the recording file. 
    */
    function onRecording2MP4Done(success, result, path) {
      if (_onRecording2MP4Done) {
        _onRecording2MP4Done(success, result, path)
      }
    }

    /**
      Callback event of the process of the conversion to MP4 format.
      In order to trigger this callback correctly, you need call EnableLocalRecordingConvertProgressBarDialog(false) before you start a meeting.
      @event onRecording2MP4Processing
      @param {String} percentage Percentage of conversion process. Range from ZERO(0) to ONE HUNDREAD(100).
    */
    function onRecording2MP4Processing(percentage) {
      if (_onRecording2MP4Processing) {
        _onRecording2MP4Processing(percentage)
      }
    }

    /**
      Callback event that the status of local recording changes.
      @event onRecordingStatus
      @param {String} status Value of recording status. For more details, Defined in: {@link ZNRecordingStatus}
    */
    function onRecordingStatus(status) {
      if (_onRecordingStatus) {
        _onRecordingStatus(status)
      }
    }

    /**
      Callback event that the status of cloud recording changes.
      @event onCloudRecordingStatus
      @param {String} status Value of recording status. For more details, Defined in: {@link ZNRecordingStatus}
    */
    function onCloudRecordingStatus(status) {
      if (_onCloudRecordingStatus) {
        _onCloudRecordingStatus(status)
      }
    }

    /**
      Callback event that the recording authority changes.
      @event onRecordPriviligeChanged
      @param {Boolean} canRec TRUE indicates to enable to record.
    */
    function onRecordPriviligeChanged(canRec) {
      if (_onRecordPriviligeChanged) {
        _onRecordPriviligeChanged(canRec)
      }
    }

    /**
      Callback event that the local recording source changes in the custom user interface mode.
      @event onCustomizedLocalRecordingSourceNotification
      @param {String} result
    */
    function onCustomizedLocalRecordingSourceNotification(result) {
      if (_onCustomizedLocalRecordingSourceNotification) {
        _onCustomizedLocalRecordingSourceNotification(result)
      }
    }

    if (_addon) {
      _addon.SetonRecording2MP4DoneCB(onRecording2MP4Done);
      _addon.SetonRecording2MP4ProcessingCB(onRecording2MP4Processing);
      _addon.SetonRecordingStatusCB(onRecordingStatus);
      _addon.SetonCloudRecordingStatusCB(onCloudRecordingStatus);
      _addon.SetonRecordPriviligeChangedCB(onRecordPriviligeChanged);
      _addon.SetonCustomizedLocalRecordingSourceNotificationCB(onCustomizedLocalRecordingSourceNotification);
    }

    return {
      /** 
       * Set on Recording 2MP4 Done Callback
       * @method SetonRecording2MP4DoneCB
       * @param {Function} onRecording2MP4Done
       * @return {Boolean}
       */
      SetonRecording2MP4DoneCB: function (onRecording2MP4Done) {
        if (_addon && onRecording2MP4Done && onRecording2MP4Done instanceof Function) {
          _onRecording2MP4Done = onRecording2MP4Done;
          return true;
        }
        return false
      },
      /** 
       * Set on Recording 2MP4 Processing Callback
       * @method SetonRecording2MP4ProcessingCB
       * @param {Function} onRecording2MP4Processing
       * @return {Boolean}
       */
      SetonRecording2MP4ProcessingCB: function (onRecording2MP4Processing) {
        if (_addon && onRecording2MP4Processing && onRecording2MP4Processing instanceof Function) {
          _onRecording2MP4Processing = onRecording2MP4Processing;
          return true;
        }
        return false;
      },
      /** 
       * Set on Recording Status Callback
       * @method SetonRecordingStatusCB
       * @param {Function} onRecordingStatus
       * @return {Boolean}
       */
      SetonRecordingStatusCB: function (onRecordingStatus) {
        if (_addon && onRecordingStatus && onRecordingStatus instanceof Function) {
          _onRecordingStatus = onRecordingStatus;
          return true;
        }
        return false;
      },
      /** 
       * Set on Cloud Recording Status Callback
       * @method SetonCloudRecordingStatusCB
       * @param {Function} onCloudRecordingStatus
       * @return {Boolean}
       */
      SetonCloudRecordingStatusCB: function (onCloudRecordingStatus) {
        if (_addon && onCloudRecordingStatus && onCloudRecordingStatus instanceof Function) {
          _onCloudRecordingStatus = onCloudRecordingStatus;
          return true;
        }
        return false;
      },
      /** 
       * Set on Record Privilige Changed Callback
       * @method SetonRecordPriviligeChangedCB
       * @param {Function} onRecordPriviligeChanged
       * @return {Boolean}
       */
      SetonRecordPriviligeChangedCB: function (onRecordPriviligeChanged) {
        if (_addon && onRecordPriviligeChanged && onRecordPriviligeChanged instanceof Function) {
          _onRecordPriviligeChanged = onRecordPriviligeChanged;
          return true;
        }
        return false;
      },
      /** 
       * Set on Customized Local Recording Source Notification Callback
       * @method SetonCustomizedLocalRecordingSourceNotificationCB
       * @param {Function} onCustomizedLocalRecordingSourceNotification
       * @return {Boolean}
       */
      SetonCustomizedLocalRecordingSourceNotificationCB: function (onCustomizedLocalRecordingSourceNotification) {
        if (_addon && onCustomizedLocalRecordingSourceNotification && onCustomizedLocalRecordingSourceNotification instanceof Function) {
          _onCustomizedLocalRecordingSourceNotification = onCustomizedLocalRecordingSourceNotification;
          return true;
        }
        return false;
      },
      /** 
       * Start recording.
       * @method StartRecording
       * @param {String} recPath Specifies the path of saving the recording. The SDK will try to create this path if the specified one does not exist. If the creation failed, an error code SDKERR_INVALID_PARAMETER returns. 
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS. 
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      StartRecording: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let recPath = clientOpts.recPath;
          try {
            let StartRecordingParams = new messages.StartRecordingParams();
            StartRecordingParams.setRecpath(recPath);
            let bytes = StartRecordingParams.serializeBinary();
            return _addon.StartRecording(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Stop recording.
       * @method StopRecording
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      StopRecording: function () {
        if (_addon) {
          return _addon.StopRecording();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Determine if the specified user is enabled to start recording.
       * @method CanStartRecording
       * @param {Boolean} cloud_recording TRUE indicates to determine whether to enable the cloud recording. FALSE local recording. 
       * @return {Number} If the value of cloud_recording is set to TRUE and the cloud recording is enabled, the return value is SDKERR_SUCCESS.
	        If the value of cloud_recording is set to FALSE and the local recording is enabled, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      CanStartRecording: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let cloud_recording = clientOpts.cloud_recording;
          let userid = clientOpts.userid;
          try {
            let CanStartRecordingParams = new messages.CanStartRecordingParams();
            CanStartRecordingParams.setBcloudrecording(cloud_recording);
            CanStartRecordingParams.setUserid(Number(userid));
            let bytes = CanStartRecordingParams.serializeBinary();
            return _addon.CanStartRecording(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Determine if the current user own the authority to change the recording permission of the others.
      * @method CanAllowDisAllowLocalRecording
      * @return {Number} If the user own the authority, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      CanAllowDisAllowLocalRecording: function () {
        if (_addon) {
          return _addon.CanAllowDisAllowLocalRecording();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Start cloud recording.
       * @method StartCloudRecording
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      StartCloudRecording: function () {
        if (_addon) {
          return _addon.StartCloudRecording();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Stop cloud recording.
       * @method StopCloudRecording
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      StopCloudRecording: function () {
        if (_addon) {
          return _addon.StopCloudRecording();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Determine if the user owns the authority to enable the local recording. 
       * @method IsSupportLocalRecording
       * @param {Number} userid Specifies the user ID.
       * @return {Number} If the specified user is enabled to start local recording, the return value is SDKERR_SUCCESS. 
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      IsSupportLocalRecording: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let userid = clientOpts.userid;
          try {
            let IsSupportLocalRecordingParams = new messages.IsSupportLocalRecordingParams();
            IsSupportLocalRecordingParams.setUserid(userid);
            let bytes = IsSupportLocalRecordingParams.serializeBinary();
            return _addon.IsSupportLocalRecording(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Give the specified user authority for local recording.
       * @method AllowLocalRecording
       * @param {Number} userid Specifies the user ID.
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      AllowLocalRecording: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let userid = clientOpts.userid;
          try {
            let AllowLocalRecordingParams = new messages.AllowLocalRecordingParams();
            AllowLocalRecordingParams.setUserid(userid);
            let bytes = AllowLocalRecordingParams.serializeBinary();
            return _addon.AllowLocalRecording(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Abrogate the authority of the specified user for local recoding.
       * @method DisAllowLocalRecording
       * @param {Number} userid Specifies the user ID.
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      DisAllowLocalRecording: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let userid = clientOpts.userid;
          try {
            let DisAllowLocalRecordingParams = new messages.DisAllowLocalRecordingParams();
            DisAllowLocalRecordingParams.setUserid(userid);
            let bytes = DisAllowLocalRecordingParams.serializeBinary();
            return _addon.DisAllowLocalRecording(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Send a request to enable the SDK to call onCustomizedLocalRecordingSourceNotification().
      * @method RequestCustomizedLocalRecordingSource
      * @return {Boolean} If the function succeed, the return value is SDKERR_SUCCESS, and you will receive the onCustomizedLocalRecordingSourcenNotification callback event.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      RequestCustomizedLocalRecordingSource: function () {
        if (_addon) {
          return _addon.RequestCustomizedLocalRecordingSource();
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
  ZoomMeetingRecording: ZoomMeetingRecording
}