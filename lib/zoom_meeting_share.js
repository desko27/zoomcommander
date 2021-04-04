let { ZoomSDKError } = require('./settings.js');
let messages = require('./electron_sdk_pb.js');

var ZoomMeetingShare = (function () {
  var instance;
  /**
   * Zoom Meeting Share
   * @module zoom_meeting_share
   * @param {Function} onSharingStatus Callback event of the changed sharing status.
   * @return {ZoomMeetingShare}
   */
  function init(opts) {
    let clientOpts = opts || {};
    // Private methods and variables
    let _addon = clientOpts.addon.GetMeetingShareCtrl() || null;
    let _onSharingStatus = clientOpts.onSharingStatus || null;

    /**
      Callback event of the changed sharing status.
      The userId changes according to the status value. When the status value is the Sharing_Self_Send_Begin or Sharing_Self_Send_End, the userId is the user own ID. Otherwise, the value of userId is the sharer ID.
      @event onSharingStatus
      @param {String} status The values of sharing status. Defined in: {@link ZNShareStatus}
      @param {String} userId Sharer ID.
    */
    function onSharingStatus(status, userId) {
      if (_onSharingStatus) {
        _onSharingStatus(status, userId)
      }
    }

    if (_addon) {
      _addon.SetOnSharingStatusCB(onSharingStatus);
    }

    return {
      // Public methods and variables
      /**
      * Set callback function of notification of the changed sharing status.
      * @method MeetingShare_SetOnSharingStatusCB
      * @param {Function} onSharingStatus
      * @return {Boolean}
      */
      MeetingShare_SetOnSharingStatusCB: function (onSharingStatus) {
        if (_addon && onSharingStatus && onSharingStatus instanceof Function) {
          _onSharingStatus = onSharingStatus;
          return true;
        }
        return false;
      },
      /**
      * Share the specified application.
      * @method MeetingShare_StartAppShare
      * @param {String} zn_hShare_app (require hexadecimal) Specify the window handle of the application to be shared. If the hwndSharedApp can't be shared, the return value is the SDKERR_INVALID_PARAMETER error code. If the hwndSharedApp is NULL, the primary monitor will be shared.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingShare_StartAppShare: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_hShare_app = clientOpts.zn_hShare_app;
          try {
            let StartAppShareParams = new messages.StartAppShareParams();
            StartAppShareParams.setHshareapp(zn_hShare_app);
            let bytes = StartAppShareParams.serializeBinary();
            return _addon.StartAppShare(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Share the specified monitor.
      * @method MeetingShare_StartMonitorShare
      * @param {String} zn_monitorID Specify the monitor ID to be shared. You may get the value via EnumDisplayMonitors System API. If the monitorID is NULL, the primary monitor will be shared
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingShare_StartMonitorShare: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_monitorID = clientOpts.zn_monitorID;
          try {
            let StartMonitorShareParams = new messages.StartMonitorShareParams();
            StartMonitorShareParams.setMonitorid(zn_monitorID);
            let bytes = StartMonitorShareParams.serializeBinary();
            return _addon.StartMonitorShare(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Stop the current sharing.
      * @method MeetingShare_StopShare
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingShare_StopShare: function () {
        if (_addon) {
          return _addon.StopShare();
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
  ZoomMeetingShare: ZoomMeetingShare,
}
