const { ZoomSDKError } = require('./settings.js');
const os = require('os');
const platform = os.platform();
const messages = require('./electron_sdk_pb.js');

var ZoomMeetingConfiguration = (function () {
  var instance;
   /**
   * Zoom Meeting Configuration
   * @module zoom_meeting_configuration
   * @param {Function} onFreeMeetingNeedToUpgrade The callback of upgrading the free meeting.
   * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStart Callback function of starting to upgrade the free meeting by the gift link.
   * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStop Callback function of ending upgrade the free meeting by the gift link.
   * @param {Function} onFreeMeetingUpgradeToProMeeting Callback function of free meting upgrades successfully.
   * @param {Function} onInputMeetingPasswordAndScreenNameNotification The SDK will trigger the callback event if the password or screen name is required.
   * @param {Function} onAirPlayInstructionWndNotification This callback event may be triggered when the user enables the AirPlay introduction.
   * @param {Function} onWebinarNeedRegisterNotification During the webinar, this callback event will be triggered if the user needs to register.
   * @param {Function} onEndOtherMeetingToJoinMeetingNotification The user will receive this callback event if the user wants to join the new meeting while the ongoing meeting is not ended.
   * @param {Function} onFreeMeetingRemainTime The SDK will trigger this callback event during the free meeting to inform the user how much time is left for a free meeting.
   * @param {Function} onFreeMeetingRemainTimeStopCountDown The callback of free meeting stops the countdown.
   * @return {ZoomMeetingConfiguration}
   */
  function init(opts) {
    var clientOpts = opts || {};
    // Private methods and variables
    var _addon = clientOpts.addon.GetMeetingConfigCtrl() || null;
    let _onFreeMeetingNeedToUpgrade = clientOpts.onFreeMeetingNeedToUpgrade || null;
    let _onFreeMeetingUpgradeToGiftFreeTrialStart = clientOpts.onFreeMeetingUpgradeToGiftFreeTrialStart || null;
    let _onFreeMeetingUpgradeToGiftFreeTrialStop = clientOpts.onFreeMeetingUpgradeToGiftFreeTrialStop || null;
    let _onFreeMeetingUpgradeToProMeeting = clientOpts.onFreeMeetingUpgradeToProMeeting || null;
    let _onInputMeetingPasswordAndScreenNameNotification = clientOpts.onInputMeetingPasswordAndScreenNameNotification || null;
    let _onAirPlayInstructionWndNotification = clientOpts.onAirPlayInstructionWndNotification || null;
    let _onWebinarNeedRegisterNotification = clientOpts.onWebinarNeedRegisterNotification || null;
    let _onEndOtherMeetingToJoinMeetingNotification = clientOpts.onEndOtherMeetingToJoinMeetingNotification || null;
    let _onFreeMeetingRemainTime = clientOpts.onFreeMeetingRemainTime || null;
    let _onFreeMeetingRemainTimeStopCountDown = clientOpts.onFreeMeetingRemainTimeStopCountDown || null;

    /**
      The callback of upgrading the free meeting.
      @event onFreeMeetingNeedToUpgrade
      @param {String} type Type of upgrading the free meeting, {@link FreeMeetingNeedUpgradeType}
      @param {String} gift_url Upgrade the free meeting by the gift link. When and only when the value of type_ is FreeMeetingNeedUpgradeType_BY_GIFTURL, this parameter is meaningful.
    */
    function onFreeMeetingNeedToUpgrade(type, gift_url) {
      if (_onFreeMeetingNeedToUpgrade) {
        _onFreeMeetingNeedToUpgrade(type, gift_url)
      }
    }

    /**
      Callback function of starting to upgrade the free meeting by the gift link.
      @event onFreeMeetingUpgradeToGiftFreeTrialStart
    */
    function onFreeMeetingUpgradeToGiftFreeTrialStart() {
      if (_onFreeMeetingUpgradeToGiftFreeTrialStart) {
        _onFreeMeetingUpgradeToGiftFreeTrialStart()
      }
    }

    /**
      Callback function of ending upgrade the free meeting by the gift link.
      @event onFreeMeetingUpgradeToGiftFreeTrialStop
    */
    function onFreeMeetingUpgradeToGiftFreeTrialStop() {
      if (_onFreeMeetingUpgradeToGiftFreeTrialStop) {
        _onFreeMeetingUpgradeToGiftFreeTrialStop()
      }
    }

    /**
      Callback function of free meting upgrades successfully.
      @event onFreeMeetingUpgradeToProMeeting
    */
    function onFreeMeetingUpgradeToProMeeting() {
      if (_onFreeMeetingUpgradeToProMeeting) {
        _onFreeMeetingUpgradeToProMeeting()
      }
    }

    /**
      The SDK will trigger the callback event if the password or screen name is required.
      @event onInputMeetingPasswordAndScreenNameNotification
    */
    function onInputMeetingPasswordAndScreenNameNotification() {
      if (_onInputMeetingPasswordAndScreenNameNotification) {
        _onInputMeetingPasswordAndScreenNameNotification()
      }
    }

    /**
      This callback event may be triggered when the user enables the AirPlay introduction.
      @event onAirPlayInstructionWndNotification
      @param {Boolean} bShow Show or hide the AirPlay instruction window.
      @param {String} airhostName The air-host name displayed on IOS device.
    */
    function onAirPlayInstructionWndNotification(bShow, airhostName) {
      if (_onAirPlayInstructionWndNotification) {
        _onAirPlayInstructionWndNotification(bShow, airhostName)
      }
    }

    /**
      During the webinar, this callback event will be triggered if the user needs to register.
      @event onWebinarNeedRegisterNotification
    */
    function onWebinarNeedRegisterNotification() {
      if (_onWebinarNeedRegisterNotification) {
        _onWebinarNeedRegisterNotification()
      }
    }

    /**
      The user will receive this callback event if the user wants to join the new meeting while the ongoing meeting is not ended.
      @event onEndOtherMeetingToJoinMeetingNotification
    */
    function onEndOtherMeetingToJoinMeetingNotification() {
      if (_onEndOtherMeetingToJoinMeetingNotification) {
        _onEndOtherMeetingToJoinMeetingNotification()
      }
    }

    /**
      The SDK will trigger this callback event during the free meeting to inform the user how much time is left for a free meeting.
      @event onFreeMeetingRemainTime
      @param {String} leftTime The left time of meeting calculated in seconds.
    */
    function onFreeMeetingRemainTime(leftTime) {
      if (_onFreeMeetingRemainTime) {
        _onFreeMeetingRemainTime(leftTime)
      }
    }

    /**
      The callback of free meeting stops the countdown.
      @event onFreeMeetingRemainTimeStopCountDown
    */
    function onFreeMeetingRemainTimeStopCountDown() {
      if (_onFreeMeetingRemainTimeStopCountDown) {
        _onFreeMeetingRemainTimeStopCountDown()
      }
    }

    if (_addon) {
      _addon.SetFreeMeetingNeedToUpgradeCB(onFreeMeetingNeedToUpgrade);
      _addon.SetFreeMeetingUpgradeToGiftFreeTrialStartCB(onFreeMeetingUpgradeToGiftFreeTrialStart);
      _addon.SetFreeMeetingUpgradeToGiftFreeTrialStopCB(onFreeMeetingUpgradeToGiftFreeTrialStop);
      _addon.SetFreeMeetingUpgradeToProMeetingCB(onFreeMeetingUpgradeToProMeeting);
      _addon.SetInputMeetingPasswordAndScreenNameNotificationCB(onInputMeetingPasswordAndScreenNameNotification);
      _addon.SetAirPlayInstructionWndNotificationCB(onAirPlayInstructionWndNotification);
      _addon.SetonWebinarNeedRegisterNotificationCB(onWebinarNeedRegisterNotification);
      _addon.SetonEndOtherMeetingToJoinMeetingNotificationCB(onEndOtherMeetingToJoinMeetingNotification);
      _addon.SetonFreeMeetingRemainTimeCB(onFreeMeetingRemainTime);
      _addon.SetonFreeMeetingRemainTimeStopCountDownCB(onFreeMeetingRemainTimeStopCountDown);
    }

    return {
      // Public methods and variables
      /**
       * Set the callback of upgrading the free meeting.
       * @method MeetingConfig_SetFreeMeetingNeedToUpgradeCB
       * @param {Function} onFreeMeetingNeedToUpgrade
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingNeedToUpgradeCB: function (onFreeMeetingNeedToUpgrade) {
        if (addon && onFreeMeetingNeedToUpgrade && onFreeMeetingNeedToUpgrade instanceof Function) {
          _onFreeMeetingNeedToUpgrade = onFreeMeetingNeedToUpgrade
          return true
        }
        return false
      },
      /**
       * Set the callback function of starting to upgrade the free meeting by the gift link.
       * @method MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStartCB
       * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStart
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStartCB: function (onFreeMeetingUpgradeToGiftFreeTrialStart) {
        if (addon && onFreeMeetingUpgradeToGiftFreeTrialStart && onFreeMeetingUpgradeToGiftFreeTrialStart instanceof Function) {
          _onFreeMeetingUpgradeToGiftFreeTrialStart = onFreeMeetingUpgradeToGiftFreeTrialStart
          return true
        }
        return false
      },
      /**
       * Set the callback of ending upgrade the free meeting by the gift link.
       * @method MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStopCB
       * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStop
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStopCB: function (onFreeMeetingUpgradeToGiftFreeTrialStop) {
        if (addon && onFreeMeetingUpgradeToGiftFreeTrialStop && onFreeMeetingUpgradeToGiftFreeTrialStop instanceof Function) {
          _onFreeMeetingUpgradeToGiftFreeTrialStop = onFreeMeetingUpgradeToGiftFreeTrialStop
          return true
        }
        return false
      },
      /**
       * Set the callback of free meting upgrades successfully.
       * @method MeetingConfig_SetFreeMeetingUpgradeToProMeetingCB
       * @param {Function} onFreeMeetingUpgradeToProMeeting
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingUpgradeToProMeetingCB: function (onFreeMeetingUpgradeToProMeeting) {
        if (addon && onFreeMeetingUpgradeToProMeeting && onFreeMeetingUpgradeToProMeeting instanceof Function) {
          _onFreeMeetingUpgradeToProMeeting = onFreeMeetingUpgradeToProMeeting
          return true
        }
        return false
      },
      /**
       * Set Input Meeting Password And Screen Name Notification Callback
       * @method MeetingConfig_SetInputMeetingPasswordAndScreenNameNotificationCB
       * @param {Function} onInputMeetingPasswordAndScreenNameNotification
       * @return {Boolean}
       */
      MeetingConfig_SetInputMeetingPasswordAndScreenNameNotificationCB: function (onInputMeetingPasswordAndScreenNameNotification) {
        if (addon && onInputMeetingPasswordAndScreenNameNotification && onInputMeetingPasswordAndScreenNameNotification instanceof Function) {
          _onInputMeetingPasswordAndScreenNameNotification = onInputMeetingPasswordAndScreenNameNotification
          return true
        }
        return false
      },
      /**
       * Set Air Play Instruction Wnd Notification Callback
       * @method MeetingConfig_SetAirPlayInstructionWndNotificationCB
       * @param {Function} onAirPlayInstructionWndNotification
       * @return {Boolean}
       */
      MeetingConfig_SetAirPlayInstructionWndNotificationCB: function (onAirPlayInstructionWndNotification) {
        if (addon && onAirPlayInstructionWndNotification && onAirPlayInstructionWndNotification instanceof Function) {
          _onAirPlayInstructionWndNotification = onAirPlayInstructionWndNotification
          return true
        }
        return false
      },
      /**
       * Set on Webinar Need Register Notification Callback
       * @method MeetingConfig_SetonWebinarNeedRegisterNotificationCB
       * @param {Function} onWebinarNeedRegisterNotification
       * @return {Boolean}
       */
      MeetingConfig_SetonWebinarNeedRegisterNotificationCB: function (onWebinarNeedRegisterNotification) {
        if (addon && onWebinarNeedRegisterNotification && onWebinarNeedRegisterNotification instanceof Function) {
          _onWebinarNeedRegisterNotification = onWebinarNeedRegisterNotification
          return true
        }
        return false
      },
      /**
       * Set on End Other Meeting To Join Meeting Notification Callback
       * @method MeetingConfig_SetonEndOtherMeetingToJoinMeetingNotificationCB
       * @param {Function} onEndOtherMeetingToJoinMeetingNotification
       * @return {Boolean}
       */
      MeetingConfig_SetonEndOtherMeetingToJoinMeetingNotificationCB: function (onEndOtherMeetingToJoinMeetingNotification) {
        if (addon && onEndOtherMeetingToJoinMeetingNotification && onEndOtherMeetingToJoinMeetingNotification instanceof Function) {
          _onEndOtherMeetingToJoinMeetingNotification = onEndOtherMeetingToJoinMeetingNotification
          return true
        }
        return false
      },
      /**
       * Set on Free Meeting Remain Time Callback
       * @method MeetingConfig_SetonFreeMeetingRemainTimeCB
       * @param {Function} onFreeMeetingRemainTime
       * @return {Boolean}
       */
      MeetingConfig_SetonFreeMeetingRemainTimeCB: function (onFreeMeetingRemainTime) {
        if (addon && onFreeMeetingRemainTime && onFreeMeetingRemainTime instanceof Function) {
          _onFreeMeetingRemainTime = onFreeMeetingRemainTime
          return true
        }
        return false
      },
      /**
       * Set on Free Meeting Remain Time Stop Count Down Callback
       * @method MeetingConfig_SetonFreeMeetingRemainTimeStopCountDownCB
       * @param {Function} onFreeMeetingRemainTimeStopCountDown
       * @return {Boolean}
       */
      MeetingConfig_SetonFreeMeetingRemainTimeStopCountDownCB: function (onFreeMeetingRemainTimeStopCountDown) {
        if (addon && onFreeMeetingRemainTimeStopCountDown && onFreeMeetingRemainTimeStopCountDown instanceof Function) {
          _onFreeMeetingRemainTimeStopCountDown = onFreeMeetingRemainTimeStopCountDown
          return true
        }
        return false
      },
      /**
      * Set the visibility of the INVITE button in the panelist action bar during the meeting. Default value: TRUE.
      * The user will receive the IMeetingUIControllerEvent::onInviteBtnClicked() callback event when he clicks the INVITE button. If the callback event is not handled, the SDK will pop up a ZOOM custom invitation dialog.
	    * The user will receive the IMeetingUIControllerEvent::onZoomInviteDialogFailed() callback event if the dialog box is failed to display.
      * @method MeetingConfig_EnableInviteButtonOnMeetingUI
      * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_EnableInviteButtonOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableInviteButtonOnMeetingUIParams = new messages.EnableInviteButtonOnMeetingUIParams();
            EnableInviteButtonOnMeetingUIParams.setBenable(bEnable);
            let bytes = EnableInviteButtonOnMeetingUIParams.serializeBinary();
            return _addon.EnableInviteButtonOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the position of the floating video window when sharing.
      * The value shall be set before the sharing begins. If you set the value during the process of share, the function will not be valid until the next share.
      * @method MeetingConfig_SetFloatVideoPos
      * @param {String} left Specify the left position of the floating video window when sharing.
      * @param {String} top Specify the top position of the floating video window when sharing.
      * @param {String} hSelfWnd SelfWnd (require hexadecimal)
      * @param {String} hParent parent window handle (require hexadecimal)
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_SetFloatVideoPos: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let left = clientOpts.left || '0';
          let top = clientOpts.top || '0';
          let hSelfWnd = clientOpts.hSelfWnd || '0';
          let hParent = clientOpts.hParent || '0';
          try {
            let SetFloatVideoPosParams = new messages.SetFloatVideoPosParams();
            SetFloatVideoPosParams.setLeft(left);
            SetFloatVideoPosParams.setTop(top);
            SetFloatVideoPosParams.setHselfwnd(hSelfWnd);
            SetFloatVideoPosParams.setHparent(hParent);
            let bytes = SetFloatVideoPosParams.serializeBinary();
            return _addon.SetFloatVideoPos(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the visibility of the toolbar at the bottom of the meeting window. Default value: TRUE.
      * @method MeetingConfig_SetBottomFloatToolbarWndVisibility
      * @param {Boolean} bShow TRUE means to enable the feature to display always the toolbar at the bottom. Otherwise not.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_SetBottomFloatToolbarWndVisibility: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bShow = clientOpts.bShow;
          try {
            let SetBottomFloatToolBarWndVisibilityParams = new messages.SetBottomFloatToolBarWndVisibilityParams();
            SetBottomFloatToolBarWndVisibilityParams.setBshow(bShow);
            let bytes = SetBottomFloatToolBarWndVisibilityParams.serializeBinary();
            return _addon.SetBottomFloatToolbarWndVisibility(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the visibility of the sharing toolbar. Default value: TRUE.
      * This function works only before the meeting or the sharing starts.
      * @method MeetingConfig_SetSharingToolbarVisibility
      * @param {Boolean} bShow TRUE means to enable the display sharing toolbar. Otherwise not.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_SetSharingToolbarVisibility: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bShow = clientOpts.bShow;
          try {
            let SetSharingToolBarVisibilityParams = new messages.SetSharingToolBarVisibilityParams();
            SetSharingToolBarVisibilityParams.setBshow(bShow);
            let bytes = SetSharingToolBarVisibilityParams.serializeBinary();
            return _addon.SetSharingToolbarVisibility(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the shared device ID when sharing directly.
      * @method MeetingConfig_SetDirectShareMonitorID
      * @param {String} monitorID Specify the device ID to be shared.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_SetDirectShareMonitorID: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let monitorID = clientOpts.monitorID;
          try {
            let SetDirectShareMonitorIDParams = new messages.SetDirectShareMonitorIDParams();
            SetDirectShareMonitorIDParams.setMonitorid(monitorID);
            let bytes = SetDirectShareMonitorIDParams.serializeBinary();
            return _addon.SetDirectShareMonitorID(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the position of the primary view meeting window.
       * @method MeetingConfig_SetMeetingUIPos
       * @param {String} left Specify the left position of the primary view meeting window. The coordinates of the window are those of the screen.
       * @param {String} top Specify the top position of the primary view meeting window. The coordinates of the window are those of the screen.
       * @param {String} hSelfWnd (require hexadecimal)
       * @param {String} hParent (require hexadecimal)
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetMeetingUIPos: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let left = clientOpts.left || '0';
          let top = clientOpts.top || '0';
          let hSelfWnd = clientOpts.hSelfWnd || '0';
          let hParent = clientOpts.hParent || '0';
          try {
            let SetMeetingUIPosParams = new messages.SetMeetingUIPosParams();
            SetMeetingUIPosParams.setLeft(left);
            SetMeetingUIPosParams.setTop(top);
            SetMeetingUIPosParams.setHselfwnd(hSelfWnd);
            SetMeetingUIPosParams.setHparent(hParent);
            let bytes = SetMeetingUIPosParams.serializeBinary();
            return _addon.SetMeetingUIPos(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the visibility of the dialog box of waiting for the host after joining the meeting. Only invalidate when the host is not in the meeting. Default: FALSE.
      * @method MeetingConfig_DisableWaitingForHostDialog
      * @param {Boolean} bDisable TRUE indicates to hide the dialog box. FALSE not.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_DisableWaitingForHostDialog: function (opts) {
        if (_addon) {
          let clientOpts = opts || {}
          let bDisable = clientOpts.bDisable
          try {
            let DisableWaitingForHostDialogParams = new messages.DisableWaitingForHostDialogParams();
            DisableWaitingForHostDialogParams.setBdisable(bDisable);
            let bytes = DisableWaitingForHostDialogParams.serializeBinary();
            return _addon.DisableWaitingForHostDialog(bytes)
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /**
      * Set the visibility of the dialog box if the password is wrong when join the meeting. Default: FALSE.
      * If it is disabled to display the dialog box of wrong password, the system will directly exit the state of trying to join the meeting.
      * @method MeetingConfig_DisablePopupMeetingWrongPSWDlg
      * @param {Boolean} bDisable TRUE indicates to hide the dialog box of wrong password.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_DisablePopupMeetingWrongPSWDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bDisable = clientOpts.bDisable;
          try {
            let DisablePopupMeetingWrongPSWDlgParams = new messages.DisablePopupMeetingWrongPSWDlgParams();
            DisablePopupMeetingWrongPSWDlgParams.setBdisable(bDisable);
            let bytes = DisablePopupMeetingWrongPSWDlgParams.serializeBinary();
            return _addon.DisablePopupMeetingWrongPSWDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set if it is able to end automatically another ongoing meeting when joining a new meeting. Default: FALSE.
      * @method MeetingConfig_EnableAutoEndOtherMeetingWhenStartMeeting
      * @param {Boolean} bEnable TRUE indicates to end the other ongoing meetings. FALSE not.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      MeetingConfig_EnableAutoEndOtherMeetingWhenStartMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAutoEndOtherMeetingWhenStartMeetingParams = new messages.EnableAutoEndOtherMeetingWhenStartMeetingParams();
            EnableAutoEndOtherMeetingWhenStartMeetingParams.setBenable(bEnable);
            let bytes = EnableAutoEndOtherMeetingWhenStartMeetingParams.serializeBinary();
            return _addon.EnableAutoEndOtherMeetingWhenStartMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to switch between the full screen mode and normal mode by double-click. Default value: TRUE.
       * @method MeetingConfig_EnableLButtonDBClick4SwitchFullScreenMode
       * @param {Boolean} bEnable TRUE indicates to switch. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableLButtonDBClick4SwitchFullScreenMode: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableLButtonDBClick4SwitchFullScreenModeParams = new messages.EnableLButtonDBClick4SwitchFullScreenModeParams();
            EnableLButtonDBClick4SwitchFullScreenModeParams.setBenable(bEnable);
            let bytes = EnableLButtonDBClick4SwitchFullScreenModeParams.serializeBinary();
            return _addon.EnableLButtonDBClick4SwitchFullScreenMode(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the floating video window when sharing in the meeting. Default value: TRUE.
       * @method MeetingConfig_SetFloatVideoWndVisibility
       * @param {Boolean} bShow TRUE indicates to display the floating video window. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetFloatVideoWndVisibility: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bShow = clientOpts.bShow;
          try {
            let SetFloatVideoWndVisibilityParams = new messages.SetFloatVideoWndVisibilityParams();
            SetFloatVideoWndVisibilityParams.setBshow(bShow);
            let bytes = SetFloatVideoWndVisibilityParams.serializeBinary();
            return _addon.SetFloatVideoWndVisibility(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Pre-set email and username information before joining the webinar.
       * @method MeetingConfig_PrePopulateWebinarRegistrationInfo
       * @param {String} email Configure the default email.
       * @param {String} userName Configure default username.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_PrePopulateWebinarRegistrationInfo: function (opts) {
        if (_addon) {
          var clientOpts = opts || {};
          var email = clientOpts.email;
          var userName = clientOpts.userName;
          try {
            let PrePopulateWebinarRegistrationInfoParams = new messages.PrePopulateWebinarRegistrationInfoParams();
            PrePopulateWebinarRegistrationInfoParams.setEmail(email);
            PrePopulateWebinarRegistrationInfoParams.setUsername(userName);
            let bytes = PrePopulateWebinarRegistrationInfoParams.serializeBinary();
            return _addon.PrePopulateWebinarRegistrationInfo(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Reset the meeting configuration and back to the default state.
       * @method MeetingConfig_Reset
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_Reset: function () {
        if (_addon) {
          return _addon.Reset();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to auto-adjust the volume of the speaker when joining the meeting. Default: TRUE.
       * If it is SDKERR_SUCCESS, the SDK will adjust the speaker volume automatically. It will unmute if the speaker was muted.
       * @method MeetingConfig_EnableAutoAdjustSpeakerVolumeWhenJoinAudio
       * @param {Boolean} bEnable TRUE indicates to auto-adjust the volume of the speaker. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableAutoAdjustSpeakerVolumeWhenJoinAudio: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAutoAdjustSpeakerVolumeWhenJoinAudioParams = new messages.EnableAutoAdjustSpeakerVolumeWhenJoinAudioParams();
            EnableAutoAdjustSpeakerVolumeWhenJoinAudioParams.setBenable(bEnable);
            let bytes = EnableAutoAdjustSpeakerVolumeWhenJoinAudioParams.serializeBinary();
            return _addon.EnableAutoAdjustSpeakerVolumeWhenJoinAudio(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to auto-adjust the volume of the mic when joining the meeting. Default: TRUE.
       * If it is SDKERR_SUCCESS, the SDK will adjust the mic volume automatically. It will unmute if the mic was muted.
       * @method MeetingConfig_EnableAutoAdjustMicVolumeWhenJoinAudio
       * @param {Boolean} bEnable TRUE indicates to auto-adjust the volume of the mic. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableAutoAdjustMicVolumeWhenJoinAudio: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAutoAdjustMicVolumeWhenJoinAudioParams = new messages.EnableAutoAdjustMicVolumeWhenJoinAudioParams();
            EnableAutoAdjustMicVolumeWhenJoinAudioParams.setBenable(bEnable);
            let bytes = EnableAutoAdjustMicVolumeWhenJoinAudioParams.serializeBinary();
            return _addon.EnableAutoAdjustMicVolumeWhenJoinAudio(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Configure DSCP(Differential services code point) values.
       * This interface satisfies some users who have other requirements. It is not recommended to configure it. Contact the support engineer for more details.
       * @method MeetingConfig_ConfigDSCP
       * @param {Number} dscpAudio Configure DSCP value for audio.
       * @param {Number} dscpVideo Configure DSCP value for video.
       * @param {Boolean} bReset Reset DSCP values. This param is just used for Windows. For Mac, you can pass TRUE or FALSE as you like
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_ConfigDSCP: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let dscpAudio = clientOpts.dscpAudio;
          let dscpVideo = clientOpts.dscpVideo;
          let bReset = clientOpts.bReset;
          try {
            let ConfigDSCPParams = new messages.ConfigDSCPParams();
            ConfigDSCPParams.setDscpaudio(dscpAudio);
            ConfigDSCPParams.setDscpvideo(dscpVideo);
            ConfigDSCPParams.setBreset(bReset);
            let bytes = ConfigDSCPParams.serializeBinary();
            return _addon.ConfigDSCP(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to display the full phone number for the user who joins the meeting with phone. Default: FALSE.
       * If it is false, some figures of the number will be replaced by asterisk(*).
       * @method MeetingConfig_EnableHideFullPhoneNumber4PureCallinUser
       * @param {Boolean} bHide TRUE indicates to hide the partial phone number. FALSE not
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableHideFullPhoneNumber4PureCallinUser: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bHide = clientOpts.bHide;
          try {
            let EnableHIdeFullPhoneNumber4PureCallinUserParams = new messages.EnableHIdeFullPhoneNumber4PureCallinUserParams();
            EnableHIdeFullPhoneNumber4PureCallinUserParams.setBenable(bHide);
            let bytes = EnableHIdeFullPhoneNumber4PureCallinUserParams.serializeBinary();
            return _addon.EnableHideFullPhoneNumber4PureCallinUser(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to limit the length of meeting ID. Default: FALSE.
       * If it is enabled, the length of the meeting ID depends on the ID type. The ID shall be more than nine(9) figures or five(5) letters.
	      Also, The meeting ID will be displayed as it is (not formatted).
       * @method MeetingConfig_EnableLengthLimitationOfMeetingNumber
       * @param {Boolean} bEnable TRUE indicates to limit the length of meeting ID. FALSE not
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableLengthLimitationOfMeetingNumber: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableLengthLimitationOfMeetingNumberParams = new messages.EnableLengthLimitationOfMeetingNumberParams();
            EnableLengthLimitationOfMeetingNumberParams.setBenable(bEnable);
            let bytes = EnableLengthLimitationOfMeetingNumberParams.serializeBinary();
            return _addon.EnableLengthLimitationOfMeetingNumber(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to share IOS device. Default: FALSE.
       * @method MeetingConfig_EnableShareIOSDevice
       * @param {Boolean} bEnable TRUE indicates to enable to share. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableShareIOSDevice: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableShareIOSDeviceParams = new messages.EnableShareIOSDeviceParams();
            EnableShareIOSDeviceParams.setBenable(bEnable);
            let bytes = EnableShareIOSDeviceParams.serializeBinary();
            return _addon.EnableShareIOSDevice(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to share white board. Default: TRUE.
       * @method MeetingConfig_EnableShareWhiteBoard
       * @param {Boolean} bEnable TRUE indicates to enable to share on the white board. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableShareWhiteBoard: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableShareWhiteBoardParams = new messages.EnableShareWhiteBoardParams();
            EnableShareWhiteBoardParams.setBenable(bEnable);
            let bytes = EnableShareWhiteBoardParams.serializeBinary();
            return _addon.EnableShareWhiteBoard(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set whether to forbid multi-share. Default: FALSE.
       * @method MeetingConfig_ForceDisableMultiShare
       * @param {Boolean} bDisable TRUE indicates to forbid multi-share. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_ForceDisableMultiShare: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bDisable = clientOpts.bDisable;
          try {
            let ForceDisableMultiShareParams = new messages.ForceDisableMultiShareParams();
            ForceDisableMultiShareParams.setBdisable(bDisable);
            let bytes = EnableShareWhiteBoardParams.serializeBinary();
            return _addon.ForceDisableMultiShare(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the maximum duration of the meeting when there is no attendee in the meeting. Default: 24*60
       * @method MeetingConfig_SetMaxDurationForOnlyHostInMeeting
       * @param {Number} nDuration Specify the maximum duration in minutes
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetMaxDurationForOnlyHostInMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let nDuration = clientOpts.nDuration;
          try {
            let SetMaxDurationForOnlyHostInMeetingParams = new messages.SetMaxDurationForOnlyHostInMeetingParams();
            SetMaxDurationForOnlyHostInMeetingParams.setNduration(nDuration);
            let bytes = SetMaxDurationForOnlyHostInMeetingParams.serializeBinary();
            return _addon.SetMaxDurationForOnlyHostInMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the local recording convert progress bar dialog. Default: TRUE
       * @method MeetingConfig_EnableLocalRecordingConvertProgressBarDialog
       * @param {Boolean} bShow TRUE indicates to show the dialog box. FALSE not
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableLocalRecordingConvertProgressBarDialog: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bShow = clientOpts.bShow;
          try {
            let EnableLocalRecordingConverProgressBarDialogParams = new messages.EnableLocalRecordingConverProgressBarDialogParams();
            EnableLocalRecordingConverProgressBarDialogParams.setBenable(bShow);
            let bytes = EnableLocalRecordingConverProgressBarDialogParams.serializeBinary();
            return _addon.EnableLocalRecordingConvertProgressBarDialog(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the dialog box when receiving the request of remote control during the meeting. Default value: TRUE.
       * @method MeetingConfig_EnableApproveRemoteControlDlg
       * @param {Boolean} bEnable TRUE indicates to display the dialog box. FALSE not.
	        If it is FALSE, the user can deal with this request in the IMeetingRemoteCtrlEvent::onRemoteControlStatus() callback event sent by SDK when receiving the request of the remote control and then enters the sharing status at the end of callback event.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableApproveRemoteControlDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableApproveRemoteControlDlgParams = new messages.EnableApproveRemoteControlDlgParams();
            EnableApproveRemoteControlDlgParams.setBenable(bEnable);
            let bytes = EnableApproveRemoteControlDlgParams.serializeBinary();
            return _addon.EnableApproveRemoteControlDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the dialog box when the request of the remote control is refused. Default value: TRUE.
       * @method MeetingConfig_EnableDeclineRemoteControlResponseDlg
       * @param {Boolean} bEnable TRUE indicates to display the dialog box. FALSE not.
	        If it is FALSE, the user can deal with this request in the IMeetingRemoteCtrlEvent::onRemoteControlStatus() callback event sent by SDK when receiving the decline request of the remote control and then exists the sharing status at the end of callback event.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableDeclineRemoteControlResponseDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableDeclineRemoteControlResponseDlgParams = new messages.EnableDeclineRemoteControlResponseDlgParams();
            EnableDeclineRemoteControlResponseDlgParams.setBenable(bEnable);
            let bytes = EnableDeclineRemoteControlResponseDlgParams.serializeBinary();
            return _addon.EnableDeclineRemoteControlResponseDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the LEAVE MEETING button on the pop-up dialogue box when the host leaves the meeting. Default value: TRUE.
       * @method MeetingConfig_EnableLeaveMeetingOptionForHost
       * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableLeaveMeetingOptionForHost: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableLeaveMeetingOptionForHostParams = new messages.EnableLeaveMeetingOptionForHostParams();
            EnableLeaveMeetingOptionForHostParams.setBenable(bEnable);
            let bytes = EnableLeaveMeetingOptionForHostParams.serializeBinary();
            return _addon.EnableLeaveMeetingOptionForHost(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the Video button in the toolbar during the meeting. Default value: TRUE.
       * @method MeetingConfig_EnableVideoButtonOnMeetingUI
       * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableVideoButtonOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableVideoButtonOnMeetingUIParams = new messages.EnableVideoButtonOnMeetingUIParams();
            EnableVideoButtonOnMeetingUIParams.setBenable(bEnable);
            let bytes = EnableVideoButtonOnMeetingUIParams.serializeBinary();
            return _addon.EnableVideoButtonOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Enable Set the visibility of the buttons to enter or exit the full screen in the meeting window. Default value: TRUE.
       * @method MeetingConfig_EnableEnterAndExitFullScreenButtonOnMeetingUI
       * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableEnterAndExitFullScreenButtonOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableEnterAndExitFullScreenButtonOnMeetingUIParams = new messages.EnableEnterAndExitFullScreenButtonOnMeetingUIParams();
            EnableEnterAndExitFullScreenButtonOnMeetingUIParams.setBenable(bEnable);
            let bytes = EnableEnterAndExitFullScreenButtonOnMeetingUIParams.serializeBinary();
            return _addon.EnableEnterAndExitFullScreenButtonOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the event with user's own program by clicking START SHARE button in the meeting. Default value: FALSE.
       * The SDK won't enable the share if the user calls this function and sets to convert. The user will deal with the subsequent logic after receiving the onStartShareBtnClicked() callback event.
       * @method MeetingConfig_RedirectClickShareBTNEvent
       * @param {Boolean} bEnable TRUE indicates to deal with the event with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectClickShareBTNEvent: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectClickShareBTNEventParams = new messages.RedirectClickShareBTNEventParams();
            RedirectClickShareBTNEventParams.setBredirect(bEnable);
            let bytes = RedirectClickShareBTNEventParams.serializeBinary();
            return _addon.RedirectClickShareBTNEvent(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the event with user's own program by clicking END MEETING button in the meeting. Default value: FALSE.
       * The SDK won't end the meeting if the user calls this function and set to convert. The user will deal with the subsequent logic after receiving the onEndMeetingBtnClicked() callback event.
       * @method MeetingConfig_RedirectClickEndMeetingBTNEvent
       * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectClickEndMeetingBTNEvent: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectClickEndMeetingBTNEventParams = new messages.RedirectClickEndMeetingBTNEventParams();
            RedirectClickEndMeetingBTNEventParams.setBredirect(bEnable);
            let bytes = RedirectClickEndMeetingBTNEventParams.serializeBinary();
            return _addon.RedirectClickEndMeetingBTNEvent(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * An upgrade dialog box will pop up when the free meeting is over. Use this function to set if it is able to handle the reminder message with user's own program. Default value: FALSE.
       * @method MeetingConfig_RedirectFreeMeetingEndingReminderDlg
       * @param {Boolean} bEnable TRUE indicates to handle the reminder message with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectFreeMeetingEndingReminderDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectFreeMeetingEndingReminderDlgParams = new messages.RedirectFreeMeetingEndingReminderDlgParams();
            RedirectFreeMeetingEndingReminderDlgParams.setBredirect(bEnable);
            let bytes = RedirectFreeMeetingEndingReminderDlgParams.serializeBinary();
            return _addon.RedirectFreeMeetingEndingReminderDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the event with SDK user's own program by clicking CUSTOM LIVE STREAM button in the meeting. Default value: FALSE.
       * If the user calls this function to convert, the SDK will trigger the onCustomLiveStreamMenuClicked() instead of jumping to the live video page when clicking on the custom live stream, then deal with the subsequent logic.
       * @method MeetingConfig_RedirectClickCustomLiveStreamMenuEvent
       * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectClickCustomLiveStreamMenuEvent: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectClickCustomLiveStreamMenuEventParams = new messages.RedirectClickCustomLiveStreamMenuEventParams();
            RedirectClickCustomLiveStreamMenuEventParams.setBredirect(bEnable);
            let bytes = RedirectClickCustomLiveStreamMenuEventParams.serializeBinary();
            return _addon.RedirectClickCustomLiveStreamMenuEvent(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the event with SDK user's own program by clicking PARTICIPANT LIST button in the meeting. Default value: FALSE.
       * The list won't unfold by clicking participant list button if the user calls this function to set to convert. The SDK will trigger the onParticipantListBtnClicked(), and the user shall deal with the subsequent logic himself.
       * @method MeetingConfig_RedirectClickParticipantListBTNEvent
       * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectClickParticipantListBTNEvent: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectClickParticipantListBTNEventParams = new messages.RedirectClickParticipantListBTNEventParams();
            RedirectClickParticipantListBTNEventParams.setBredirect(bEnable);
            let bytes = RedirectClickParticipantListBTNEventParams.serializeBinary();
            return _addon.RedirectClickParticipantListBTNEvent(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the event with SDK user's own program by clicking Closed Caption button in the meeting. Default value: FALSE.
       * If the user calls this function to convert, the SDK will trigger the onCCBTNClicked(), and the user shall deal with the subsequent logic himself.
       * @method MeetingConfig_RedirectClickCCBTNEvent
       * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectClickCCBTNEvent: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectClickCCBTNEventParams = new messages.RedirectClickCCBTNEventParams();
            RedirectClickCCBTNEventParams.setBredirect(bEnable);
            let bytes = RedirectClickCCBTNEventParams.serializeBinary();
            return _addon.RedirectClickCCBTNEvent(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the warning message with SDK user's own program in the meeting. Default value: None.
       * @method MeetingConfig_RedirectMeetingWarningMsg
       * @param {Boolean} bRedirectBadNetwork
       * @param {Boolean} bRedirectWarnHighCPU
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectMeetingWarningMsg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bRedirectBadNetwork = clientOpts.bRedirectBadNetwork;
          let bRedirectWarnHighCPU = clientOpts.bRedirectWarnHighCPU;
          try {
            let RedirectMeetingWarningMsgParams = new messages.RedirectMeetingWarningMsgParams();
            RedirectMeetingWarningMsgParams.setBredirectbadnetwork(bRedirectBadNetwork);
            RedirectMeetingWarningMsgParams.setBredirectwarnhighcpu(bRedirectWarnHighCPU);
            let bytes = RedirectMeetingWarningMsgParams.serializeBinary();
            return _addon.RedirectMeetingWarningMsg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to temporarily show tooltip of the button in the toolbar of the meeting and user can close it by click the "x". Default value: TRUE.
       * @method MeetingConfig_EnableToolTipsShow
       * @param {Boolean} bEnable TRUE indicates to enable to show the tooltip in the meeting. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableToolTipsShow: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableToolTipsShowParams = new messages.EnableToolTipsShowParams();
            EnableToolTipsShowParams.setBenable(bEnable);
            let bytes = EnableToolTipsShowParams.serializeBinary();
            return _addon.EnableToolTipsShow(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the introduction window when sharing on the iOS device. Default value: TRUE.
       * The SDK will trigger the onAirPlayInstructionWndNotification() callback event if the user calls this function to set to false, he shall deal with the subsequent logic himself.
       * @method MeetingConfig_EnableAirplayInstructionWindow
       * @param {Boolean} bEnable TRUE indicates to display the introduction window when sharing on the iOS device. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableAirplayInstructionWindow: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAirplayInstructionWindowParams = new messages.EnableAirplayInstructionWindowParams();
            EnableAirplayInstructionWindowParams.setBenable(bEnable);
            let bytes = EnableAirplayInstructionWindowParams.serializeBinary();
            return _addon.EnableAirplayInstructionWindow(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to retrieve the permission of host (when the original host gives up the host permission). Default value: TRUE.
       * The original host can always claim host and is not affected by this API.
       * @method MeetingConfig_EnableClaimHostFeature
       * @param {Boolean} bEnable TRUE indicates that he can retrieve the permission of host. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableClaimHostFeature: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableClaimHostFeatureParams = new messages.EnableClaimHostFeatureParams();
            EnableClaimHostFeatureParams.setBenable(bEnable);
            let bytes = EnableClaimHostFeatureParams.serializeBinary();
            return _addon.EnableClaimHostFeature(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the dialog box of choosing audio when joining the meeting. Default value: FALSE.
       * @method MeetingConfig_EnableAutoHideJoinAudioDialog
       * @param {Boolean} bEnable TRUE indicates to hide the dialog box of choosing audio when joining the meeting. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableAutoHideJoinAudioDialog: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAutoHideJoinAudioDialogParams = new messages.EnableAutoHideJoinAudioDialogParams();
            EnableAutoHideJoinAudioDialogParams.setBenable(bEnable);
            let bytes = EnableAutoHideJoinAudioDialogParams.serializeBinary();
            return _addon.EnableAutoHideJoinAudioDialog(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to display the preview window of the Meeting Controls on the task bar during sharing. Default value: FALSE.
       * @method MeetingConfig_AlwaysShowIconOnTaskBar
       * @param {Boolean} bEnable TRUE indicates to display always the icon on the task-bar.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_AlwaysShowIconOnTaskBar: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let AlwaysShowIconOnTaskBarParams = new messages.AlwaysShowIconOnTaskBarParams();
            AlwaysShowIconOnTaskBarParams.setBalwaysshow(bEnable);
            let bytes = AlwaysShowIconOnTaskBarParams.serializeBinary();
            return _addon.AlwaysShowIconOnTaskBar(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to enable split screen during the meeting. Default value: FALSE.
       * @method MeetingConfig_DisableSplitScreenModeUIElements
       * @param {Boolean} bEnable TRUE indicates to disable the split screen. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_DisableSplitScreenModeUIElements: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let DisableSplitScreenModeUIElementsParams = new messages.DisableSplitScreenModeUIElementsParams();
            DisableSplitScreenModeUIElementsParams.setBdisable(bEnable);
            let bytes = DisableSplitScreenModeUIElementsParams.serializeBinary();
            return _addon.DisableSplitScreenModeUIElements(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the SHARE COMPUTER SOUND check-box in the sharing window. Default value: TRUE.
       * @method MeetingConfig_SetShowAudioUseComputerSoundChkbox
       * @param {Boolean} bEnable TRUE indicates to display. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetShowAudioUseComputerSoundChkbox: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let SetShowAudioUseComputerSoundChkboxParams = new messages.SetShowAudioUseComputerSoundChkboxParams();
            SetShowAudioUseComputerSoundChkboxParams.setBshow(bEnable);
            let bytes = SetShowAudioUseComputerSoundChkboxParams.serializeBinary();
            return _addon.SetShowAudioUseComputerSoundChkbox(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of PHONE CALL tab in the audio dialog box when joining the meeting. Default value: TRUE.
       * @method MeetingConfig_SetShowCallInTab
       * @param {Boolean} bEnable TRUE indicates to display the tab. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetShowCallInTab: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let SetShowCallInTabParams = new messages.SetShowCallInTabParams();
            SetShowCallInTabParams.setBshow(bEnable);
            let bytes = SetShowCallInTabParams.serializeBinary();
            return _addon.SetShowCallInTab(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of CALL ME tab in the audio dialog box when joining the meeting. Default value: TRUE.
       * @method MeetingConfig_SetShowCallMeTab
       * @param {Boolean} bEnable TRUE indicates to display the tab. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetShowCallMeTab: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let SetShowCallMeTabParams = new messages.SetShowCallMeTabParams();
            SetShowCallMeTabParams.setBshow(bEnable);
            let bytes = SetShowCallMeTabParams.serializeBinary();
            return _addon.SetShowCallMeTab(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Whether to remove the topmost attribute of setting dialog. Default is not removed.
       * @method MeetingConfig_DisableTopMostAttr4SettingDialog
       * @param {Boolean} bEnable TRUE indicates to remove. FALSE not.
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_DisableTopMostAttr4SettingDialog: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let DisableTopMostAttr4SettingDialogParams = new messages.DisableTopMostAttr4SettingDialogParams();
            DisableTopMostAttr4SettingDialogParams.setBdisable(bEnable);
            let bytes = DisableTopMostAttr4SettingDialogParams.serializeBinary();
            return _addon.DisableTopMostAttr4SettingDialog(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set whether to close the current sharing of another user without prompt and directly beginning a new sharing content by the closer. Default value: FALSE(prompt).
       * @method MeetingConfig_EnableGrabShareWithoutReminder
       * @param {Boolean} bEnable TRUE indicates no prompt. FALSE not.
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableGrabShareWithoutReminder: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableGrabShareWithoutReminderParams = new messages.EnableGrabShareWithoutReminderParams();
            EnableGrabShareWithoutReminderParams.setBenable(bEnable);
            let bytes = EnableGrabShareWithoutReminderParams.serializeBinary();
            return _addon.EnableGrabShareWithoutReminder(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the SWITCH TO SINGLE PARTICIPANT SHARE dialog box when multiple participants are sharing and the user try to change the setting to single share. Default: TURE.
       * @method MeetingConfig_EnableShowShareSwitchMultiToSingleConfirmDlg
       * @param {Boolean} bEnable TRUE indicates to show dialog box if the multishare option is changed. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableShowShareSwitchMultiToSingleConfirmDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableShowShareSwitchMultiToSingleConfirmDlgParams = new messages.EnableShowShareSwitchMultiToSingleConfirmDlgParams();
            EnableShowShareSwitchMultiToSingleConfirmDlgParams.setBenable(bEnable);
            let bytes = EnableShowShareSwitchMultiToSingleConfirmDlgParams.serializeBinary();
            return _addon.EnableShowShareSwitchMultiToSingleConfirmDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the REMAINING MEETING TIME button in the meeting. Default: FALSE.
       * If the button is disabled to show, you will retrieve onFreeMeetingRemainTime callback event.
       * @method MeetingConfig_DisableFreeMeetingRemainTimeNotify
       * @param {Boolean} bEnable TRUE indicates to hide the button when the free meeting need be reminded. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_DisableFreeMeetingRemainTimeNotify: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let DisableFreeMeetingRemainTimeNotifyParams = new messages.DisableFreeMeetingRemainTimeNotifyParams();
            DisableFreeMeetingRemainTimeNotifyParams.setBdisable(bEnable);
            let bytes = DisableFreeMeetingRemainTimeNotifyParams.serializeBinary();
            return _addon.DisableFreeMeetingRemainTimeNotify(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set whether to display the button CHAT and menu item. Default is displaying.
       * @method MeetingConfig_HideChatItemOnMeetingUI
       * @param {Boolean} bEnable TRUE means hiding, otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideChatItemOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideChatItemOnMeetingUIParams = new messages.HideChatItemOnMeetingUIParams();
            HideChatItemOnMeetingUIParams.setBhide(bEnable);
            let bytes = HideChatItemOnMeetingUIParams.serializeBinary();
            return _addon.HideChatItemOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set whether to display the button RECORD and menu item. Default is displaying.
       * @method MeetingConfig_HideRecordItemOnMeetingUI
       * @param {Boolean} bEnable TRUE means hiding, otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideRecordItemOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideRecordItemOnMeetingUIParams = new messages.HideRecordItemOnMeetingUIParams();
            HideRecordItemOnMeetingUIParams.setBhide(bEnable);
            let bytes = HideRecordItemOnMeetingUIParams.serializeBinary();
            return _addon.HideRecordItemOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set whether to display the button UPGRADE when prompt the tooltip of free meeting counts down. Default is displaying.
       * @method MeetingConfig_HideUpgradeFreeMeetingButton
       * @param {Boolean} bEnable TRUE means hiding, otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideUpgradeFreeMeetingButton: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideUpgradeFreeMeetingButtonParams = new messages.HideUpgradeFreeMeetingButtonParams();
            HideUpgradeFreeMeetingButtonParams.setBhide(bEnable);
            let bytes = HideUpgradeFreeMeetingButtonParams.serializeBinary();
            return _addon.HideUpgradeFreeMeetingButton(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of some specified tabs in the invite dialog. Default: Show all the content.
       * @method MeetingConfig_SetShowInviteDlgTabPage
       * @param {Number} tabPage Specify a tab page, Defined in: {@link SDKInviteDlgTabPage}
       * @param {Boolean} bShow TRUE indicates to display the tab. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetShowInviteDlgTabPage: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let tabPage = clientOpts.tabPage;
          let bShow = clientOpts.bShow;
          try {
            let SetShowInviteDlgTabPageParams = new messages.SetShowInviteDlgTabPageParams();
            SetShowInviteDlgTabPageParams.setTabpage(tabPage);
            SetShowInviteDlgTabPageParams.setBshow(bShow);
            let bytes = SetShowInviteDlgTabPageParams.serializeBinary();
            return _addon.SetShowInviteDlgTabPage(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of some specified tabs in the Room System invitation dialog. Default: show all the content.Default: show all the content.
       * @method MeetingConfig_SetShowH323SubTabPage
       * @param {Number} tabPage Specify a tab, Defined in: {@link SDKH323TabPage}
       * @param {Boolean} bShow TRUE indicates to display the tab. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetShowH323SubTabPage: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let tabPage = clientOpts.tabPage;
          let bShow = clientOpts.bShow;
          try {
            let SetShowH323SubTabPageParams = new messages.SetShowH323SubTabPageParams();
            SetShowH323SubTabPageParams.setTabpage(tabPage);
            SetShowH323SubTabPageParams.setBshow(bShow);
            let bytes = SetShowH323SubTabPageParams.serializeBinary();
            return _addon.SetShowH323SubTabPage(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of upgrade warning message for free user when the user schedules a meeting. Default: FALSE.
       * @method MeetingConfig_HideUpgradeWarningMsgForFreeUserWhenSchedule
       * @param {Boolean} bEnable TRUE indicates to hide the warning message.FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideUpgradeWarningMsgForFreeUserWhenSchedule: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideUpgradeWarningMsgForFreeUserWhenScheduleParams = new messages.HideUpgradeWarningMsgForFreeUserWhenScheduleParams();
            HideUpgradeWarningMsgForFreeUserWhenScheduleParams.setBhide(bEnable);
            let bytes = HideUpgradeWarningMsgForFreeUserWhenScheduleParams.serializeBinary();
            return _addon.HideUpgradeWarningMsgForFreeUserWhenSchedule(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of Switch Camera button on 2nd camera share window,Default: TRUE.
       * @method MeetingConfig_HideSwitchCameraButton
       * @param {Boolean} bEnable TRUE indicates to hide the Switch Camera button. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideSwitchCameraButton: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideSwitchCameraButtonParams = new messages.HideSwitchCameraButtonParams();
            HideSwitchCameraButtonParams.setBhide(bEnable);
            let bytes = HideSwitchCameraButtonParams.serializeBinary();
            return _addon.HideSwitchCameraButton(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of CopyURL button on invite window, Default: TRUE.
       * @method MeetingConfig_HideCopyUrlOnInviteWindow
       * @param {Boolean} bEnable TRUE indicates to hide, FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideCopyUrlOnInviteWindow: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideCopyUrlOnInviteWindowParams = new messages.HideCopyUrlOnInviteWindowParams();
            HideCopyUrlOnInviteWindowParams.setBhide(bEnable);
            let bytes = HideCopyUrlOnInviteWindowParams.serializeBinary();
            return _addon.HideCopyUrlOnInviteWindow(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of CopyInvitation button on invite window, Default: TRUE.
       * @method MeetingConfig_HideCopyInvitationOnInviteWindow
       * @param {Boolean} bEnable TRUE indicates to hide, FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideCopyInvitationOnInviteWindow: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideCopyInvitationOnInviteWindowParams = new messages.HideCopyInvitationOnInviteWindowParams();
            HideCopyInvitationOnInviteWindowParams.setBhide(bEnable);
            let bytes = HideCopyInvitationOnInviteWindowParams.serializeBinary();
            return _addon.HideCopyInvitationOnInviteWindow(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of Keypad button on meeting window, Default: TRUE.
       * @method MeetingConfig_HideKeypadButtonOnMeetingWindow
       * @param {Boolean} bEnable TRUE indicates to hide, FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideKeypadButtonOnMeetingWindow: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideKeypadButtonOnMeetingWindowParams = new messages.HideKeypadButtonOnMeetingWindowParams();
            HideKeypadButtonOnMeetingWindowParams.setBhide(bEnable);
            let bytes = HideKeypadButtonOnMeetingWindowParams.serializeBinary();
            return _addon.HideKeypadButtonOnMeetingWindow(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set whether to display the button REMOTE CONTROL and menu item. Default is displaying.
       * If the calling of API with parameter TRUE is successful, SDK will call EnableApproveRemoteControlDlg(false) by default.
       * @method MeetingConfig_HideRemoteControlOnMeetingUI
       * @param {Boolean} bEnable TRUE means hiding, otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideRemoteControlOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideRemoteControlOnMeetingUIParams = new messages.HideRemoteControlOnMeetingUIParams();
            HideRemoteControlOnMeetingUIParams.setBhide(bEnable);
            let bytes = HideRemoteControlOnMeetingUIParams.serializeBinary();
            return _addon.HideRemoteControlOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of Q&A on meeting UI. Default is displaying.
       * @method MeetingConfig_HideQAOnMeetingUI
       * @param {Boolean} bEnable TRUE means hiding, otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HideQAOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HideQAOnMeetingUIParams = new messages.HideQAOnMeetingUIParams();
            HideQAOnMeetingUIParams.setBhide(bEnable);
            let bytes = HideQAOnMeetingUIParams.serializeBinary();
            return _addon.HideQAOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of poll on meeting UI. Default is displaying.
       * @method MeetingConfig_HidePollOnMeetingUI
       * @param {Boolean} bEnable TRUE means hiding, otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_HidePollOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let HidePollOnMeetingUIParams = new messages.HidePollOnMeetingUIParams();
            HidePollOnMeetingUIParams.setBhide(bEnable);
            let bytes = HidePollOnMeetingUIParams.serializeBinary();
            return _addon.HidePollOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the dialog box to input the password. Default: TRUE.
       * If it is disabled, the SDK will trigger onInputMeetingPasswordAndScreenNameNotification()callback event when the user is asked to re-enter the password, then the user shall deal with the subsequent logic.
       * @method MeetingConfig_EnableInputMeetingPasswordDlg
       * @param {Boolean} bEnable TRUE indicates to display the dialog box to input password. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableInputMeetingPasswordDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableInputMeetingPasswordDlgParams = new messages.EnableInputMeetingPasswordDlgParams();
            EnableInputMeetingPasswordDlgParams.setBenable(bEnable);
            let bytes = EnableInputMeetingPasswordDlgParams.serializeBinary();
            return _addon.EnableInputMeetingPasswordDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the dialog box to input the screen name. Default: TRUE.
       * If it is false, the SDK will trigger IMeetingConfigurationEvent::onInputMeetingPasswordAndScreenNameNotification()callback event when the user is asked to re-enter the screen name, then the user shall deal with the subsequent logic.
       * @method MeetingConfig_EnableInputMeetingScreenNameDlg
       * @param {Boolean} bEnable TRUE indicates to display the dialog box to input the screen name which is to be displayed in the meeting. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableInputMeetingScreenNameDlg: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableInputMeetingScreenNameDlgParams = new messages.EnableInputMeetingScreenNameDlgParams();
            EnableInputMeetingScreenNameDlgParams.setBenable(bEnable);
            let bytes = EnableInputMeetingScreenNameDlgParams.serializeBinary();
            return _addon.EnableInputMeetingScreenNameDlg(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the webinar register process with user's own program in the meeting. Default: FALSE.
       * If it is true, the SDK will trigger the IMeetingConfigurationEvent::onWebinarNeedRegisterNotification()callback event.
       * @method MeetingConfig_RedirectWebinarNeedRegister
       * @param {Boolean} bEnable TRUE indicates to redirect. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectWebinarNeedRegister: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectWebinarNeedRegisterParams = new messages.RedirectWebinarNeedRegisterParams();
            RedirectWebinarNeedRegisterParams.setBredirect(Boolean(bEnable));
            let bytes = RedirectWebinarNeedRegisterParams.serializeBinary();
            return _addon.RedirectWebinarNeedRegister(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to redirect the process to end another meeting by user's own program. Default: FALSE.
       * This function doesn't work if the IJoinMeetingBehaviorConfiguration::EnableAutoEndOtherMeetingWhenStartMeeting(true) is also called. If redirect successfully, the SDK will trigger the IMeetingConfigurationEvent::onEndOtherMeetingToJoinMeetingNotification() callback event.
       * @method MeetingConfig_RedirectEndOtherMeeting
       * @param {Boolean} bEnable TRUE indicates to redirect. FALSE not. If it is TRUE, the SDK will trigger the onEndOtherMeetingToJoinMeetingNotification().
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectEndOtherMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let RedirectEndOtherMeetingParams = new messages.RedirectEndOtherMeetingParams();
            RedirectEndOtherMeetingParams.setBredirect(Boolean(bEnable));
            let bytes = RedirectEndOtherMeetingParams.serializeBinary();
            return _addon.RedirectEndOtherMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Force to enable the video when join meeting.
       * The default behavior depends on the configuration of the meeting.
       * @method MeetingConfig_EnableForceAutoStartMyVideoWhenJoinMeeting
       * @param {Boolean} bEnable TRUE indicates to force to start video.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableForceAutoStartMyVideoWhenJoinMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableForceAutoStartMyVideoWhenJoinMeetingParams = new messages.EnableForceAutoStartMyVideoWhenJoinMeetingParams();
            EnableForceAutoStartMyVideoWhenJoinMeetingParams.setBenable(Boolean(bEnable));
            let bytes = EnableForceAutoStartMyVideoWhenJoinMeetingParams.serializeBinary();
            return _addon.EnableForceAutoStartMyVideoWhenJoinMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Force to turn off video when joining the meeting.
       * The default behavior depends on the configuration of the meeting.
       * @method MeetingConfig_EnableForceAutoStopMyVideoWhenJoinMeeting
       * @param {Boolean} bEnable TRUE indicates to force to turn off the video.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableForceAutoStopMyVideoWhenJoinMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableForceAutoStopMyVideoWhenJoinMeetingParams = new messages.EnableForceAutoStopMyVideoWhenJoinMeetingParams();
            EnableForceAutoStopMyVideoWhenJoinMeetingParams.setBenable(Boolean(bEnable));
            let bytes = EnableForceAutoStopMyVideoWhenJoinMeetingParams.serializeBinary();
            return _addon.EnableForceAutoStopMyVideoWhenJoinMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the dialog  SELECT JOIN AUDIO when joining meeting. Default: FALSE.
       * @method MeetingConfig_DisableAutoShowSelectJoinAudioDlgWhenJoinMeeting
       * @param {Boolean} bEnable TRUE indicates to hide the dialog box.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_DisableAutoShowSelectJoinAudioDlgWhenJoinMeeting: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams = new messages.DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams();
            DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams.setBdisable(Boolean(bEnable));
            let bytes = DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams.serializeBinary();
            return _addon.DisableAutoShowSelectJoinAudioDlgWhenJoinMeeting(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to copy and paste for remote control. Default: FALSE.
       * @method MeetingConfig_DisableRemoteCtrlCopyPasteFeature
       * @param {Boolean} bEnable TRUE indicates that it is disabled to copy or paste. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_DisableRemoteCtrlCopyPasteFeature: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams = new messages.DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams();
            DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams.setBdisable(Boolean(bEnable));
            let bytes = DisableAutoShowSelectJoinAudioDlgWhenJoinMeetingParams.serializeBinary();
            return _addon.DisableRemoteCtrlCopyPasteFeature(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the OPTIMIZE FOR FULL SCREEN VIDEO CLIP check-box in the sharing window. Default value: TRUE.
       * @method MeetingConfig_SetShowVideoOptimizeChkbox
       * @param {Boolean} bShow TRUE indicates to display. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_SetShowVideoOptimizeChkbox: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bShow = clientOpts.bShow;
          try {
            let SetShowVideoOptimizeChkboxParams = new messages.SetShowVideoOptimizeChkboxParams();
            SetShowVideoOptimizeChkboxParams.setBshow(Boolean(bShow));
            let bytes = SetShowVideoOptimizeChkboxParams.serializeBinary();
            return _addon.SetShowVideoOptimizeChkbox(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the type of required information to be completed.
       * @method MeetingConfig_GetRequiredInfoType
       * @return {Number} If the function succeed, the return is defined in: {@link RequiredInfoType}
       */
      MeetingConfig_GetRequiredInfoType: function () {
        if (_addon) {
          return _addon.GetRequiredInfoType();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Complete the password and screen name information.
       * The SDK will destroy the object instance after calling this function. Supplement with the correct information.
       * @method MeetingConfig_InputMeetingPasswordAndScreenName
       * @param {String} meeting_Password
       * @param {String} screenName
       * @return {Boolean}
       */
      MeetingConfig_InputMeetingPasswordAndScreenName: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let meeting_Password = clientOpts.meeting_Password;
          let screenName = clientOpts.screenName;
          try {
            let InputMeetingPasswordAndScreenNameParams = new messages.InputMeetingPasswordAndScreenNameParams();
            InputMeetingPasswordAndScreenNameParams.setPsw(meeting_Password);
            InputMeetingPasswordAndScreenNameParams.setScreenname(screenName);
            let bytes = InputMeetingPasswordAndScreenNameParams.serializeBinary();
            return _addon.InputMeetingPasswordAndScreenName(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Complete the meeting id and screen name information.
       * The SDK will destroy the object instance after calling this function. Supplement with the correct information.
       * @method MeetingConfig_InputMeetingIDAndScreenName
       * @param {String} meetingID
       * @param {String} screenName
       * @return {Boolean}
       */
      MeetingConfig_InputMeetingIDAndScreenName: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let meetingID = clientOpts.meetingID;
          let screenName = clientOpts.screenName;
          try {
            let InputMeetingIDAndScreenNameParams = new messages.InputMeetingIDAndScreenNameParams();
            InputMeetingIDAndScreenNameParams.setMeetingid(meetingID);
            InputMeetingIDAndScreenNameParams.setScreenname(screenName);
            let bytes = InputMeetingIDAndScreenNameParams.serializeBinary();
            return _addon.InputMeetingIDAndScreenName(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Complete the screen name.
       * The SDK will destroy this object instance after calling this function. Complete the information by the correct function.
       * @method MeetingConfig_InputMeetingScreenName
       * @param {String} screenName
       * @return {Boolean}
       */
      MeetingConfig_InputMeetingScreenName: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let screenName = clientOpts.screenName;
          try {
            let InputMeetingScreenNameParams = new messages.InputMeetingScreenNameParams();
            InputMeetingScreenNameParams.setScreenname(screenName);
            let bytes = InputMeetingScreenNameParams.serializeBinary();
            return _addon.InputMeetingScreenName(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Meeting Password And Screen Name Handler Cancel
       * @method MeetingConfig_MeetingPasswordAndScreenNameHandler_Cancel
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_MeetingPasswordAndScreenNameHandler_Cancel: function () {
        if (_addon) {
          return _addon.MeetingPasswordAndScreenNameHandler_Cancel();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the type to register.
       * @method MeetingConfig_GetWebinarNeedRegisterType
       * @return {Number} Defined in: {@link WebinarNeedRegisterType}
       */
      MeetingConfig_GetWebinarNeedRegisterType: function () {
        if (_addon) {
          return _addon.GetWebinarNeedRegisterType();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the URL to register webinar.
       * @method MeetingConfig_GetWebinarRegisterUrl
       * @return {String} If the function succeed, the return value is an URL.
       */
      MeetingConfig_GetWebinarRegisterUrl: function () {
        if (_addon) {
          return _addon.GetWebinarRegisterUrl();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Release Register Webinar By Url
       * @method MeetingConfig_ReleaseRegisterWebinarByUrl
       * @return {Number}
       */
      MeetingConfig_ReleaseRegisterWebinarByUrl: function () {
        if (_addon) {
          return _addon.ReleaseRegisterWebinarByUrl();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Configure the information of email and screen name.
       * The SDK will destroy this object instance after calling this function. Supplement with the correct information.
       * @method MeetingConfig_InputWebinarRegisterEmailAndScreenName
       * @param {String} email
       * @param {String} screenName
       * @return {Number}
       */
      MeetingConfig_InputWebinarRegisterEmailAndScreenName: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let email = clientOpts.email;
          let screenName = clientOpts.screenName;
          try {
            let InputWebinarRegisterEmailAndScreenNameParams = new messages.InputWebinarRegisterEmailAndScreenNameParams();
            InputWebinarRegisterEmailAndScreenNameParams.setEmail(email);
            InputWebinarRegisterEmailAndScreenNameParams.setScreenname(screenName);
            let bytes = InputWebinarRegisterEmailAndScreenNameParams.serializeBinary();
            return _addon.InputWebinarRegisterEmailAndScreenName(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Cancel Register Webinar By Email
       * @method MeetingConfig_CancelRegisterWebinarByEmail
       * @return {Number}
       */
      MeetingConfig_CancelRegisterWebinarByEmail: function () {
        if (_addon) {
          return _addon.CancelRegisterWebinarByEmail();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the event with SDK user's own program by clicking Audio button in the meeting. Default value: FALSE.
       * If the user calls this function to convert, the SDK will trigger the onAudioBtnClicked(AudioBtnClickedCallbackInfo info), and the user shall deal with the subsequent logic himself.
       * @method MeetingConfig_RedirectClickAudioBTNEvent
       * @param {Boolean} bRedirect TRUE indicates to handle with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectClickAudioBTNEvent: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bRedirect = clientOpts.bRedirect;
          try {
            let RedirectClickAudioBTNEventParams = new messages.RedirectClickAudioBTNEventParams();
            RedirectClickAudioBTNEventParams.setBredirect(bRedirect);
            let bytes = RedirectClickAudioBTNEventParams.serializeBinary();
            return _addon.RedirectClickAudioBTNEvent(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set if it is able to handle the event with SDK user's own program by clicking Audio Menu button in the meeting. Default value: FALSE.
       * If the user calls this function to convert, the SDK will trigger the onAudioMenuBtnClicked(), and the user shall deal with the subsequent logic himself.
       * @method MeetingConfig_RedirectClickAudioMenuBTNEvent
       * @param {Boolean} bRedirect TRUE indicates to handle with user's own program. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_RedirectClickAudioMenuBTNEvent: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bRedirect = clientOpts.bRedirect;
          try {
            let RedirectClickAudioMenuBTNEventParams = new messages.RedirectClickAudioMenuBTNEventParams();
            RedirectClickAudioMenuBTNEventParams.setBredirect(bRedirect);
            let bytes = RedirectClickAudioMenuBTNEventParams.serializeBinary();
            return _addon.RedirectClickAudioMenuBTNEvent(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the Audio button in the toolbar during the meeting. Default value: TRUE.
       * @method MeetingConfig_EnableAudioButtonOnMeetingUI
       * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_EnableAudioButtonOnMeetingUI: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAudioButtonOnMeetingUIParams = new messages.EnableAudioButtonOnMeetingUIParams();
            EnableAudioButtonOnMeetingUIParams.setBenable(bEnable);
            let bytes = EnableAudioButtonOnMeetingUIParams.serializeBinary();
            return _addon.EnableAudioButtonOnMeetingUI(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set the visibility of the dialog box of joining a meeting. Default: FALSE.
       * @method MeetingConfig_DisableShowJoinMeetingWnd
       * @param {Boolean} bDisable TRUE indicates to hide the dialog box. FALSE not.
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      MeetingConfig_DisableShowJoinMeetingWnd: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bDisable = clientOpts.bDisable;
          try {
            let DisableShowJoinMeetingWndParams = new messages.DisableShowJoinMeetingWndParams();
            DisableShowJoinMeetingWndParams.setBdisable(bDisable);
            let bytes = DisableShowJoinMeetingWndParams.serializeBinary();
            return _addon.DisableShowJoinMeetingWnd(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Disable Toolbar Invite Button Click Origin Action, only support for MAC platform
       * @method MeetingConfig_DisableToolbarInviteButtonClickOriginAction
       * @param {Boolean} bDisable
       * @return {Number}
       */
      MeetingConfig_DisableToolbarInviteButtonClickOriginAction: function (opts) {
        if (platform == 'darwin' && _addon) {
          let clientOpts = opts || {};
          let bDisable = clientOpts.bDisable;
          try {
            let DisableToolbarInviteButtonClickOriginActionParams = new messages.DisableToolbarInviteButtonClickOriginActionParams();
            DisableToolbarInviteButtonClickOriginActionParams.setBdisable(bDisable);
            let bytes = DisableToolbarInviteButtonClickOriginActionParams.serializeBinary();
            return _addon.DisableToolbarInviteButtonClickOriginAction(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Set whether to forbid confidential watermark. Default: FALSE.
       * @method MeetingConfig_DisableConfidentialWatermark
       * @param {Boolean} bDisable TRUE indicates to forbid confidential watermark. FALSE not.
       * @return {Boolean} If watermark confidential is forbidden, the return value is TRUE. Otherwise FALSE.
       */
      MeetingConfig_DisableConfidentialWatermark: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bDisable = clientOpts.bDisable;
          try {
            let DisableConfidentialWatermarkParams = new messages.DisableConfidentialWatermarkParams();
            DisableConfidentialWatermarkParams.setBdisable(bDisable);
            let bytes = DisableConfidentialWatermarkParams.serializeBinary();
            return _addon.DisableConfidentialWatermark(bytes);
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
  ZoomMeetingConfiguration: ZoomMeetingConfiguration
}
