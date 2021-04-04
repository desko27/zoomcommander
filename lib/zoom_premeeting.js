const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomPreMeeting = (function () {
  var instance;
  /**
   * Zoom Pre Meeting
   * @module zoom_premeeting
   * @param {Function} onScheduleOrEditMeeting Schedule or edit meeting callback event.
   * @param {Function} onListMeeting List meeting callback event.
   * @param {Function} onDeleteMeeting Delete meeting callback.
   * @param {Function} onGetInviteEmailContent synchronize the content meeting invite email callback.
   * @return {ZoomPreMeeting}
   */
  function init(opts) {
    var clientOpts = opts || {};

    // Private methods and variables
    var _addon = clientOpts.addon.GetPremeetingObj() || null;
    let _onScheduleOrEditMeeting = clientOpts.onScheduleOrEditMeeting || null;
    let _onListMeeting = clientOpts.onListMeeting || null;
    let _onDeleteMeeting = clientOpts.onDeleteMeeting || null;
    let _onGetInviteEmailContent = clientOpts.onGetInviteEmailContent || null;

    /**
      Schedule or edit meeting callback event.
      @event onScheduleOrEditMeeting
      @param {String} result The result of calling ScheduleMeeting(). Defined in: {@link PremeetingAPIResult}
      @param {String} meetingUniqueID The meeting ID to schedule or edit the meeting.
    */
    function onScheduleOrEditMeeting(result, meetingUniqueID) {
      if (_onScheduleOrEditMeeting) {
        _onScheduleOrEditMeeting(result, meetingUniqueID)
      }
    }

    /**
      List meeting callback event.
      @event onListMeeting
      @param {String} result The result of calling ListMeeting(). Defined in: {@link PremeetingAPIResult}
      @param {Array} meetingList list of meeting ID.
    */
    function onListMeeting(result, meetingList) {
      if (_onListMeeting) {
        _onListMeeting(result, meetingList)
      }
    }

    /**
      Delete meeting callback.
      @event onDeleteMeeting
      @param {String} result The result of calling DeleteMeeting(). Defined in: {@link PremeetingAPIResult}
    */
    function onDeleteMeeting(result) {
      if (_onDeleteMeeting) {
        _onDeleteMeeting(result)
      }
    }

    /**
      synchronize the content meeting invite email callback.
      @event onDeleteMeeting
      @param {Number} result Defined in: {@link PremeetingAPIResult}
      @param {Number} meetingUniqueID The meeting ID that the content of meeting invite email belongs to. Valid only when result is PREMETAPIRET_SUCCESS.
      @param {Number} content The content of meeting invite email. Valid only when result is PREMETAPIRET_SUCCESS.
    */
    function onGetInviteEmailContent(result, PremeetingAPIResult, content) {
      if (_onGetInviteEmailContent) {
        _onGetInviteEmailContent(result, PremeetingAPIResult, content)
      }
    }

    if (_addon) {
      _addon.SetOnScheduleOrEditMeetingCB(onScheduleOrEditMeeting);
      _addon.SetOnListMeetingCB(onListMeeting);
      _addon.SetOnDeleteMeetingCB(onDeleteMeeting);
      _addon.SetonGetInviteEmailContentCB(onGetInviteEmailContent);
    }

    return {
      /**
      * Set on schedule or edit meeting callback function.
      * @method SetOnScheduleOrEditMeetingCB
      * @param {Function} onScheduleOrEditMeeting
      * @return {Boolean}
      */
      SetOnScheduleOrEditMeetingCB: function (onScheduleOrEditMeeting) {
        if (_addon && onScheduleOrEditMeeting && onScheduleOrEditMeeting instanceof Function) {
          _onScheduleOrEditMeeting = onScheduleOrEditMeeting;
          return true;
        }
        return false;
      },
      /**
      * Set on list meeting callback function.
      * @method SetOnListMeetingCB
      * @param {Function} onListMeeting
      * @return {Boolean}
      */
      SetOnListMeetingCB: function (onListMeeting) {
        if (_addon && onListMeeting && onListMeeting instanceof Function) {
          _onListMeeting = onListMeeting;
          return true;
        }
        return false;
      },
      /**
      * Set on delete meeting callback function.
      * @method SetOnDeleteMeetingCB
      * @param {Function} onDeleteMeeting
      * @return {Boolean}
      */
      SetOnDeleteMeetingCB: function (onDeleteMeeting) {
        if (_addon && onDeleteMeeting && onDeleteMeeting instanceof Function) {
          _onDeleteMeeting = onDeleteMeeting;
          return true;
        }
        return false;
      },
      /**
      * Set On Get Invite Email Content Callback
      * @method SetonGetInviteEmailContentCB
      * @param {Function} onGetInviteEmailContent
      * @return {Boolean}
      */
      SetonGetInviteEmailContentCB: function (onGetInviteEmailContent) {
        if (_addon && onGetInviteEmailContent && onGetInviteEmailContent instanceof Function) {
          _onGetInviteEmailContent = onGetInviteEmailContent;
          return true;
        }
        return false;
      },
      /**
      * Schedule Meeting With WndParams
      * @method ScheduleMeetingWithWndParams
      * @param {String} hSelfWnd SelfWnd (win platform require hexadecimal, mac platform means height)
      * @param {String} hParent parent window handle (win platform require hexadecimal, mac platform means width)
      * @param {String} left chat window left pos
      * @param {String} top chat window top pos
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      ScheduleMeetingWithWndParams: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let hSelfWnd = clientOpts.hSelfWnd || '0';
          let hParent = clientOpts.hParent || '0';
          let left = clientOpts.left || '0';
          let top = clientOpts.top || '0';
          try {
            let ScheduleMeetingWithWndParams = new messages.ScheduleMeetingWithWndParams();
            ScheduleMeetingWithWndParams.setHselfwnd(hSelfWnd);
            ScheduleMeetingWithWndParams.setHparent(hParent);
            ScheduleMeetingWithWndParams.setLeft(left);
            ScheduleMeetingWithWndParams.setTop(top);
            let bytes = ScheduleMeetingWithWndParams.serializeBinary();
            return _addon.ScheduleMeetingWithWndParams(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Schedule Meeting.
      * Once the function is called successfully, the user will receive the callback event via onScheduleOrEditMeeting().
      * @method ScheduleMeeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      ScheduleMeeting: function (opts) {
        if (_addon) {
          return _addon.ScheduleMeeting();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Edit Meeting.
      * Once the function is called successfully, the user will receive the callback event via onScheduleOrEditMeeting().
	    * The recurring meeting and webinar can only be edited via this function.
      * @method EditMeeting
      * @param {Number} meetingUniqueID Assign a meeting ID to schedule or edit related meeting.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      EditMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let meetingUniqueID = clientOpts.meetingUniqueID;
          try {
            let EditMeetingParams = new messages.EditMeetingParams();
            EditMeetingParams.setMeetingnumber(Number(meetingUniqueID));
            let bytes = EditMeetingParams.serializeBinary();
            return _addon.EditMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the list of current meetings.
      * Once the function is called successfully, the user will receive the callback event via onListMeeting().
      * @method ListMeeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      ListMeeting: function (opts) {
        if (_addon) {
          return _addon.ListMeeting();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Delete the specified scheduled meeting.
      * Once the function is called successfully, the user will receive the callback event via onDeleteMeeting().
	    * It is forbidden to delete personal meeting or webinar or a recurring one.
      * @method DeleteMeeting
      * @param {Number} meetingUniqueID Assign a meeting ID to delete meeting.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      DeleteMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let meetingUniqueID = clientOpts.meetingUniqueID;
          try {
            let DeleteMeetingParams = new messages.DeleteMeetingParams();
            DeleteMeetingParams.setMeetingnumber(Number(meetingUniqueID));
            let bytes = DeleteMeetingParams.serializeBinary();
            return _addon.DeleteMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Edit Meeting With Wnd Params
      * @method EditMeetingWithWndParams
      * @param {String} hSelfWnd (win platform require hexadecimal, mac platform means height)
      * @param {String} hParent (win platform require hexadecimal, mac platform means width)
      * @param {String} left Float Video left pos
      * @param {String} top Float Video pos
      * @param {Number} meetingUniqueID
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      EditMeetingWithWndParams: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let hSelfWnd = clientOpts.hSelfWnd || '0';
          let hParent = clientOpts.hParent || '0';
          let left = clientOpts.left || '0';
          let top = clientOpts.top || '0';
          let meetingUniqueID = clientOpts.meetingUniqueID;
          try {
            let EditMeetingWithWndParams = new messages.EditMeetingWithWndParams();
            EditMeetingWithWndParams.setHselfwnd(hSelfWnd);
            EditMeetingWithWndParams.setHparent(hParent);
            EditMeetingWithWndParams.setLeft(left);
            EditMeetingWithWndParams.setTop(top);
            EditMeetingWithWndParams.setMeetingnumber(Number(meetingUniqueID));
            let bytes = EditMeetingWithWndParams.serializeBinary();
            return _addon.EditMeetingWithWndParams(bytes);
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
      return instance;
    }
  };
})();

module.exports = {
  ZoomPreMeeting: ZoomPreMeeting
}
