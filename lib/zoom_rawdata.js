const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomRawData = (function () {
  let instance;
  /**
   * Zoom Raw Data
   * @module zoom_rawdata
   * @param {Function} onRawDataStatusChanged onRawDataStatusChanged callback
   * @return {ZoomRawData}
   */
  function init(opts) {
    
    let clientOpts = opts || {};

    // Private methods and variables
    let _addon = clientOpts.addon.GetRawdataAPIWrap() || null;
    let _onRawDataStatusChanged = clientOpts.onRawDataStatusChanged || null;

    /**
      onRawDataStatusChanged
      @event onRawDataStatusChanged
      @param {Number} status
    */
    function onRawDataStatusChanged(status, recv_handle) {
      if (_onRawDataStatusChanged) {
        _onRawDataStatusChanged(status, recv_handle)
      }
    }

    if (_addon) {
      _addon.SetonRawDataStatusChangedCB(onRawDataStatusChanged);
    }

    return {
      /** 
      * SetonRawDataStatusChangedCB
      * @method SetonRawDataStatusChangedCB
      * @param {Function} onRawDataStatusChanged
      * @return {Boolean}
      */
      SetonRawDataStatusChangedCB: function (onRawDataStatusChanged) {
        if (_addon && onRawDataStatusChanged && onRawDataStatusChanged instanceof Function) {
          _onRawDataStatusChanged = onRawDataStatusChanged;
          return true;
        }
        return false;
      },
      /** 
      * HasRawDataLicense
      * @method HasRawDataLicense
      * @return {Boolean}
      */
      HasRawDataLicense: function () {
        if (_addon) {
          return _addon.HasRawDataLicense();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * CreateRenderer
      * @method CreateRenderer
      * @param {Number} recv_handle
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      CreateRenderer: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let recv_handle = clientOpts.recv_handle;
          try {
            let CreateRendererParams = new messages.CreateRendererParams();
            CreateRendererParams.setRecvhandle(Number(recv_handle));
            let bytes = CreateRendererParams.serializeBinary();
            return _addon.CreateRenderer(bytes);            
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * DestroyRenderer
      * @method DestroyRenderer
      * @param {Number} recv_handle
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      DestroyRenderer: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let recv_handle = clientOpts.recv_handle;
          try {
            let DestroyRendererParams = new messages.DestroyRendererParams();
            DestroyRendererParams.setRecvhandle(Number(recv_handle));
            let bytes = DestroyRendererParams.serializeBinary();
            return _addon.DestroyRenderer(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * Show the data of the specified user through normal render mode.
      * @method Subscribe
      * @param {Number} userid Specify the user ID.
      * @param {Number} rawdataType
      * @param {Number} recv_handle
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      Subscribe: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let userid = clientOpts.userid;
          let rawdataType = clientOpts.rawdataType;
          let recv_handle = clientOpts.recv_handle;
          try {
            let SubscribeParams = new messages.SubscribeParams();
            SubscribeParams.setUserid(Number(userid));
            SubscribeParams.setRawdatatype(Number(rawdataType));
            SubscribeParams.setRecvhandle(Number(recv_handle));
            let bytes = SubscribeParams.serializeBinary();
            return _addon.Subscribe(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * UnSubscribe
      * @method UnSubscribe
      * @param {Number} recv_handle
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      UnSubscribe: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let recv_handle = clientOpts.recv_handle;
          try {
            let UnSubscribeParams = new messages.UnSubscribeParams();
            UnSubscribeParams.setRecvhandle(Number(recv_handle));
            let bytes = UnSubscribeParams.serializeBinary();
            return _addon.UnSubscribe(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /** 
      * SetRawDataResolution
      * @method SetRawDataResolution
      * @param {Number} resolution
      * @param {Number} recv_handle
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      SetRawDataResolution: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let resolution = clientOpts.resolution;
          let recv_handle = clientOpts.recv_handle;
          try {
            let SetRawDataResolutionParams = new messages.SetRawDataResolutionParams();
            SetRawDataResolutionParams.setResolution(Number(resolution));
            SetRawDataResolutionParams.setRecvhandle(Number(recv_handle));
            let bytes = SetRawDataResolutionParams.serializeBinary();
            return _addon.SetRawDataResolution(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * SetRawDataResolution
      * @method GetResolution
      * @param {Number} recv_handle
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      GetResolution: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let recv_handle = clientOpts.recv_handle;
          try {
            let GetResolutionParams = new messages.GetResolutionParams();
            GetResolutionParams.setRecvhandle(Number(recv_handle));
            let bytes = GetResolutionParams.serializeBinary();
            return _addon.GetResolution(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * GetRawDataType
      * @method GetRawDataType
      * @param {Number} recv_handle
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      GetRawDataType: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let recv_handle = clientOpts.recv_handle;
          try {
            let GetRawDataTypeParams = new messages.GetRawDataTypeParams();
            GetRawDataTypeParams.setRecvhandle(Number(recv_handle));
            let bytes = GetRawDataTypeParams.serializeBinary();
            return _addon.GetRawDataType(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * Get the user ID.
      * @method GetUserId
      * @param {Number} recv_handle
      * @return {Number} The user ID.
      */
      GetUserId: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let recv_handle = clientOpts.recv_handle;
          try {
            let GetUserIdParams = new messages.GetUserIdParams();
            GetUserIdParams.setRecvhandle(Number(recv_handle));
            let bytes = GetUserIdParams.serializeBinary();
            return _addon.GetUserId(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * InitAudioRawDataHelper
      * @method InitAudioRawDataHelper
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      InitAudioRawDataHelper: function () {
        if (_addon) {
          return _addon.InitAudioRawDataHelper();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * SubscribeAudioRawdata
      * @method SubscribeAudioRawdata
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      SubscribeAudioRawdata: function () {
        if (_addon) {
          return _addon.SubscribeAudioRawdata();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      },
      /** 
      * UnSubscribeAudioRawdata
      * @method UnSubscribeAudioRawdata
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
      UnSubscribeAudioRawdata: function () {
        if (_addon) {
          return _addon.UnSubscribeAudioRawdata();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE
      }
    };
};
  return {
    getInstance: function (opts) {
      if (!instance) {
        instance = init(opts)
      }
      return instance
    }
  };
})();

module.exports = {
  ZoomRawData: ZoomRawData
}