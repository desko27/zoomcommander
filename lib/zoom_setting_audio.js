
const { ZoomSDKError } = require('./settings.js');
const messages = require('./electron_sdk_pb.js');

var ZoomAudioSetting = (function () {
  let instance;
   /**
   * Zoom Audio Setting
   * @module zoom_setting_audio
   * @param {Function} onComputerMicDeviceChanged Callback event if the SDK detects that the computer mic devices have been changed.
   * @param {Function} onComputerSpeakerDeviceChanged Callback event if the SDK detects that the computer speaker devices have been changed.
   * @param {Function} onDefaultMicDeviceChanged Notify the user that a microphone device is selected.
   * @param {Function} onDefaultSpeakerDeviceChanged Notify the user that a speaker device is selected.
   * @return {ZoomAudioSetting}
   */
  function init(opts) {
    let clientOpts = opts || {};

    // Private methods and variables
    let _addon = clientOpts.addon.GetSettingAudioCtrl() || null;
    let _onComputerMicDeviceChanged = clientOpts.onComputerMicDeviceChanged || null;
    let _onComputerSpeakerDeviceChanged = clientOpts.onComputerSpeakerDeviceChanged || null;
    let _onDefaultMicDeviceChanged = clientOpts.onDefaultMicDeviceChanged || null;
    let _onDefaultSpeakerDeviceChanged = clientOpts.onDefaultSpeakerDeviceChanged || null;

    /**
      Callback event if the SDK detects that the computer mic devices have been changed.
      @event onComputerMicDeviceChanged
      @param {Array} newMicList The new list of all mic devices plugged into the computer.
    */
    function onComputerMicDeviceChanged(newMicList) {
      if (_onComputerMicDeviceChanged) {
        _onComputerMicDeviceChanged(newMicList)
      }
    }

    /**
      Callback event if the SDK detects that the computer speaker devices have been changed.
      @event onComputerSpeakerDeviceChanged
      @param {Array} newSpeakerList The new list of all speaker devices plugged into the computer.
    */
    function onComputerSpeakerDeviceChanged(newSpeakerList) {
      if (_onComputerSpeakerDeviceChanged) {
        _onComputerSpeakerDeviceChanged(newSpeakerList)
      }
    }

    /**
      Notify the user that a microphone device is selected.
      @event onDefaultMicDeviceChanged
      @param {String} deviceId Specify a device to be selected.
      @param {String} deviceName Specify the device name assigned by deviceId.
    */
    function onDefaultMicDeviceChanged(deviceId, deviceName) {
      if (_onDefaultMicDeviceChanged) {
        _onDefaultMicDeviceChanged(deviceId, deviceName)
      }
    }

    /**
      Notify the user that a speaker device is selected.
      @event onDefaultSpeakerDeviceChanged
      @param {String} deviceId Specify a device to be selected.
      @param {String} deviceName Specify the device name assigned by deviceId.
    */
    function onDefaultSpeakerDeviceChanged(deviceId, deviceName) {
      if (_onDefaultSpeakerDeviceChanged) {
        _onDefaultSpeakerDeviceChanged(deviceId, deviceName)
      }
    }

    if (_addon) {
      _addon.SetComputerMicDeviceChangedCB(onComputerMicDeviceChanged);
      _addon.SetComputerSpeakerDeviceChangedCB(onComputerSpeakerDeviceChanged);
      _addon.SetDefaultMicDeviceChangedCB(onDefaultMicDeviceChanged);
      _addon.SetDefaultSpeakerDeviceChangedCB(onDefaultSpeakerDeviceChanged);
    }

    let micObj = {};
    let speakerObj = {};

    return {
      /**
      * Set Computer Mic Device Changed Callback
      * @method Setting_SetComputerMicDeviceChangedCB
      * @param {Function} onComputerMicDeviceChanged
      * @return {Boolean}
      */
      Setting_SetComputerMicDeviceChangedCB: function (onComputerMicDeviceChanged) {
        if (_addon && onComputerMicDeviceChanged && onComputerMicDeviceChanged instanceof Function) {
          _onComputerMicDeviceChanged = onComputerMicDeviceChanged;
          return true;
        }
        return false;
      },
      /**
      * Set Computer Speaker Device Changed Callback
      * @method Setting_SetComputerSpeakerDeviceChangedCB
      * @param {Function} onComputerSpeakerDeviceChanged
      * @return {Boolean}
      */
      Setting_SetComputerSpeakerDeviceChangedCB: function (onComputerSpeakerDeviceChanged) {
        if (_addon && onComputerSpeakerDeviceChanged && onComputerSpeakerDeviceChanged instanceof Function) {
          _onComputerSpeakerDeviceChanged = onComputerSpeakerDeviceChanged;
          return true;
        }
        return false;
      },
      /**
      * Set Default Mic Device Changed Callback
      * @method Setting_SetDefaultMicDeviceChangedCB
      * @param {Function} onDefaultMicDeviceChanged
      * @return {Boolean}
      */
      Setting_SetDefaultMicDeviceChangedCB: function (onDefaultMicDeviceChanged) {
        if (_addon && onDefaultMicDeviceChanged && onDefaultMicDeviceChanged instanceof Function) {
          _onDefaultMicDeviceChanged = onDefaultMicDeviceChanged;
          return true;
        }
        return false;
      },
      /**
      * Set Default Speaker Device Changed Callback
      * @method Setting_SetDefaultSpeakerDeviceChangedCB
      * @param {Function} onDefaultSpeakerDeviceChanged
      * @return {Boolean}
      */
      Setting_SetDefaultSpeakerDeviceChangedCB: function (onDefaultSpeakerDeviceChanged) {
        if (_addon && onDefaultSpeakerDeviceChanged && onDefaultSpeakerDeviceChanged instanceof Functio) {
          _onDefaultSpeakerDeviceChanged = onDefaultSpeakerDeviceChanged;
          return true;
        }
        return false;
      },
    	/**
       * Select mic device.
       * @method Setting_SelectMic
		   * @param {String} deviceId Specify the device to be selected.
       * @param {String} deviceName Specify the device name assigned by deviceId.
		   * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
		   */
      Setting_SelectMic: function (opts) {
      	if (_addon) {
      		let clientOpts = opts || {};
      		let deviceId = clientOpts.deviceId || micObj.deviceId;
          let deviceName = clientOpts.deviceName || micObj.deviceName;
          try {
            let SelectMicParams = new messages.SelectMicParams();
            SelectMicParams.setDeviceid(deviceId);
            SelectMicParams.setDevicename(deviceName);
            let bytes = SelectMicParams.serializeBinary();
            return _addon.SelectMic(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
      	}
      	return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the mic device list.
      * @method Setting_GetMicList
      * @return {Array} If the function succeed, the return value is the camera device list. Otherwise failed, returns NULL.
      */
      Setting_GetMicList: function () {
      	if (_addon) {
          let micList = _addon.GetMicList();
          micList.forEach(item => {
            micObj.deviceName = item.deviceName
            micObj.deviceId = item.deviceId
            micObj.isSelected = item.isSelected
          })
          return micList;
      	}
      	return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
    	/**
      * Select speaker device.
      * @method Setting_SelectSpeaker
      * @param {String} deviceId Specify the device to be selected.
      * @param {String} deviceName Specify the device the device name assigned by deviceId.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_SelectSpeaker: function (opts) {
      	if (_addon) {
      		let clientOpts = opts || {}
      		let deviceId = clientOpts.deviceId || speakerObj.deviceId;
          let deviceName = clientOpts.deviceName || speakerObj.deviceName;
          try {
            let SelectSpeakerParams = new messages.SelectSpeakerParams();
            SelectSpeakerParams.setDeviceid(deviceId);
            SelectSpeakerParams.setDevicename(deviceName);
            let bytes = SelectSpeakerParams.serializeBinary();
            return _addon.SelectSpeaker(bytes)
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
      	}
      	return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the speaker device list.
      * @method Setting_GetSpeakerList
      * @return {Array} If the function succeed, the return value is the camera device list. Otherwise failed, returns NULL.
      */
      Setting_GetSpeakerList: function () {
      	if (_addon) {
          let speakerList = _addon.GetSpeakerList();
          speakerList.forEach(function (item, index) {
            speakerObj.deviceName = item.deviceName
            speakerObj.deviceId = item.deviceId
            speakerObj.isSelected = item.isSelected
          });
          return speakerList;
      	}
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the flag to enable/disable the audio automatically when join meeting.
      * @method Checking_IsAutoJoinAudioEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Checking_IsAutoJoinAudioEnabled: function () {
        if (_addon) {
          return _addon.IsAutoJoinAudioEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the flag to enable/disable to auto-adjust the mic volume.
      * @method Checking_IsAutoAdjustMicEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Checking_IsAutoAdjustMicEnabled: function () {
        if (_addon) {
          return _addon.IsAutoAdjustMicEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable the audio automatically when join meeting.
      * @method Setting_EnableAutoJoinAudio
      * @param {Boolean} zn_bEnable TRUE indicates to enable the audio automatically when join meeting.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_EnableAutoJoinAudio: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_bEnable = clientOpts.zn_bEnable;
          try {
            let EnableAutoJoinAudioParams = new messages.EnableAutoJoinAudioParams();
            EnableAutoJoinAudioParams.setBenable(zn_bEnable);
            let bytes = EnableAutoJoinAudioParams.serializeBinary();
            return _addon.EnableAutoJoinAudio(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable the auto-adjust mic volume.
      * @method Setting_EnableAutoAdjustMic
      * @param {Boolean} zn_bEnable TRUE indicates to enable to auto-adjust the mic volume.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_EnableAutoAdjustMic: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let zn_bEnable = clientOpts.zn_bEnable;
          try {
            let EnableAutoAdjustMicParams = new messages.EnableAutoAdjustMicParams();
            EnableAutoAdjustMicParams.setBenable(zn_bEnable);
            let bytes = EnableAutoAdjustMicParams.serializeBinary();
            return _addon.EnableAutoAdjustMic(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable the stereo audio.
      * This function is valid only if mic original input is enabled, otherwise invalid.
      * @method Setting_EnableStereoAudio
      * @param {Boolean} bEnable TRUE indicates to enable the stereo audio.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_EnableStereoAudio: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableStereoAudioParams = new messages.EnableStereoAudioParams();
            EnableStereoAudioParams.setBenable(bEnable);
            let bytes = EnableStereoAudioParams.serializeBinary();
            return _addon.EnableStereoAudio(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the flag to enable/disable the stereo audio.
      * @method Setting_IsStereoAudioEnable
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsStereoAudioEnable: function () {
        if (_addon) {
          return _addon.IsStereoAudioEnable();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable the original input of mic.
      * @method Setting_EnableMicOriginalInput
      * @param {Boolean} bEnable TRUE indicates to enable the original input of mic.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_EnableMicOriginalInput: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableMicOriginalInputParams = new messages.EnableMicOriginalInputParams();
            EnableMicOriginalInputParams.setBenable(bEnable);
            let bytes = EnableMicOriginalInputParams.serializeBinary();
            return _addon.EnableMicOriginalInput(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the flag to enable/disable the original input of mic.
      * @method Setting_IsMicOriginalInputEnable
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsMicOriginalInputEnable: function () {
        if (_addon) {
          return _addon.IsMicOriginalInputEnable();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable to press and hold the Space-bar to speak when muted.
      * @method Setting_EnableHoldSpaceKeyToSpeak
      * @param {Boolean} bEnable TRUE indicates to press and hold the Space-bar to speak.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_EnableHoldSpaceKeyToSpeak: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableHoldSpaceKeyToSpeakParams = new messages.EnableHoldSpaceKeyToSpeakParams();
            EnableHoldSpaceKeyToSpeakParams.setBenable(bEnable);
            let bytes = EnableHoldSpaceKeyToSpeakParams.serializeBinary();
            return _addon.EnableHoldSpaceKeyToSpeak(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the flag to enable/disable to press and hold the Space-bar to speak.
      * @method Setting_IsHoldSpaceKeyToSpeakEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsHoldSpaceKeyToSpeakEnabled: function () {
        if (_addon) {
          return _addon.IsHoldSpaceKeyToSpeakEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable to mute always the mic when join the meeting by VoiP.
      * @method Setting_EnableAlwaysMuteMicWhenJoinVoip
      * @param {Boolean} bEnable TRUE indicates to enable to mute always the mic when join the meeting by VoiP.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_EnableAlwaysMuteMicWhenJoinVoip: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableAlwaysMuteMicWhenJoinVoipParams = new messages.EnableAlwaysMuteMicWhenJoinVoipParams();
            EnableAlwaysMuteMicWhenJoinVoipParams.setBenable(bEnable);
            let bytes = EnableAlwaysMuteMicWhenJoinVoipParams.serializeBinary();
            return _addon.EnableAlwaysMuteMicWhenJoinVoip(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the flag to enable/disable to mute always the mic when join the meeting by VoiP.
      * @method Setting_IsAlwaysMuteMicWhenJoinVoipEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsAlwaysMuteMicWhenJoinVoipEnabled: function () {
        if (_addon) {
          return _addon.IsAlwaysMuteMicWhenJoinVoipEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Enable or disable to prompt when the user joins the meeting using the third party audio.
      * @method Setting_EnableSuppressAudioNotify
      * @param {Boolean} bEnable TRUE indicates to enable to prompt.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_EnableSuppressAudioNotify: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let bEnable = clientOpts.bEnable;
          try {
            let EnableSuppressAudioNotifyParams = new messages.EnableSuppressAudioNotifyParams();
            EnableSuppressAudioNotifyParams.setBenable(bEnable);
            let bytes = EnableSuppressAudioNotifyParams.serializeBinary();
            return _addon.EnableSuppressAudioNotify(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the flag to enable/disable to prompt when the user joins the meeting using the third party audio.
      * @method Setting_IsSuppressAudioNotifyEnabled
      * @return {Boolean} Enabled or disabled.
      */
      Setting_IsSuppressAudioNotifyEnabled: function () {
        if (_addon) {
          return _addon.IsSuppressAudioNotifyEnabled();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the echo cancellation level.
      * @method Setting_EnableEchoCancellation
      * @param {Number} level The new echo cancellation level to be set. {@link ZoomSDKEchoCancelLationLevel}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
	      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
      Setting_SetEchoCancellationLevel: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let level = clientOpts.level;
          try {
            let SetEchoCancellationLevelParams = new messages.SetEchoCancellationLevelParams();
            SetEchoCancellationLevelParams.setLevel(level);
            let bytes = SetEchoCancellationLevelParams.serializeBinary();
            return _addon.SetEchoCancellationLevel(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the echo cancellation level.
      * @method Setting_IsEchoCancellationEnabled
      * @return {Number} The the echo cancellation level. {@link ZoomSDKEchoCancelLationLevel}
      */
      Setting_GetEchoCancellationLevel: function () {
        if (_addon) {
          return _addon.GetEchoCancellationLevel();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the volume of the selected mic.
      * @method Setting_SetMicVol
      * @param {Number} value Specify the volume of the mic that varies between 0 and 255.
      * @return {Number} The SDK will enable the default mic if there is no mic selected via SelectMic().
      */
      Setting_SetMicVol: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let value = clientOpts.value;
          try {
            let SetMicVolParams = new messages.SetMicVolParams();
            SetMicVolParams.setValue(Number(value));
            let bytes = SetMicVolParams.serializeBinary();
            return _addon.SetMicVol(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the volume of the selected mic.
      * @method Setting_GetMicVol
      * @return {Number}
      */
      Setting_GetMicVol: function () {
        if (_addon) {
          return _addon.GetMicVol();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Set the volume of the selected speaker.
      * @method Setting_SetSpeakerVol
      * @param {Number} value Specify the volume of the speaker that varies between 0 and 255.
      * @return {Number}
      */
      Setting_SetSpeakerVol: function (opts) {
        if (_addon) {
          let clientOpts = opts || {};
          let value = clientOpts.value;
          try {
            let SetSpeakerVolParams = new messages.SetSpeakerVolParams();
            SetSpeakerVolParams.setValue(Number(value));
            let bytes = SetSpeakerVolParams.serializeBinary();
            return _addon.SetSpeakerVol(bytes);
          } catch (error) {
            return ZoomSDKError.SDKERR_INVALID_PARAMETER;
          }
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      },
      /**
      * Get the volume of the selected speaker.
      * @method Setting_GetSpeakerVol
      * @return {Number}
      */
      Setting_GetSpeakerVol: function () {
        if (_addon) {
          return _addon.GetSpeakerVol();
        }
        return ZoomSDKError.SDKERR_UNINITIALIZE;
      }
    };
  };
  return {
    getInstance: function (opts) {
      if(!instance) {
        instance = init(opts);
      }
      return instance;;
    }
  };
})();

module.exports = {
  ZoomAudioSetting: ZoomAudioSetting
}
