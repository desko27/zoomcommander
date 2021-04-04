const { ZoomSDKError } = require('./settings.js');

var ZoomPaymentReminder = (function () {
  let instance;

  /**
   * zoom Upgrade Account
   * @module zoom_upgrade_account
   * @param {Function} onVerifySMSVerificationCodeResultNotification The callback of upgrading the free meeting.
   * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStart Callback function of starting to upgrade the free meeting by the gift link.
   * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStop Callback function of ending upgrade the free meeting by the gift link.
   * @param {Function} onFreeMeetingUpgradeToProMeeting Callback function of free meting upgrades successfully.
   * @return {zoomUpgradeAccount}
   */
  function init(opts) {
    var clientOpts = opts || {};
    // Private methods and variables
    var _addon = clientOpts.addon.GetMeetingConfigCtrl() || null;
    let _onFreeMeetingNeedToUpgrade = clientOpts.onFreeMeetingNeedToUpgrade || null;
    let _onFreeMeetingUpgradeToGiftFreeTrialStart = clientOpts.onFreeMeetingUpgradeToGiftFreeTrialStart || null;
    let _onFreeMeetingUpgradeToGiftFreeTrialStop = clientOpts.onFreeMeetingUpgradeToGiftFreeTrialStop || null;
    let _onFreeMeetingUpgradeToProMeeting = clientOpts.onFreeMeetingUpgradeToProMeeting || null;

    /**
      The callback of upgrading the free meeting.
      @event onFreeMeetingNeedToUpgrade
      @param {String} type Type of upgrading the free meeting, {@link FreeMeetingNeedUpgradeType}
      @param {String} gift_url Upgrade the free meeting by the gift link. When and only when the value of type_ is FreeMeetingNeedUpgradeType_BY_GIFTURL, this parameter is meaningful.
    */
    function onFreeMeetingNeedToUpgrade (type, gift_url) {
      if (_onFreeMeetingNeedToUpgrade) {
        _onFreeMeetingNeedToUpgrade(type, gift_url)
      }
    }

    /**
      Callback function of starting to upgrade the free meeting by the gift link.
      @event onFreeMeetingUpgradeToGiftFreeTrialStart
    */
    function onFreeMeetingUpgradeToGiftFreeTrialStart () {
      if (_onFreeMeetingUpgradeToGiftFreeTrialStart) {
        _onFreeMeetingUpgradeToGiftFreeTrialStart()
      }
    }

    /**
      Callback function of ending upgrade the free meeting by the gift link.
      @event onFreeMeetingUpgradeToGiftFreeTrialStop
    */
    function onFreeMeetingUpgradeToGiftFreeTrialStop () {
      if (_onFreeMeetingUpgradeToGiftFreeTrialStop) {
        _onFreeMeetingUpgradeToGiftFreeTrialStop()
      }
    }

    /**
      Callback function of free meting upgrades successfully.
      @event onFreeMeetingUpgradeToProMeeting
    */
    function onFreeMeetingUpgradeToProMeeting () {
      if (_onFreeMeetingUpgradeToProMeeting) {
        _onFreeMeetingUpgradeToProMeeting()
      }
    }

    if (_addon) {
      _addon.SetFreeMeetingNeedToUpgradeCB(onFreeMeetingNeedToUpgrade);
      _addon.SetFreeMeetingUpgradeToGiftFreeTrialStartCB(onFreeMeetingUpgradeToGiftFreeTrialStart);
      _addon.SetFreeMeetingUpgradeToGiftFreeTrialStopCB(onFreeMeetingUpgradeToGiftFreeTrialStop);
      _addon.SetFreeMeetingUpgradeToProMeetingCB(onFreeMeetingUpgradeToProMeeting);
    }

    return {
      /**
       * Set Free Meeting Need T oUpgrade Callback
       * @method MeetingConfig_SetFreeMeetingNeedToUpgradeCB
       * @param {Function} MeetingConfig_SetFreeMeetingNeedToUpgradeCB
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingNeedToUpgradeCB: function (onFreeMeetingNeedToUpgrade) {
        if (_addon && onFreeMeetingNeedToUpgrade && onFreeMeetingNeedToUpgrade instanceof Function) {
          _onFreeMeetingNeedToUpgrade = onFreeMeetingNeedToUpgrade;
          return true;
        }
        return false;
      },
      /**
       * Set Free Meeting Upgrade To Gift Free TrialStop Callback
       * @method MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStartCB
       * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStart
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStartCB: function (onFreeMeetingUpgradeToGiftFreeTrialStart) {
        if (_addon && onFreeMeetingUpgradeToGiftFreeTrialStart && onFreeMeetingUpgradeToGiftFreeTrialStart instanceof Function) {
          _onFreeMeetingUpgradeToGiftFreeTrialStart = onFreeMeetingUpgradeToGiftFreeTrialStart;
          return true;
        }
        return false;
      },
      /**
       * Set Free Meeting Upgrade To Gift Free TrialStop Callback
       * @method MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStopCB
       * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStop
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStopCB: function (onFreeMeetingUpgradeToGiftFreeTrialStop) {
        if (_addon && onFreeMeetingUpgradeToGiftFreeTrialStop && onFreeMeetingUpgradeToGiftFreeTrialStop instanceof Function) {
          _onFreeMeetingUpgradeToGiftFreeTrialStop = onFreeMeetingUpgradeToGiftFreeTrialStop;
          return true;
        }
        return false;
      },
      /**
       * Set Free Meeting Upgrade To ProMeeting Callback
       * @method MeetingConfig_SetFreeMeetingUpgradeToProMeetingCB
       * @param {Function} onFreeMeetingUpgradeToProMeeting
       * @return {Boolean}
       */
      MeetingConfig_SetFreeMeetingUpgradeToProMeetingCB: function (onFreeMeetingUpgradeToProMeeting) {
        if (_addon && onFreeMeetingUpgradeToProMeeting && onFreeMeetingUpgradeToProMeeting instanceof Function) {
          _onFreeMeetingUpgradeToProMeeting = onFreeMeetingUpgradeToProMeeting;
          return true;
        }
        return false;
      },
      /**
       * Get Reminder Type
       * @method MeetingConfig_GetReminderType
       * @return {Number} Defined in: <a href="../files/lib_settings.js.html#l36">ZoomSDKError</a>
       */
      MeetingConfig_GetReminderType: function () {
        if (_addon) {
          return _addon.GetReminderType();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Upgrade the meeting if the notification is the FreeMeetingEndingReminder_Can_UpgradeMeeting_ToPro_Once.
       * The SDK will destroy this object instance after calling this function.
       * @method MeetingConfig_UpgradeMeeting
       * @return {Number} Defined in: <a href="../files/lib_settings.js.html#l36">ZoomSDKError</a>
       */
      MeetingConfig_UpgradeMeeting: function () {
        if (_addon) {
          return _addon.UpgradeMeeting();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Upgrade the account if the notification is the FreeMeetingEndingReminder_Can_UpgradeAccount.
       * The SDK will destroy this object instance after calling this function.
       * @method MeetingConfig_UpgradeAccount
       * @return {Number} Defined in: <a href="../files/lib_settings.js.html#l36">ZoomSDKError</a>
       */
      MeetingConfig_UpgradeAccount: function () {
        if (_addon) {
          return _addon.UpgradeAccount();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Cancel Update
       * @method MeetingConfig_CancelUpdate
       * @return {Number} Defined in: <a href="../files/lib_settings.js.html#l36">ZoomSDKError</a>
       */
      MeetingConfig_CancelUpdate: function () {
        if (_addon) {
          return _addon.CancelUpdate();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      }
    }
  };
  return {
    getInstance: function (opts) {
      if (!instance) {
        instance = init(opts);
      }
      return instance;
    }
  }
 })();

module.exports = {
  ZoomPaymentReminder: ZoomPaymentReminder
}
