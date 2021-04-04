const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomDirectShareHelper = (function () {
  var instance;
  /**
   * Zoom Direct Share Helper
   * @module zoom_direct_share_helper
   * @param {Function} OnDirectShareStatusUpdate The callback event will be triggered if the status of direct sharing changes.
   * @return {ZoomDirectShareHelper}
   */
  function init(opts) {
    var clientOpts = opts || {};

    // Private methods and variables
    var _addon = clientOpts.addon.GetDirectShareHelperObj() || null;
    let _OnDirectShareStatusUpdate = clientOpts.OnDirectShareStatusUpdate || null;

    /**
      The callback event will be triggered if the status of direct sharing changes.
      @event OnDirectShareStatusUpdate
      @param {String} status Specifies the status of direct sharing. Defined in: {@link DirectShareStatus}
    */
    function OnDirectShareStatusUpdate(status) {
      if (_OnDirectShareStatusUpdate) {
        _OnDirectShareStatusUpdate(status)
      }
    }

    if (_addon) {
      _addon.SetDirectShareStatusUpdateCB(OnDirectShareStatusUpdate);
    }

    return {
      /**
      * Set on direct share status update callback function.
      * @method SetMixedAudioRawDataCB
      * @param {Function} OnDirectShareStatusUpdate
      * @return {Boolean}
      */
      SetDirectShareStatusUpdateCB: function (OnDirectShareStatusUpdate) {
        if (_addon && OnDirectShareStatusUpdate && OnDirectShareStatusUpdate instanceof Function) {
          _OnDirectShareStatusUpdate = OnDirectShareStatusUpdate
          return true
        }
        return false
      },
      /**
      * Determine if it is able to start the direct sharing.
      * @method CanStartDirectShare
      * @return {Number} If it is enabled to start the direct sharing, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      CanStartDirectShare: function () {
        if (_addon) {
          return _addon.CanStartDirectShare();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Determine if direct sharing is in progress.
      * @method IsDirectShareInProgress
      * @return {Boolean}
      */
      IsDirectShareInProgress: function () {
        if (_addon) {
          return _addon.IsDirectShareInProgress();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Start direct sharing.
      * This API can only be called by the logged in user.
      * @method StartDirectShare
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      StartDirectShare: function () {
        if (_addon) {
          return _addon.StartDirectShare();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Stop direct sharing.
      * This API can only be called by the logged in user.
      * @method StopDirectShare
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      StopDirectShare: function () {
        if (_addon) {
          return _addon.StopDirectShare();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Try to match with the specified meeting number.
      * @method TryWithMeetingNumber
      * @param {Number} meetingNumber Specifies the meeting number.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      TryWithMeetingNumber: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let meetingNumber = clientOpts.meetingNumber;
          try {
            let TryWithMeetingNumberParams = new messages.TryWithMeetingNumberParams();
            TryWithMeetingNumberParams.setMeetingnumber(meetingNumber);
            let bytes = TryWithMeetingNumberParams.serializeBinary();
            return _addon.TryWithMeetingNumber(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Try to match with the pairing code.
      * @method TryWithPairingCode
      * @param {String} pairingCode Specifies the pairing code.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      TryWithPairingCode: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let pairingCode = clientOpts.pairingCode;
          try {
            let TryWithPairingCodeParams = new messages.TryWithPairingCodeParams();
            TryWithPairingCodeParams.setParingcode(pairingCode);
            let bytes = TryWithPairingCodeParams.serializeBinary();
            return _addon.TryWithPairingCode(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Delete the present direct sharing.
      * @method Cancel
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Cancel: function () {
        if (_addon) {
          return _addon.Cancel();
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
  ZoomDirectShareHelper: ZoomDirectShareHelper
}
