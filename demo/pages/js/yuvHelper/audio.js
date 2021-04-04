const GetAudioLibuvClientObj = libuvAddon.GetAudioLibuvClientObj()

let unSubscribeAudioBtn = $("#unSubscribeAudioBtn");
let subscribeAudioBtn = $("#subscribeAudioBtn");

function StartAudioClient() {
  let ret = GetAudioLibuvClientObj.StartAudioClient();
  console.log('StartAudioClient', ret)
}

function StopAudioClient() {
  let ret = GetAudioLibuvClientObj.StopAudioClient();
  console.log('StopAudioClient', ret)
}

function onMixedAudioRawDataReceived(databuf, data_format) {
  console.log('onMixedAudioRawDataReceived', databuf, data_format)
}

function onOneWayAudioRawDataReceived(databuf, data_format, nodeid) {
  console.log('onOneWayAudioRawDataReceived', databuf, data_format, nodeid)
}

function SetRenderAudioRawDataCB() {
  let ret = GetAudioLibuvClientObj.SetRenderAudioRawDataCB(onMixedAudioRawDataReceived, onOneWayAudioRawDataReceived);
  console.log('SetRenderAudioRawDataCB', ret)
}

function InitAudioRawDataHelper() {
  let InitAudioRawDataHelper = zoomrawdata.InitAudioRawDataHelper();
  console.log('InitAudioRawDataHelper', InitAudioRawDataHelper);
  subscribeAudioBtn.disabled()
}

function handleSubscribeAudio() {
  let SubscribeAudioRawdata = zoomrawdata.SubscribeAudioRawdata();
  console.log('SubscribeAudioRawdata', SubscribeAudioRawdata);
  unSubscribeAudioBtn.enabled()
  subscribeAudioBtn.disabled()
}

function handleUnsubscribeAudio() {
  let UnSubscribeAudioRawdata = zoomrawdata.UnSubscribeAudioRawdata();
  console.log('UnSubscribeAudioRawdata', UnSubscribeAudioRawdata);
  subscribeAudioBtn.enabled()
  unSubscribeAudioBtn.disabled()
}

StartAudioClient()
SetRenderAudioRawDataCB()
InitAudioRawDataHelper()