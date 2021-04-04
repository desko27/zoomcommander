const { ZoomAuthResult, ZoomSDKError } = require('./settings.js');
const ZOOMDIRECTSHAREMOD = require('./zoom_direct_share_helper.js');
const messages = require('./electron_sdk_pb.js');

const ZoomAuth = (function () {
  let instance;

  /**
   * Zoom SDK Authentication Service Init
   * @module zoom_auth
   * @param {Function} authcb Authentication result callback.
   * @param {Function} logincb Callback of login result.
   * @param {Function} logoutcb Logout result callback.
   * @param {Function} onZoomIdentityExpired Zoom identity has expired, please re-login or generate a new zoom access token via REST Api.
   * @param {Function} onZoomAuthIdentityExpired Zoom authentication identity will be expired in 10 minutes, please re-auth.
   * @param {Function} onLoginReturnWithReason Callback of login result with fail reason.
   * @return {ZoomAuth}
   */
  function init(opts) {
    let clientOpts = opts || {};
    let _addon = clientOpts.addon.GetAuthObj() || null;
    let _authcb = clientOpts.authcb || null;
    let _logincb = clientOpts.logincb || null;
    let _logoutcb = clientOpts.logoutcb || null;
    let _onZoomIdentityExpired = clientOpts.onZoomIdentityExpired || null;
    let _onZoomAuthIdentityExpired = clientOpts.onZoomAuthIdentityExpired || null;
    let _onLoginReturnWithReason = clientOpts.onLoginReturnWithReason || null;
    let _isSDKAuthentication = false;

    /**
      Authentication result callback.
      @event onAuthenticationReturn
      @param {Number} Authentication Defined in: {@link ZoomAuthResult}
    */
    function onAuthenticationReturn(authResult) {
      if (ZoomAuthResult.AUTHRET_SUCCESS == authResult) {
        _isSDKAuthentication = true;
      } else {
        _isSDKAuthentication = false;
      }
      if (_authcb)
        _authcb(authResult);
    }

    /**
      Callback of login result.
      @event logincb
      @param {Number} status Defined in: {@link ZoomAuthResult}
    */
    function logincb(status) {
      if (_logincb)
        _logincb(status)
    }

    /**
      Logout result callback.
      @event logoutcb
    */
    function logoutcb() {
      if (_logoutcb)
        _logoutcb();
    }

    /**
      Zoom identity has expired, please re-login or generate a new zoom access token via REST Api.
      @event onZoomIdentityExpired
    */
    function onZoomIdentityExpired() {
      if (_onZoomIdentityExpired) {
        _onZoomIdentityExpired()
      }
    }

    /**
      Zoom authentication identity will be expired in 10 minutes, please re-auth.
      @event onZoomAuthIdentityExpired
    */
    function onZoomAuthIdentityExpired() {
      if (_onZoomAuthIdentityExpired) {
        _onZoomAuthIdentityExpired()
      }
    }

    /**
      Callback of login result with fail reason.
      @event onLoginReturnWithReason
      @param {Number} loginStatus Defined in: {@link ZoomAuthResult}
      @param {Number} loginFailReason Login fail reason. Valid when the ret is LOGIN_FAILED. Otherwise LoginFail_None. Defined in: {@link LoginFailReason}
    */
    function onLoginReturnWithReason(loginStatus, loginFailReason) {
      if (_onLoginReturnWithReason) {
        _onLoginReturnWithReason(loginStatus, loginFailReason)
      }
    }

    if (_addon) {
      _addon.SetOnAuthReturnCB(onAuthenticationReturn);
      _addon.SetLoginCB(logincb);
      _addon.SetLogoutCB(logoutcb);
      _addon.SetOnZoomIdentityExpiredCB(onZoomIdentityExpired);
      _addon.SetOnZoomAuthIdentityExpiredCB(onZoomAuthIdentityExpired);
      _addon.SetLoginReturnWithReasonCB(onLoginReturnWithReason);
    }

    return {
      // Public methods and variables
      /**
       * Set auth callback function.
       * @method SetOnAuthReturnCB
       * @param {Function} authcb
       * @return {Boolean} true or false
       */
      SetOnAuthReturnCB: function (authcb) {
        if (addon && authcb && authcb instanceof Function) {
          _authcb = authcb
          return true
        }
        return false
      },
      /**
       * Set login callback function.
       * @method SetLoginCB
       * @param {Function} logincb
       * @return {Boolean} true or false
       */
      SetLoginCB: function (logincb) {
        if (addon && logincb && logincb instanceof Function) {
          _logincb = logincb
          return true
        }
        return false
      },
      /**
       * Set logout callback function.
       * @method SetLogoutCB
       * @param {Function} logoutcb
       * @return {Boolean} true or false
       */
      SetLogoutCB: function (logoutcb) {
        if (addon && logoutcb && logoutcb instanceof Function) {
          _logoutcb = logoutcb
          return true
        }
        return false
      },
      /**
       * Set zoom identity expired callback function.
       * @method SetOnZoomIdentityExpiredCB
       * @param {Function} onZoomIdentityExpired
       * @return {Boolean} true or false
       */
      SetOnZoomIdentityExpiredCB: function (onZoomIdentityExpired) {
        if (addon && onZoomIdentityExpired && onZoomIdentityExpired instanceof Function) {
          _onZoomIdentityExpired = onZoomIdentityExpired
          return true
        }
        return false
      },
      /**
       * Set On Zoom Auth Identity Expired Callback
       * @method SetOnZoomAuthIdentityExpiredCB
       * @param {Function} onZoomAuthIdentityExpired
       * @return {Boolean} true or false
       */
      SetOnZoomAuthIdentityExpiredCB: function (onZoomAuthIdentityExpired) {
        if (addon && onZoomAuthIdentityExpired && onZoomAuthIdentityExpired instanceof Function) {
          _onZoomAuthIdentityExpired = onZoomAuthIdentityExpired
          return true
        }
        return false
      },
      /**
       * Set Login Return With Reason Callback
       * @method SetLoginReturnWithReasonCB
       * @param {Function} onLoginReturnWithReason
       * @return {Boolean} true or false
       */
      SetLoginReturnWithReasonCB: function (onLoginReturnWithReason) {
        if (addon && onLoginReturnWithReason && onLoginReturnWithReason instanceof Function) {
          _onLoginReturnWithReason = onLoginReturnWithReason
          return true
        }
        return false
      },
      /**
       * SDK Auth
       * @method SDKAuth
       * @param {String} appkey
       * @param {String} appsecret
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      SDKAuth: function (appkey, appsecret){
        if (_addon){
          try {
            let AuthParams = new messages.AuthParams()
            AuthParams.setKey(appkey)
            AuthParams.setSecret(appsecret)
            let bytes = AuthParams.serializeBinary()
            return _addon.Auth(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Account Login.
       * You need to call this api after onAuthenticationReturn() return SDKERR_SUCCESS.
       * @method Login
       * @param {String} username
       * @param {String} psw
       * @param {Boolean} rememberme
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      Login: function (username, psw, rememberme) {
        if (_isSDKAuthentication && _addon) {
          try {
            let LoginParams = new messages.LoginParams()
            LoginParams.setUsername(username)
            LoginParams.setPsw(psw)
            LoginParams.setRememberme(rememberme)
            let bytes = LoginParams.serializeBinary()
            return _addon.Login(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return _isSDKAuthentication ? ZoomSDKError.SDKERR_UNAUTHENTICATION : ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Login With SSO Token
       * @method LoginWithSSOToken
       * @param {String} ssotoken
       * @param {String} rememberme
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      LoginWithSSOToken: function (ssotoken, rememberme) {
        if (_isSDKAuthentication && _addon) {
          try {
            let LoginWithSSOTokenParams = new messages.LoginWithSSOTokenParams()
            LoginWithSSOTokenParams.setSsotoken(ssotoken)
            LoginWithSSOTokenParams.setRememberme(rememberme || false)
            let bytes = LoginWithSSOTokenParams.serializeBinary()
            return _addon.LoginWithSSOToken(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return _isSDKAuthentication ? ZoomSDKError.SDKERR_UNAUTHENTICATION : ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Account Logout
       * @method Logout
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      Logout: function () {
        if (_isSDKAuthentication && _addon)
          return _addon.Logout();
        return _isSDKAuthentication ? ZoomSDKError.SDKERR_UNAUTHENTICATION : ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Auth With Jwt Token
       * @method AuthWithJwtToken
       * @param {String} sdk_context
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
      AuthWithJwtToken: function (sdk_context) {
        if (_addon) {
          try {
            let AuthWithJwtTokenParams = new messages.AuthWithJwtTokenParams()
            AuthWithJwtTokenParams.setSdkjwttoken(sdk_context)
            let bytes = AuthWithJwtTokenParams.serializeBinary()
            return _addon.AuthWithJwtToken(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return _isSDKAuthentication ? ZoomSDKError.SDKERR_UNAUTHENTICATION : ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get Authentication Status
      * @method GetAuthResult
      * @return {Number} Defined in: {@link ZoomAuthResult}
      */
      GetAuthResult: function () {
        return _addon.GetAuthResult();
      },
      /**
      * Get Login Status
      * @method GetLoginStatus
      * @return {Number} Defined in: {@link ZoomAuthResult}
      */
      GetLoginStatus: function () {
        return _addon.GetLoginStatus();
      },
      GetDirectShare: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          clientOpts.addon = _addon;
          return ZOOMDIRECTSHAREMOD.ZoomDirectShareHelper.getInstance(clientOpts);
        }
        return _isSDKAuthentication ? ZoomSDKError.SDKERR_UNAUTHENTICATION : ZoomSDKError.SDKERR_UNINITIALIZE;
      }
    }
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
  ZoomAuth: ZoomAuth
}
