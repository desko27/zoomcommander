const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomH323 = (function () {
  var instance;

  /**
   * Zoom H323
   * @module zoom_h323
   * @param {Function} calloutstatuscb call out status callback
   * @return {ZoomH323}
   */
  function init(opts) {

    let clientOpts = opts || {};
    // Private methods and variables
    let _addon = clientOpts.addon.GetMeetingH323Ctrl() || null;
    let _calloutstatuscb = clientOpts.calloutstatuscb || null;

    /**
      onH323CalloutStatusNotify
      @event onH323CalloutStatusNotify
      @param {String} status
    */
    function onH323CalloutStatusNotify(status) {
      if (null != _calloutstatuscb)
      _calloutstatuscb(status)
    }

    if (_addon) {
      _addon.SetH323CallOutStatusCB(onH323CalloutStatusNotify)
    }

    return {
      /**
       * Set the callback when the calling status of H.323 device changes.
       * @method H323_SetH323CallOutStatusCB
       * @param {Function} calloutstatuscb
       * @return {Boolean}
       */
      H323_SetH323CallOutStatusCB: function (calloutstatuscb) {
        if (addon && calloutstatuscb && calloutstatuscb instanceof Function) {
          _calloutstatuscb = calloutstatuscb
          return true
        }
        return false
      },
      /**
      * Call out with the assigned H.323 device.
      * If the function succeed, onH323CalloutStatusNotify() will be triggered once the callout status of H.323 device changes.
      * @method H323_CallOutH323
      * @param {String} deviceName
      * @param {String} deviceIP
      * @param {String} deviceE164Num
      * @param {Number} type
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      H323_CallOutH323: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let deviceName = clientOpts.deviceName || '';
          let deviceIP = clientOpts.deviceIP || '';
          let deviceE164num = clientOpts.deviceE164num || '';
          let type = clientOpts.type || 0;
          try {
            let CallOutH323Params = new messages.CallOutH323Params();
            CallOutH323Params.setDevicename(deviceName);
            CallOutH323Params.setDeviceip(deviceIP);
            CallOutH323Params.setDevicee164num(deviceE164num);
            CallOutH323Params.setH323devicetype(type);
            let bytes = CallOutH323Params.serializeBinary();
            return _addon.CallOutH323(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Cancel current outgoing call.
       * @method H323_CancelCallOutH323
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
      H323_CancelCallOutH323: function () {
        if (_addon) {
          return _addon.CancelCallOutH323();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the list of H.323 call-in number supported by the current meeting.
       * @method H323_GetH323Address
       * @return {Array} If the function succeed, the return value is the pointer to the list of the call-in number. Otherwise failed, the return value is NULL.
       */
      H323_GetH323Address: function (){
        if (_addon) {
          return _addon.GetH323Address();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the H.323 password for the current meeting.
       * @method H323_GetH323Password
       * @return {String} If the function succeed, the return value is the H.323 meeting connect password
       */
      H323_GetH323Password: function () {
        if (_addon)
          return _addon.GetH323Password();
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
       * Get the list of the call-out devices supported by the current meeting.
       * The list will be cleared each time the function is called.
       * @method H323_GetCalloutH323DeviceList
       * @return {Array} If the function succeed, the return value is the pointer to the list of devices.
	        Otherwise failed, the return value is an empty list
       */
      H323_GetCalloutH323DeviceList: function () {
        if (_addon) {
          return _addon.GetCalloutH323DviceList()
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
  ZoomH323: ZoomH323
}
