const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomCustomizedResource = (function () {
  var instance;
  /**
   * Zoom Customized Resource
   * @module zoom_customized_resource
   * @return {ZoomCustomizedResource}
   */
  function init(opts) { 
    var clientOpts = opts || {};

    // Private methods and variables
    var _addon = clientOpts.addon.GetCustomizedResourceObj() || null;

    return {
      /**
      * Add the custom photo files, currently, support PNG and SVG formats. 
      * You must call the function first before calling InitSDK(), or no, it won't work.
      * @method Resource_AddCustomizedPictureResource
      * @param {String} strPNGID Resource ID corresponding to the custom resource.
      * @param {String} strPNGPath The location of the customized resource file must be an absolute path and include the file name with suffix.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Resource_AddCustomizedPictureResource: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let strPNGID = clientOpts.strPNGID;
          let strPNGPath = clientOpts.strPNGPath;
          try {
            let AddCustomizedPictureResourceParams = new messages.AddCustomizedPictureResourceParams();
            AddCustomizedPictureResourceParams.setStrpngid(strPNGID);
            AddCustomizedPictureResourceParams.setStrpngpath(strPNGPath);
            let bytes = AddCustomizedPictureResourceParams.serializeBinary();
            return _addon.AddCustomizedPictureResource(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Use the custom string to replace the specified string item.
      * If customizedString is NULL or is not NULL but with length zero(0), the return value is SDKERR_INVALID_PARAMETER.
	    * You must call the function first before calling InitSDK(), or no, it won't work.
      * @method Resource_AddCustomizedStringResource
      * @param {String} CustomizedStringType Specify the string item type. Defined in: {@link SDKCustomizedStringType}
      * @param {String} strCustomizedString Specify the custom string.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Resource_AddCustomizedStringResource: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let CustomizedStringType = clientOpts.CustomizedStringType;
          let strCustomizedString = clientOpts.strCustomizedString;
          try {
            let AddCustomizedStringResourceParams = new messages.AddCustomizedStringResourceParams();
            AddCustomizedStringResourceParams.setCustomizedstringtype(CustomizedStringType);
            AddCustomizedStringResourceParams.setStrcustomizedstring(strCustomizedString);
            let bytes = AddCustomizedStringResourceParams.serializeBinary();
            return _addon.AddCustomizedStringResource(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Use the custom URL to replace the specified URL.
      * If customizedUrl is NULL or is not NULL but with length zero(0), the return value is SDKERR_INVALID_PARAMETER.
	    * You must call the function first before calling InitSDK(), or no, it won't work.
      * @method Resource_AddCustomizedURLResource
      * @param {String} CustomizedURLType Specify the URL type. Defined in: {@link SDKCustomizedURLType}
      * @param {String} strCustomizeURL Specify the custom URL.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Resource_AddCustomizedURLResource: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let CustomizedURLType = clientOpts.CustomizedURLType;
          let strCustomizeURL = clientOpts.strCustomizeURL;
          try {
            let AddCustomizedURLResourceParams = new messages.AddCustomizedURLResourceParams();
            AddCustomizedURLResourceParams.setCustomizedurltype(CustomizedURLType);
            AddCustomizedURLResourceParams.setStrcustomizedurl(strCustomizeURL);
            let bytes = AddCustomizedURLResourceParams.serializeBinary();
            return _addon.AddCustomizedURLResource(bytes);
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
  ZoomCustomizedResource: ZoomCustomizedResource
}