const { ZoomMeetingUIViewType, ZoomMeetingUIFloatVideoType, ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomMeetingUICtrl = (function () {
  var instance;
   /**
   * Zoom Meeting UI Ctrl
   * @module zoom_meeting_ui_ctrl
   * @param {Function} onInvitebuttonclickedcb Callback event to click the INVITE button.
   * @param {Function} onStartShareBtnClicked Callback event for clicking START SHARE button.
   * @param {Function} onEndMeetingBtnClicked Callback event of clicking the END MEETING button.
   * @param {Function} onParticipantListBtnClicked Callback event of clicking PRTICIPANT LIST button.
   * @param {Function} onCustomLiveStreamMenuClicked  Callback event of clicking CUSTOME LIVE STREAM menu.
   * @param {Function} onZoomInviteDialogFailed Notification occurs only when the SDK fails to display the default ZOOM INVITE dialog.
   * @param {Function} onCCBTNClicked Callback event of clicking CC menu.
   * @param {Function} onAudioBtnClicked Callback event for clicking Audio button in the meeting.
   * @param {Function} onAudioMenuBtnClicked Callback event for clicking Audio Menu button in the meeting.
   * @return {ZoomMeetingUICtrl}
   */
  function init(opts) {
    let clientOpts = opts || {};
    let _addon = clientOpts.addon.GetMeetingUICtrl() || null;
    let _onInvitebuttonclickedcb = clientOpts.onInvitebuttonclickedcb || null;
    let _onStartShareBtnClicked = clientOpts.onStartShareBtnClicked || null;
    let _onEndMeetingBtnClicked = clientOpts.onEndMeetingBtnClicked || null;
    let _onParticipantListBtnClicked = clientOpts.onParticipantListBtnClicked || null;
    let _onCustomLiveStreamMenuClicked = clientOpts.onCustomLiveStreamMenuClicked || null;
    let _onZoomInviteDialogFailed = clientOpts.onZoomInviteDialogFailed || null;
    let _onCCBTNClicked = clientOpts.onCCBTNClicked || null;
    let _onAudioBtnClicked = clientOpts.onAudioBtnClicked || null;
    let _onAudioMenuBtnClicked = clientOpts.onAudioMenuBtnClicked || null;

    /**
      Callback event to click the INVITE button.
      If the value of bHandled is not set to TRUE, the default interface will pop up.
      @event onInviteBtnClicked
      @param {String} result
    */
    function onInviteBtnClicked() {
      if(_onInvitebuttonclickedcb){
        var handleObj = new Object();
        handleObj.bHandled = false;
        _onInvitebuttonclickedcb(handleObj);
        return handleObj.bHandled;
      }
    }

    /**
      Callback event for clicking START SHARE button.
      The user won't receive this callback event unless he sets to redirect the process of clicking the SHARE button.
      @event onStartShareBtnClicked
    */
    function onStartShareBtnClicked() {
      if (_onStartShareBtnClicked) {
        _onStartShareBtnClicked()
      }
    }

    /**
      Callback event of clicking the END MEETING button.
      The user won't receive this callback event unless he sets to redirect the process of clicking the END MEETING button.
      @event onEndMeetingBtnClicked
    */
    function onEndMeetingBtnClicked() {
      if (_onEndMeetingBtnClicked) {
        _onEndMeetingBtnClicked()
      }
    }

    /**
      Callback event of clicking PRTICIPANT LIST button.
      The user won't receive this callback event unless he sets to redirect the process of clicking the PARTICIPANT LIST button.
      @event onParticipantListBtnClicked
    */
    function onParticipantListBtnClicked() {
      if (_onParticipantListBtnClicked) {
        _onParticipantListBtnClicked()
      }
    }

    /**
      Callback event of clicking CUSTOME LIVE STREAM menu.
      The user won't receive this callback event unless he sets to redirect the process of clicking the CUSTOME LIVE STREAM menu.
      @event onCustomLiveStreamMenuClicked
    */
    function onCustomLiveStreamMenuClicked() {
      if (_onCustomLiveStreamMenuClicked) {
        _onCustomLiveStreamMenuClicked()
      }
    }

    /**
      Notification occurs only when the SDK fails to display the default ZOOM INVITE dialog.
      @event onZoomInviteDialogFailed
    */
    function onZoomInviteDialogFailed() {
      if (_onZoomInviteDialogFailed) {
        _onZoomInviteDialogFailed()
      }
    }

    /**
      Callback event of clicking CC menu.
      The user won't receive this callback event unless he redirects the process of clicking the CUSTOME LIVE STREAM menu.
      @event onCCBTNClicked
    */
    function onCCBTNClicked() {
      if (_onCCBTNClicked) {
        _onCCBTNClicked()
      }
    }

    /**
      Callback event for clicking Audio button in the meeting.
      The user won't receive this callback event unless he sets to redirect the process of clicking the Audio button in the meeting.
      @event onAudioBtnClicked
    */
    function onAudioBtnClicked(info) {
      if (_onAudioBtnClicked) {
        _onAudioBtnClicked(info)
      }
    }

    /**
      Callback event for clicking Audio Menu button in the meeting.
      The user won't receive this callback event unless he sets to redirect the process of clicking the Audio Menu button in the meeting.
      @event onAudioMenuBtnClicked
    */
    function onAudioMenuBtnClicked() {
      if (_onAudioMenuBtnClicked) {
        _onAudioMenuBtnClicked()
      }
    }

    if (_addon) {
      _addon.SetInviteButtonClickedCB(onInviteBtnClicked);
      _addon.SetonStartShareBtnClickedCB(onStartShareBtnClicked);
      _addon.SetonEndMeetingBtnClickedCB(onEndMeetingBtnClicked);
      _addon.SetonParticipantListBtnClickedCB(onParticipantListBtnClicked);
      _addon.SetonCustomLiveStreamMenuClickedCB(onCustomLiveStreamMenuClicked);
      _addon.SetonZoomInviteDialogFailedCB(onZoomInviteDialogFailed);
      _addon.SetonCCBTNClickedCB(onCCBTNClicked);
      _addon.SetonAudioBTNClickedCB(onAudioBtnClicked);
      _addon.SetonAudioMenuBTNClickedCB(onAudioMenuBtnClicked);
    }

    return {
      // Public methods and variables
      /**
      * Set on invite button clicked callback function.
      * @method MeetingUI_SetInviteButtonClickedCB
      * @param {Function} onInviteBtnClicked
      * @return {Boolean}
      */
      MeetingUI_SetInviteButtonClickedCB: function (onInviteBtnClicked) {
        if (_addon && onInviteBtnClicked && onInviteBtnClicked instanceof Function) {
          _onInviteBtnClicked = onInviteBtnClicked;
          return true;
        }
        return false;
      },
      /**
      * Determine if the user can swap to show sharing screen or video now.
      * @method MeetingUI_SetonStartShareBtnClickedCB
      * @param {Function} onStartShareBtnClicked
      * @return {Boolean}
      */
      MeetingUI_SetonStartShareBtnClickedCB: function (onStartShareBtnClicked) {
        if (_addon && onStartShareBtnClicked && onStartShareBtnClicked instanceof Function) {
          _onStartShareBtnClicked = onStartShareBtnClicked;
          return true;
        }
        return false;
      },
      /**
      * Set on End Meeting Btn Clicked Callback
      * @method MeetingUI_SetonEndMeetingBtnClickedCB
      * @param {Function} onEndMeetingBtnClicked
      * @return {Boolean}
      */
      MeetingUI_SetonEndMeetingBtnClickedCB: function (onEndMeetingBtnClicked) {
        if (_addon && onEndMeetingBtnClicked && onEndMeetingBtnClicked instanceof Function) {
          _onEndMeetingBtnClicked = onEndMeetingBtnClicked;
          return true;
        }
        return false;
      },
      /**
      * Set on Participant List Btn Clicked Callback
      * @method MeetingUI_SetonParticipantListBtnClickedCB
      * @param {Function} onParticipantListBtnClicked
      * @return {Boolean}
      */
      MeetingUI_SetonParticipantListBtnClickedCB: function (onParticipantListBtnClicked) {
        if (_addon && onParticipantListBtnClicked && onParticipantListBtnClicked instanceof Function) {
          _onParticipantListBtnClicked = onParticipantListBtnClicked;
          return true;
        }
        return false;
      },
      /**
      * Set on Custom Live Stream Menu Clicked Callback
      * @method MeetingUI_SetonCustomLiveStreamMenuClickedCB
      * @param {Function} onCustomLiveStreamMenuClicked
      * @return {Boolean}
      */
      MeetingUI_SetonCustomLiveStreamMenuClickedCB: function (onCustomLiveStreamMenuClicked) {
        if (_addon && onCustomLiveStreamMenuClicked && onCustomLiveStreamMenuClicked instanceof Function) {
          _onCustomLiveStreamMenuClicked = onCustomLiveStreamMenuClicked;
          return true;
        }
        return false;
      },
      /**
      * Set on Zoom Invite Dialog Failed Callback
      * @method MeetingUI_SetonZoomInviteDialogFailedCB
      * @param {Function} onZoomInviteDialogFailed
      * @return {Boolean}
      */
      MeetingUI_SetonZoomInviteDialogFailedCB: function (onZoomInviteDialogFailed) {
        if (_addon && onZoomInviteDialogFailed && onZoomInviteDialogFailed instanceof Function) {
          _onZoomInviteDialogFailed = onZoomInviteDialogFailed;
          return true;
        }
        return false;
      },
      /**
      * Set on CCBTN Clicked Callback
      * @method MeetingUI_SetonCCBTNClickedCB
      * @param {Function} onCCBTNClicked
      * @return {Boolean}
      */
      MeetingUI_SetonCCBTNClickedCB: function (onCCBTNClicked) {
        if (_addon && onCCBTNClicked && onCCBTNClicked instanceof Function) {
          _onCCBTNClicked = onCCBTNClicked;
          return true;
        }
        return false;
      },
      /**
      * Set on Audio BTN Clicked Callback
      * @method MeetingUI_SetonAudioBTNClickedCB
      * @param {Function} onAudioBtnClicked
      * @return {Boolean}
      */
      MeetingUI_SetonAudioBTNClickedCB: function (onAudioBtnClicked) {
        if (_addon && onCCBTNClicked && onCCBTNClicked instanceof Function) {
          _onAudioBtnClicked = onAudioBtnClicked;
          return true;
        }
        return false;
      },
      /**
      * Set on Audio BTN Clicked Callback
      * @method MeetingUI_SetonAudioMenuBTNClickedCB
      * @param {Function} onAudioMenuBtnClicked
      * @return {Boolean}
      */
      MeetingUI_SetonAudioMenuBTNClickedCB: function (onAudioMenuBtnClicked) {
        if (_addon && onAudioMenuBtnClicked && onAudioMenuBtnClicked instanceof Function) {
          _onAudioMenuBtnClicked = onAudioMenuBtnClicked;
          return true;
        }
        return false;
      },
      /**
      * Show the chat dialog during the meeting.
      * @method MeetingUI_ShowChatDlg
      * @param {String} hParent parent window handle (require hexadecimal)
      * @param {String} left chat window left pos
      * @param {String} top chat window top pos
      * @param {String} right chat window right pos
      * @param {String} bottom chat window bottom pos
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ShowChatDlg: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let hParent = clientOpts.hParent || '0';
          let left = clientOpts.left || '0';
          let top = clientOpts.top || '0';
          let right = clientOpts.right || '0';
          let bottom = clientOpts.bottom || '0';
          try {
            let ShowChatDlgParams = new messages.ShowChatDlgParams();
            ShowChatDlgParams.setHparent(hParent);
            ShowChatDlgParams.setRectleft(left);
            ShowChatDlgParams.setRecttop(top);
            ShowChatDlgParams.setRectright(right);
            ShowChatDlgParams.setRectbottom(bottom);
            let bytes = ShowChatDlgParams.serializeBinary();
            return _addon.ShowChatDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Hide the chat dialog during the meeting.
      * @method MeetingUI_HideChatDlg
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_HideChatDlg: function () {
        if (_addon){
          return _addon.HideChatDlg();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enter full screen display mode.
      * @method MeetingUI_EnterFullScreen
      * @param {String} viewtype: view type of the meeting ui, Defined in: {@link ZoomMeetingUIViewType}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_EnterFullScreen: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || ZoomMeetingUIViewType.MEETINGUI_FIRST_MONITOR;
          let bFirstView = (ZoomMeetingUIViewType.MEETINGUI_FIRST_MONITOR == viewtype) ? true : false;
          let bSecView = (ZoomMeetingUIViewType.MEETINGUI_FIRST_MONITOR == viewtype) ? false : true;
          try {
            let EnterFullScreenParams = new messages.EnterFullScreenParams();
            EnterFullScreenParams.setBfirstview(bFirstView);
            EnterFullScreenParams.setBsecview(bSecView);
            let bytes = EnterFullScreenParams.serializeBinary();
            return _addon.EnterFullScreen(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Exit the full screen display mode.
      * @method MeetingUI_ExitFullScreen
      * @param {String} viewtype: view type of the meeting ui, Defined in: {@link ZoomMeetingUIViewType}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ExitFullScreen: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let viewtype = clientOpts.viewtype || ZoomMeetingUIViewType.MEETINGUI_FIRST_MONITOR;
          let bFirstView = (ZoomMeetingUIViewType.MEETINGUI_FIRST_MONITOR == viewtype) ? true : false;
          let bSecView = (ZoomMeetingUIViewType.MEETINGUI_FIRST_MONITOR == viewtype) ? false : true;
          try {
            let ExitFullScreenParams = new messages.ExitFullScreenParams();
            ExitFullScreenParams.setBfirstview(bFirstView);
            ExitFullScreenParams.setBsecview(bSecView);
            let bytes = ExitFullScreenParams.serializeBinary();
            return _addon.ExitFullScreen(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Switch to video wall mode.
      * @method MeetingUI_SwitchToVideoWall
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_SwitchToVideoWall: function () {
        if (_addon) {
          return _addon.SwitchToVideoWall();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Switch to the mode of showing the current speaker.
      * @method MeetingUI_SwtichToAcitveSpeaker
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_SwtichToAcitveSpeaker: function () {
        if (_addon){
          return _addon.SwtichToAcitveSpeaker();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Move the floating video window.
      * @method MeetingUI_MoveFloatVideoWnd
      * @param {String} left Sets the left margin edge for the floating video window. Please use the coordinate of the screen.
      * @param {String} top Sets the top margin edge for the floating video window. Please use the coordinate of the screen.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_MoveFloatVideoWnd : function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let left = clientOpts.left || 0;
          let top = clientOpts.top || 0;
          try {
            let MoveFloatVideoWndParams = new messages.MoveFloatVideoWndParams();
            MoveFloatVideoWndParams.setLeft(left);
            MoveFloatVideoWndParams.setTop(top);
            let bytes = MoveFloatVideoWndParams.serializeBinary();
            return _addon.MoveFloatVideoWnd(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable to display the floating sharing toolbar.
      * This function works only in the share mode.
      * @method MeetingUI_ShowSharingToolbar
      * @param {Boolean} show TRUE indicates to display the floating toolbar.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ShowSharingToolbar : function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let show = clientOpts.show;
          try {
            let ShowSharingToolbarParams = new messages.ShowSharingToolbarParams();
            ShowSharingToolbarParams.setBshow(show);
            let bytes = ShowSharingToolbarParams.serializeBinary();
            return _addon.ShowSharingToolbar(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Switch to current speaker mode on the floating window.
      * @method MeetingUI_SwitchFloatVideoToActiveSpkMod
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_SwitchFloatVideoToActiveSpkMod: function () {
        if (_addon){
          return _addon.SwitchFloatVideoToActiveSpkMod();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Switch to gallery view mode on the floating window.
      * @method MeetingUI_SwitchFloatVideoToGalleryMod
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_SwitchFloatVideoToGalleryMod: function() {
        if (_addon){
          return _addon.SwitchFloatVideoToGalleryMod();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Change float active speaker window type and size
      * @method MeetingUI_ChangeFloatoActiveSpkVideoSize
      * @param {String} floatvideotype the type of float active speaker window, {@link ZoomMeetingUIFloatVideoType}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ChangeFloatoActiveSpkVideoSize: function (opts) {
        if (_addon){
          let clientOpts = opts || {};
          let floatvideotype = clientOpts.floatvideotype || ZoomMeetingUIFloatVideoType.FLOATVIDEO_Small;
          try {
            let ChangeFloatoActiveSpkVideoSizeParams = new messages.ChangeFloatoActiveSpkVideoSizeParams();
            ChangeFloatoActiveSpkVideoSizeParams.setFloatvideotype(floatvideotype);
            let bytes = ChangeFloatoActiveSpkVideoSizeParams.serializeBinary();
            return _addon.ChangeFloatoActiveSpkVideoSize(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Display/hide the window which is used to display the list of the participants.
      * @method MeetingUI_ShowParticipantsListWnd
      * @param {String} show TRUE indicates to display the list of the participants.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ShowParticipantsListWnd: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let show = clientOpts.show;
          try {
            let ShowParticipantsListWndParams = new messages.ShowParticipantsListWndParams();
            ShowParticipantsListWndParams.setBshow(show);
            let bytes = ShowParticipantsListWndParams.serializeBinary();
            return _addon.ShowParticipantsListWnd(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Display/hide the toolbar at the bottom of the meeting window.
      * This function does not work if the user sets to hide the toolbar via SetBottomFloatToolbarWndVisibility().
      * @method MeetingUI_ShowBottomFloatToolbarWnd
      * @param {String} show TRUE indicates to display the toolbar.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ShowBottomFloatToolbarWnd: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let show = clientOpts.show;
          try {
            let ShowBottomFloatToolbarWndParams = new messages.ShowBottomFloatToolbarWndParams();
            ShowBottomFloatToolbarWndParams.setBshow(show);
            let bytes = ShowBottomFloatToolbarWndParams.serializeBinary();
            return _addon.ShowBottomFloatToolbarWnd(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Display the dialog to choose the audio to join the meeting.
      * @method MeetingUI_ShowJoinAudioDlg
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ShowJoinAudioDlg: function() {
        if (_addon) {
          return _addon.ShowJoinAudioDlg();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Hide the dialog to choose the audio to join the meeting.
      * @method MeetingUI_HideJoinAudioDlg
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_HideJoinAudioDlg: function() {
        if (_addon){
          return _addon.HideJoinAudioDlg();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the information in video wall mode.
      * @method MeetingUI_GetWallViewPageInfo
      * @param {String} currentPage
      * @param {String} totalPages
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_GetWallViewPageInfo: function() {
        if (_addon) {
          return _addon.GetWallViewPageInfo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Show the video users on previous page or next page in video wall mode.
      * The function does not work if the window shows the first or last page. The return value is SDKERR_SUCCESS in this case.
      * @method MeetingUI_ShowPreOrNextPageVideo
      * @param {Boolean} show TRUE indicates to show the video users on previous page, FALSE next page.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ShowPreOrNextPageVideo: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let show = clientOpts.show;
          try {
            let ShowPreOrNextPageVideoParams = new messages.ShowPreOrNextPageVideoParams();
            ShowPreOrNextPageVideoParams.setBpageup(show);
            let bytes = ShowPreOrNextPageVideoParams.serializeBinary();
            return _addon.ShowPreOrNextPageVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the visibility of the green frame when sharing the desktop.
      * @method MeetingUI_ShowSharingFrameWindows
      * @param {Boolean} show TRUE indicates to display the frame. FALSE hide.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_ShowSharingFrameWindows: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let show = clientOpts.show;
          try {
            let ShowSharingFrameWindowsParams = new messages.ShowSharingFrameWindowsParams();
            ShowSharingFrameWindowsParams.setBshow(show);
            let bytes = ShowSharingFrameWindowsParams.serializeBinary();
            return _addon.ShowSharingFrameWindows(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the information whether the current view supports split screen mode or not. If supports, check it if it is already in the split screen mode.
      * @method MeetingUI_GetCurrentSplitScreenModeInfo
      * @param {Boolean} bZNSupportSplitScreen
      * @param {Boolean} bZNInSplitScreenMode
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_GetCurrentSplitScreenModeInfo: function() {
        if (_addon) {
          return _addon.GetCurrentSplitScreenModeInfo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Switch to the split screen mode or cancel.
      * TRUE does not work if it is in the split screen mode. FALSE does not work if it is not the split screen mode.
      * @method MeetingUI_SwitchSplitScreenMode
      * @param {Boolean} isSwitch TRUE indicates to switch to the split screen mode. FALSE cancel.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_SwitchSplitScreenMode: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let isSwitch = clientOpts.isSwitch;
          try {
            let SwitchSplitScreenModeParams = new messages.SwitchSplitScreenModeParams();
            SwitchSplitScreenModeParams.setBsplit(isSwitch);
            let bytes = SwitchSplitScreenModeParams.serializeBinary();
            return _addon.SwitchSplitScreenMode(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Active the principal window of meeting and place it on top.
      * @method MeetingUI_BackToMeeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      If the function fails, the return value is not SDKERR_SUCCESS. To get extended error information, refer to SDKError enum.
      */
      MeetingUI_BackToMeeting: function() {
        if (_addon) {
          return _addon.BackToMeeting();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
        * Get the window handle of the meeting user interface. This interface is only valid on Windows
        * @method MeetingUI_GetMeetingUIWnd
        * @return {Number} If the function succeed, "hFirstView" the window handle(hex) of the meeting user interface displayed by the first view,
        * and "hSecondView" the window handle(hex) of the meeting user interface displayed by the second view
        */
      MeetingUI_GetMeetingUIWnd: function() {
        if (_addon) {
          return _addon.GetMeetingUIWnd();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Change the display mode of the minimized meeting window for the first view.
      * @method MeetingUI_SwitchMinimizeUIMode4FristScreenMeetingUIWnd
      * @param {Number} mode mode(number) Specifies the minimized mode. For more details, see {@link ZNSDKMinimizeUIMode}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_SwitchMinimizeUIMode4FristScreenMeetingUIWnd: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let mode = clientOpts.mode;
          try {
            let SwitchMinimizeUIMode4FirstScreenMeetingUIWndParams = new messages.SwitchMinimizeUIMode4FirstScreenMeetingUIWndParams();
            SwitchMinimizeUIMode4FirstScreenMeetingUIWndParams.setMinimizeuimode(mode);
            let bytes = SwitchMinimizeUIMode4FirstScreenMeetingUIWndParams.serializeBinary();
            return _addon.SwitchMinimizeUIMode4FristScreenMeetingUIWnd(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Determines the minimize state of the first view.
      * @method MeetingUI_IsMinimizeModeOfFristScreenMeetingUIWnd
      * @return {Number} If the function succeed, the return value is a object which includes "bIsMinimizMode", TRUE indicates the minimize state, FALSE not
      */
      MeetingUI_IsMinimizeModeOfFristScreenMeetingUIWnd: function() {
        if (_addon) {
          return _addon.IsMinimizeModeOfFristScreenMeetingUIWnd();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * when someone else shares, and meeting window is not full screen. you can call the api to switch video & share display postion
      * @method MeetingUI_SwapToShowShareViewOrVideo
      * @param {Boolean} mode 0 means to display share, otherwise video
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      MeetingUI_SwapToShowShareViewOrVideo: function(opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bToDisplayShare = clientOpts.bToDisplayShare;
          try {
            let SwapToShowShareViewOrVideoParams = new messages.SwapToShowShareViewOrVideoParams();
            SwapToShowShareViewOrVideoParams.setBtodisplayshare(bToDisplayShare);
            let bytes = SwapToShowShareViewOrVideoParams.serializeBinary();
            return _addon.SwapToShowShareViewOrVideo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Determine if the meeting is displaying the sharing screen now.
      * @method MeetingUI_IsDisplayingShareViewOrVideo
      * @return {Number} 0 means is showing sharing screen, otherwise means is showing video
      */
      MeetingUI_IsDisplayingShareViewOrVideo: function() {
        if (_addon) {
          return _addon.IsDisplayingShareViewOrVideo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Determine if the user can swap to show sharing screen or video now.
      * @method MeetingUI_CanSwapToShowShareViewOrVideo
      * @return {Number} 0 means Can, otherwise not
      */
      MeetingUI_CanSwapToShowShareViewOrVideo: function() {
        if (_addon) {
          return _addon.CanSwapToShowShareViewOrVideo();
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
  ZoomMeetingUICtrl: ZoomMeetingUICtrl
}
