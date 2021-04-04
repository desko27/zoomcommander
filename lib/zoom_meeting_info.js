const { ZoomSDKError } = require('./settings.js');

var ZoomMeetingInfo = (function () {
  var instance;
  /**
  * Zoom Meeting Info
  * @module zoom_meeting_info
  * @return {ZoomMeetingInfo}
  */
  function init(opts) {
    let clientOpts = opts || {};
    // Private methods and variables
    let _addon = clientOpts.addon.GetMeetingInfo() || null;
    return {
      /**
       * Get the current meeting number.
       * @method GetMeetingNumber
       * @return {Number} If the function succeed, the return value is the current meeting number. Otherwise returns ZERO(0).
       */
      GetMeetingNumber: function () {
        if (_addon) {
          return _addon.GetMeetingNumber();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the meeting topic.
       * @method GetMeetingTopic
       * @return {String} If the function succeed, the return value is the current meeting topic. Otherwise returns an empty string of length ZERO(0)
       */
      GetMeetingTopic: function () {
        if (_addon) {
          return _addon.GetMeetingTopic();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the current meeting ID.
       * @method GetMeetingID
       * @return {Number} If the function succeed, the return value is the current meeting ID. Otherwise returns an empty string of length ZERO(0).
       */
      GetMeetingID: function () {
        if (_addon) {
          return _addon.GetMeetingID();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the meeting type.
      * @method GetMeetingType
      * @return {Number} If the function succeed, the return value is the current meeting type. Defined in: {@link MeetingType} 
      */
      GetMeetingType: function () {
        if (_addon) {
          return _addon.GetMeetingType();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Get the email invitation template for the current meeting.
       * @method GetInviteEmailTeamplate
       * @return {String} If the function succeed, the return value is the email invitation template. Otherwise returns NULL.
       */
      GetInviteEmailTeamplate: function () {
        if (_addon) {
          return _addon.GetInviteEmailTeamplate();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Get the meeting title in the email invitation template.
       * @method GetInviteEmailTitle
       * @return {String} If the function succeed, the return value is the meeting title. Otherwise returns NULL.
       */
      GetInviteEmailTitle: function () {
        if (_addon) {
          return _addon.GetInviteEmailTitle();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
       * Get the URL of invitation to join the meeting.
       * @method GetJoinMeetingUrl
       * @return {String} If the function succeed, the return value is the URL of invitation. Otherwise returns NULL.
       */
      GetJoinMeetingUrl: function () {
        if (_addon) {
          return _addon.GetJoinMeetingUrl();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Get the host tag of the current meeting.
      * @method GetMeetingHostTag
      * @return {String} If the function succeed, the return value is the host tag. Otherwise returns NULL.
      */
      GetMeetingHostTag: function () {
        if (_addon) {
          return _addon.GetMeetingHostTag();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Check if Internal Meeting
      * @method CheckingIsInternalMeeting
      * @return {Boolean}
      */
      CheckingIsInternalMeeting: function () {
        if (_addon) {
          return _addon.CheckingIsInternalMeeting();
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
  ZoomMeetingInfo: ZoomMeetingInfo
}