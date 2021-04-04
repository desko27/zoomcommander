const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomMeetingVideo = (function () {
  var instance;
  /**
   * Zoom Meeting Video
   * @module zoom_meeting_video
   * @param {Function} onUserVideoStatusChange Callback event of the user video status changes.
   * @param {Function} onActiveSpeakerVideoUserChanged Callback event of the active speaker video user changes.
   * @param {Function} onActiveVideoUserChanged Callback event of the active video user changes.
   * @return {ZoomMeetingVideo}
   */
  function init(opts) {
    var clientOpts = opts || {};
    // Private methods and variables
    var _addon = clientOpts.addon.GetMeetingVideoCtrl();
    let _onUserVideoStatusChange = clientOpts.onUserVideoStatusChange || null;
    let _onActiveSpeakerVideoUserChanged = clientOpts.onActiveSpeakerVideoUserChanged || null;
    let _onActiveVideoUserChanged = clientOpts.onActiveVideoUserChanged || null;

    /**
      Callback event of the user video status changes.
      @event onUserVideoStatusChange
      @param {String} userId The user ID whose video status changes
      @param {String} status New video status. Defined in: {@link ZoomMeetingVideoStatus}
    */
    function onUserVideoStatusChange(userId, status) {
      if (_onUserVideoStatusChange) {
        _onUserVideoStatusChange(userId, status)
      }
    }

    /**
      Callback event of the active speaker video user changes.
      @event onActiveSpeakerVideoUserChanged
      @param {String} userId The ID of user who becomes the new active speaker.
    */
    function onActiveSpeakerVideoUserChanged(userId) {
      if (_onActiveSpeakerVideoUserChanged) {
        _onActiveSpeakerVideoUserChanged(userId)
      }
    }

    /**
      Callback event of the active video user changes.
      @event onActiveVideoUserChanged
      @param {String} userId The ID of user who becomes the new active speaker.
    */
    function onActiveVideoUserChanged(userId) {
      if (_onActiveVideoUserChanged) {
        _onActiveVideoUserChanged(userId)
      }
    }

    if (_addon) {
      _addon.SetMeetingVideoStatusCB(onUserVideoStatusChange);
      _addon.SetActiveSpeakerVideoUserChangedCB(onActiveSpeakerVideoUserChanged);
      _addon.SetActiveVideoUserChangedCB(onActiveVideoUserChanged);
    }

    return {
      // Public methods and variables
      /**
      * Set callback function of notification of the user video status changes.
      * @method MeetingVideo_SetMeetingVideoStatusCB
      * @param {Function} onUserVideoStatusChange
      * @return {Boolean}
      */
      MeetingVideo_SetMeetingVideoStatusCB: function (onUserVideoStatusChange) {
        if (_addon && onUserVideoStatusChange && onUserVideoStatusChange instanceof Function) {
          _onUserVideoStatusChange = onUserVideoStatusChange;
          return true;
        }
        return false;
      },
      /**
      * Set callback function of notification of the active speaker video user changes.
      * @method MeetingVideo_SetActiveSpeakerVideoUserChangedCB
      * @param {Function} onActiveSpeakerVideoUserChanged
      * @return {Boolean}
      */
      MeetingVideo_SetActiveSpeakerVideoUserChangedCB: function (onActiveSpeakerVideoUserChanged) {
        if (_addon && onActiveSpeakerVideoUserChanged && onActiveSpeakerVideoUserChanged instanceof Function) {
          _onActiveSpeakerVideoUserChanged = onActiveSpeakerVideoUserChanged;
          return true;
        }
        return false;
      },
      /**
      * Set callback function of notification of the active video user changes.
      * @method MeetingVideo_SetActiveVideoUserChangedCB
      * @param {Function} onActiveVideoUserChanged
      * @return {Boolean}
      */
      MeetingVideo_SetActiveVideoUserChangedCB: function (onActiveVideoUserChanged) {
        if (_addon && onActiveVideoUserChanged && onActiveVideoUserChanged instanceof Function) {
          _onActiveVideoUserChanged = onActiveVideoUserChanged;
          return true;
        }
        return false;
      },
      /**
      * Turn off the user's own video.
      * @method MeetingVideo_MuteVideo
      * @param {Number} userid Specifies which the user's video to mute
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingVideo_MuteVideo: function(opts) {
        if(_addon) {
          let clientOpts = opts || {};
          let userid = clientOpts.userid;
          try {
            let MuteVideoParams = new messages.MuteVideoParams();
            MuteVideoParams.setUserid(Number(userid));
            let bytes = MuteVideoParams.serializeBinary();
            return _addon.MuteVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Turn on the user's own video.
      * @method MeetingVideo_UnMuteVideo
      * @param {Number} userid Specifies which the user's video to unmute
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingVideo_UnMuteVideo: function (opts) {
        if(_addon) {
          let clientOpts = opts || {};
          let userid = clientOpts.userid;
          try {
            let UnMuteVideoParams = new messages.UnMuteVideoParams();
            UnMuteVideoParams.setUserid(Number(userid));
            let bytes = UnMuteVideoParams.serializeBinary();
            return _addon.UnMuteVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * pin video
      * @method MeetingVideo_PinVideo
      * @param {Boolean} bPin bPin or not
      * @param {Boolean} bFirstView bFirstView or not
      * @param {Number} userid Specifies which the user's video to pin
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingVideo_PinVideo: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bPin = clientOpts.bPin;
          let bFirstView = clientOpts.bFirstView;
          let userid = clientOpts.userid;
          try {
            let PinVideoParams = new messages.PinVideoParams();
            PinVideoParams.setBpin(bPin);
            PinVideoParams.setBfirstview(bFirstView);
            PinVideoParams.setUserid(Number(userid));
            let bytes = PinVideoParams.serializeBinary();
            return _addon.PinVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Spotlight the video of the assigned user to the first view.
      * @method MeetingVideo_SpotlightVideo
      * @param {Boolean} bSpotlight bSpotlight or not
      * @param {Number} userid Specifies which the user's video to pin
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingVideo_SpotlightVideo: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bSpotlight = clientOpts.bSpotlight;
          let userid = clientOpts.userid;
          try {
            let SpotlightVideoParams = new messages.SpotlightVideoParams();
            SpotlightVideoParams.setBspotlight(bSpotlight);
            SpotlightVideoParams.setUserid(Number(userid));
            let bytes = SpotlightVideoParams.serializeBinary();
            return _addon.SpotlightVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Display or not the user who does not turn on the video in the video all mode.
      * @method MeetingVideo_HideOrShowNoVideoUserOnVideoWall
      * @param {Boolean} bHide bHide or not
      * @return {Number} TRUE indicates to hide, FALSE show.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingVideo_HideOrShowNoVideoUserOnVideoWall: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bHide = clientOpts.bHide;
          try {
            let HideOrShowNoVideoUserOnVideoWallParams = new messages.HideOrShowNoVideoUserOnVideoWallParams();
            HideOrShowNoVideoUserOnVideoWallParams.setBhide(bHide);
            let bytes = HideOrShowNoVideoUserOnVideoWallParams.serializeBinary();
            return _addon.HideOrShowNoVideoUserOnVideoWall(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      }
    };
  };
  return {
    getInstance: function(opts) {
      if (!instance) {
        instance = init(opts);
      }
      return instance;
    }
  };
})();

module.exports = {
  ZoomMeetingVideo: ZoomMeetingVideo
}
