const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomMeetingAudio = (function () {
  var instance;
  /**
   * Zoom Meeting Audio
   * @module zoom_meeting_audio
   * @param {Function} onUserAudioStatusChange User's audio status changed callback.
   * @param {Function} onUserActiveAudioChange The callback event that users whose audio is active changed.
   * @return {ZoomMeetingAudio}
   */
  function init(opts) {
    var clientOpts = opts || {};

    // Private methods and variables
    var _addon = clientOpts.addon.GetMeetingAudioCtrl() || null;
    let _onUserAudioStatusChange = clientOpts.onUserAudioStatusChange || null;
    let _onUserActiveAudioChange = clientOpts.onUserActiveAudioChange || null;

    /**
      User's audio status changed callback.
      @event onUserAudioStatusChange
      @param {String} lstAudioStatusChange List of the user information with audio status changed. The list will be emptied once the function calls end.
      @param {Array} strAudioStatusList List of the user information whose audio status changes, saved in json format. This parameter is currently invalid, hereby only for reservations.
    */
    function onUserAudioStatusChange(lstAudioStatusChange, strAudioStatusList) {
      if (_onUserAudioStatusChange) {
        _onUserAudioStatusChange(lstAudioStatusChange, strAudioStatusList)
      }
    }

    /**
      The callback event that users whose audio is active changed.
      @event onUserActiveAudioChange
      @param {String} lstActiveAudio List to store the ID of user whose audio is active.
    */
    function onUserActiveAudioChange(lstActiveAudio) {
      if (_onUserActiveAudioChange) {
        _onUserActiveAudioChange(lstActiveAudio)
      }
    }

    if (_addon) {
      _addon.SetMeetingAudioStatusCB(onUserAudioStatusChange);
      _addon.SetUserActiveAudioChangeCB(onUserActiveAudioChange);
    }

    return {
      // Public methods and variables
      /**
       * Set user's audio status changed callback function.
       * @method MeetingAudio_SetMeetingAudioStatusCB
       * @param {Function} onUserAudioStatusChange
       * @return {Boolean}
       */
      MeetingAudio_SetMeetingAudioStatusCB: function (onUserAudioStatusChange) {
        if (addon && onUserAudioStatusChange && onUserAudioStatusChange instanceof Function) {
          _onUserAudioStatusChange = onUserAudioStatusChange
          return true
        }
        return false
      },
      /**
       * Set the callback event that users whose audio is active changed.
       * @method MeetingAudio_SetUserActiveAudioChangeCB
       * @param {Function} onUserActiveAudioChange
       * @return {Boolean}
       */
      MeetingAudio_SetUserActiveAudioChangeCB: function (onUserActiveAudioChange) {
        if (addon && onUserActiveAudioChange && onUserActiveAudioChange instanceof Function) {
          _onUserActiveAudioChange = onUserActiveAudioChange
          return true
        }
        return false
      },
      /**
      * Mute the assigned user.
      * @method MeetingAudio_MuteAudio
      * @param {Number} userid Specify the user ID to mute. null indicates to mute all the participants.
      * @param {Boolean} allowunmutebyself The user may unmute himself when everyone is muted.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingAudio_MuteAudio: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let userid = clientOpts.userid || '';
          let allowunmutebyself = clientOpts.allowunmutebyself;
          try {
            let MuteAudioParams = new messages.MuteAudioParams();
            MuteAudioParams.setUserid(userid);
            MuteAudioParams.setAllowunmutebyself(allowunmutebyself);
            let bytes = MuteAudioParams.serializeBinary();
            return _addon.MuteAudio(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Unmute the assigned user.
      * @method MeetingAudio_UnMuteAudio
      * @param {Number} userid Specify the user ID to unmute.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingAudio_UnMuteAudio: function (opts) {
        if (_addon) {
          var clientOpts = opts || {};
          var userid = clientOpts.userid;
          try {
            let UnmuteAudioParams = new messages.UnmuteAudioParams();
            UnmuteAudioParams.setUserid(userid);
            let bytes = UnmuteAudioParams.serializeBinary();
            return _addon.UnMuteAudio(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Join VoIP meeting.
      * @method MeetingAudio_JoinVoip
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingAudio_JoinVoip: function () {
        if (_addon){
          return _addon.JoinVoip();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Leave VoIP meeting.
      * @method MeetingAudio_LeaveVoip
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingAudio_LeaveVoip: function () {
        if (_addon) {
          return _addon.LeaveVoip();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * User joins or leaves the meeting in silence or no.
      * @method MeetingAudio_EnablePlayChimeWhenEnterOrExit
      * @param {Boolean} bEnable TRUE indicates to play chime when the user joins or leaves the meeting.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingAudio_EnablePlayChimeWhenEnterOrExit: function (opts) {
        if (_addon) {
          var clientOpts = opts || {};
          var bEnable = clientOpts.bEnable;
          try {
            let EnablePlayChimeWhenEnterOrExitParams = new messages.EnablePlayChimeWhenEnterOrExitParams();
            EnablePlayChimeWhenEnterOrExitParams.setBenable(bEnable);
            let bytes = EnablePlayChimeWhenEnterOrExitParams.serializeBinary();
            return _addon.EnablePlayChimeWhenEnterOrExit(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
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
      return instance
    }
  };
})();

module.exports = {
  ZoomMeetingAudio: ZoomMeetingAudio
}
