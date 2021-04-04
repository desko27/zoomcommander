const { ZoomSDKError } = require('./settings.js');

var ZoomSettingStatisticCtrl = (function () {
  var instance;
  /**
   * Zoom Setting Statistic Ctrl
   * @module zoom_setting_statistic_ctrl
   * @return {ZoomSettingStatisticCtrl}
   */
  function init(opts) {
    let clientOpts = opts || {};
    // Private methods and variables
    let _addon = clientOpts.addon.GetSettingStatisticCtrl() || null;

    return {
      // Public methods and variables
      /** 
      * Query overall statistic information.
      * @method Setting_QueryOverallStatisticInfo
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_QueryOverallStatisticInfo: function () {
        if (_addon){
          return _addon.QueryOverallStatisticInfo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Query audio statistic information.
      * @method Setting_QueryAudioStatisticInfo
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
      */
      Setting_QueryAudioStatisticInfo: function () {
        if (_addon){
          return _addon.QueryAudioStatisticInfo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Query video statistic information.
      * @method Setting_QueryVideoStatisticInfo
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_QueryVideoStatisticInfo: function () {
        if (_addon){
          return _addon.QueryVideoStatisticInfo();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * Query share statistic information.
      * @method Setting_QueryShareStatisticInfo
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_QueryShareStatisticInfo: function () {
        if (_addon){
          return _addon.QueryShareStatisticInfo();
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
  ZoomSettingStatisticCtrl: ZoomSettingStatisticCtrl
}
