const { ZoomSDKError, ZNSDKUserInfoType } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomMeetingParticipantsCtrl = (function () {
  var instance;
  /**
   * Zoom Meeting Participants Ctrl
   * @module zoom_meeting_participants_ctrl
   * @param {Function} meetinguserjoincb Callback event of notification of users who are in the meeting.
   * @param {Function} meetinguserleftcb Callback event of notification of user who leaves the meeting.
   * @param {Function} meetinghostchangecb Callback event of notification of the new host.
   * @return {ZoomMeetingParticipantsCtrl}
   */
  function init(opts) {
    var clientOpts = opts || {};

    // Private methods and variables
    var _addon = clientOpts.addon.GetMeetingParticipantsCtrl() || null;
    let _meetinguserjoincb = clientOpts.meetinguserjoincb || null;
    let _meetinguserleftcb = clientOpts.meetinguserleftcb || null;
    let _meetinghostchangecb = clientOpts.meetinghostchangecb || null;
    let _meetingloworraisehandstatuschangecb = clientOpts.meetingloworraisehandstatuschangecb || null;
    let _meetingusernamechangecb = clientOpts.meetingusernamechangecb || null;

    /**
      Callback event of notification of users who are in the meeting.
      @event meetinguserjoincb
      @param {String} lstUserID List of the user ID.
      @param {Array} strUserList List of user in json format. This function is currently invalid, hereby only for reservations.
    */
    function meetinguserjoincb(lstUserID, strUserList) {
      if (_meetinguserjoincb) {
        _meetinguserjoincb(lstUserID, strUserList)
      }
    }

    /**
      Callback event of notification of user who leaves the meeting.
      @event meetinguserleftcb
      @param {String} lstUserID List of the user ID who leaves the meeting.
      @param {Array} strUserList List of the user in json format. This function is currently invalid, hereby only for reservations.
    */
    function meetinguserleftcb(lstUserID, strUserList) {
      if (_meetinguserleftcb) {
        _meetinguserleftcb(lstUserID, strUserList)
      }
    }

    /**
      Callback event of notification of the new host.
      @event meetinghostchangecb
      @param {Number} userId Specify the ID of the new host.
    */
    function meetinghostchangecb(userId) {
      if (_meetinghostchangecb) {
        _meetinghostchangecb(userId)
      }
    }

    function meetingloworraisehandstatuschangecb(data) {
      if (_meetingloworraisehandstatuschangecb) {
        _meetingloworraisehandstatuschangecb(data)
      }
    }

    function meetingusernamechangecb(data) {
      if (_meetingusernamechangecb) {
        _meetingusernamechangecb(data)
      }
    }

    if (_addon) {
      _addon.SetMeetingUserJoinCB(meetinguserjoincb);
      _addon.SetMeetingUserLeftCB(meetinguserleftcb);
      _addon.SetMeetingHostChangeCB(meetinghostchangecb);
      _addon.SetMeetingLowOrRaiseHandStatusChangeCB(meetingloworraisehandstatuschangecb);
      _addon.SetMeetingUserNameChangeCB(meetingusernamechangecb);
    }

    return {
      // Public methods and variables
      /**
       * Set callback function of notification of users who are in the meeting.
       * @method SetMeetingUserJoinCB
       * @param {Function} meetinguserjoincb
       * @return {Boolean}
       */
      SetMeetingUserJoinCB: function(meetinguserjoincb) {
        if (_addon && meetinguserjoincb && meetinguserjoincb instanceof Function) {
          _meetinguserjoincb = meetinguserjoincb;
          return true;
        }
        return false;
      },
      /**
       * Set callback function of notification of users who leave the meeting.
       * @method SetMeetingUserLeftCB
       * @param {Function} meetinguserleftcb
       * @return {Boolean}
       */
      SetMeetingUserLeftCB: function(meetinguserleftcb) {
        if (_addon && meetinguserleftcb && meetinguserleftcb instanceof Function) {
          _meetinguserleftcb = meetinguserleftcb;
          return true
        }
        return false
      },
      /**
       * Set callback function of notification of the new host.
       * @method SetMeetingHostChangeCB
       * @param {Function} onHostChangeNotification
       * @return {Boolean}
       */
      SetMeetingHostChangeCB: function(onHostChangeNotification) {
        if (_addon && onHostChangeNotification && meetinguserleftcb instanceof Function) {
          _onHostChangeNotification = onHostChangeNotification;
          return true;
        }
        return false;
      },
      /**
       * Set Meeting Low Or Raise Hand Status Change CB
       * @param {Function} onLowOrRaiseHandStatusChangeNotification
       * @return {Boolean}
       */
      SetMeetingLowOrRaiseHandStatusChangeCB: function(onLowOrRaiseHandStatusChangeNotification) {
        if (_addon && onLowOrRaiseHandStatusChangeNotification && onLowOrRaiseHandStatusChangeNotification instanceof Function) {
          _meetingloworraisehandstatuschangecb = onLowOrRaiseHandStatusChangeNotification;
          return true;
        }
        return false;
      },
      /**
       * Set Meeting User Name Change CB
       * @param {Function} onUserNameChangeNotification
       * @return {Boolean}
       */
      SetMeetingUserNameChangeCB: function(onUserNameChangeNotification) {
        if (_addon && onUserNameChangeNotification && onUserNameChangeNotification instanceof Function) {
          _meetingusernamechangecb = onUserNameChangeNotification;
          return true;
        }
        return false;
      },
      /**
       * Get the list of all the panelists in the meeting.
       * @method GetParticipantsList
       * @return {Array} If the function succeed, the return value is the list of the panelists in the meeting.
	        Otherwise failed, the return value is NULL.
       */
      GetParticipantsList: function () {
        if (_addon) {
          return _addon.GetParticipantsList();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the information of specified user.
       * @method GetUserInfoByUserID
       * @param {Number} userid Specify the user ID for which you want to get the information.
	        Zero(0) indicates to get the information of the current user.
       * @return {Number} If the function succeed, the return value is an object which includes the user's infomation.
	        Otherwise failed, the return value is an empty object.
       */
      GetUserInfoByUserID: function(userid) {
        if (_addon) {
          try {
            let GetUserInfoByUserIDParams = new messages.GetUserInfoByUserIDParams();
            GetUserInfoByUserIDParams.setUserid(Number(userid));
            let bytes = GetUserInfoByUserIDParams.serializeBinary();
            let userInfo = _addon.GetUserInfoByUserID(bytes);
            if (userInfo.userInfoType == ZNSDKUserInfoType.ZN_FAKE_USERINFO) {
              return {}
            } else {
              return userInfo
            }
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * LowerHand of user
       * @return {Object}
       */
      LowerHand: function(userid) {
        if (_addon) {
          return _addon.LowerHand(Number(userid));
        }
        return "";
      },
      /**
       * Lower All Hands
       * @return {Object}
       */
      LowerAllHands: function() {
        if (_addon) {
          return _addon.LowerAllHands();
        }
        return "";
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
  ZoomMeetingParticipantsCtrl: ZoomMeetingParticipantsCtrl
}
