const GetVideoLibuvClientObj = libuvAddon.GetVideoLibuvClientObj()

let selectedSubscribeVideoUserIdBoard = $("#selectedSubscribeVideoUserIdBoard")[0];
let selectedVideoRawDataResolutioneOption = $("#selectedVideoRawDataResolutioneOption")[0];
let selectedSubscribeVideoReceverHandleOption = $("#selectedSubscribeVideoReceverHandleOption")[0];
let selectedUnSubscribeVideoUserIdBoard = $("#selectedUnSubscribeVideoUserIdBoard")[0];
let selectedUnSubscribeVideoReceverHandleOption = $("#selectedUnSubscribeVideoReceverHandleOption")[0];
let subscribeVideoBtn = $("#subscribeVideoBtn");
let unSubscribeVideoBtn = $("#unSubscribeVideoBtn");

let canvasVideoList = [];
let videoRenderList = [];
let subscribedVideoList = []
let subscribedUserName = '';

for (let i = 0; i < 4; i++) {
  canvasVideoList[i] = $("#canvasVideo")[0].children[i].children[0];
  videoRenderList[i] = new CanvasRender(canvasVideoList[i]);
  videoRenderList[i].clear();
  userNameList[i] = $("#canvasVideo")[0].children[i].children[1];
  userNameList[i].innerHTML = '';
}

function StartVideoClient() {
  let ret = GetVideoLibuvClientObj.StartVideoClient();
  console.log('StartVideoClient', ret);
}

function StopVideoClient() {
  let ret = GetVideoLibuvClientObj.StopVideoClient();
  console.log('StopVideoClient', ret);
}

function onRenderVideoRawDataReceived(format, recv_handle, databuf) {
  let formatList = format.split(';');
  croppingParams.width = formatList[2];
  croppingParams.height = formatList[3];
  croppingParams.rotation = formatList[4];
  let data = new Uint8Array(databuf);
  videoRenderList[recv_handle].drawNextOuptutPictureGL(croppingParams.width, croppingParams.height, croppingParams, data, croppingParams.rotation, 1);
}

function SetRenderVideoRawDataCB() {
  let ret = GetVideoLibuvClientObj.SetRenderVideoRawDataCB(onRenderVideoRawDataReceived);
  console.log('SetRenderVideoRawDataCB', ret)
}

function startPreviewDevice() {
  let obj = {
    userid: 0,
    rawdataType: ZoomSDKRawDataType.RAW_DATA_TYPE_VIDEO,
    recv_handle: 3
  }
  let ret = zoomrawdata.Subscribe(obj);
  console.log('startPreviewDevice', ret, obj)
}

function onUserVideoStatusChange(videoStatus) {
  console.log('onUserVideoStatusChange', videoStatus)
  for (let k = 0; k < inMeetingUserList.children.length; k++) {
    if (inMeetingUserList.children[k].userid == videoStatus.userId) {
      let oldLi = inMeetingUserList.children[k].innerHTML.split('|')[0];
      let newVideo = videoStatus.videoStatus == 0 ? 'VideoOn' : 'VideoOff';
      inMeetingUserList.children[k].innerHTML = `${oldLi} | ${newVideo}`;
    }
  }
}

function setMeetingVideoStatusCB() {
  let ret = zoomvideo.MeetingVideo_SetMeetingVideoStatusCB(onUserVideoStatusChange);
  console.log('setMeetingVideoStatusCB', ret);
}

function handleSubscribeVideo() {
  let resolutionObj = {
    resolution: selectedVideoRawDataResolutioneOption.value,
    recv_handle: selectedSubscribeVideoReceverHandleOption.value
  }
  let SetRawDataResolution = zoomrawdata.SetRawDataResolution(resolutionObj);
  console.log('SetRawDataResolution', SetRawDataResolution, resolutionObj)
  let subscribeObj = {
    userid: selectedSubscribeVideoUserIdBoard.value,
    rawdataType: ZoomSDKRawDataType.RAW_DATA_TYPE_VIDEO,
    recv_handle: selectedSubscribeVideoReceverHandleOption.value,
  }
  let Subscribe = zoomrawdata.Subscribe(subscribeObj);
  console.log('handleSubscribeVideo', Subscribe, subscribeObj)
  if (Subscribe == SDKRawDataError.SDKRawDataError_SUCCESS || Subscribe == SDKRawDataError.SDKRawDataError_NO_VIDEO_DATA) {
    userNameList[subscribeObj.recv_handle].innerHTML = subscribedUserName;
    selectedUnSubscribeVideoUserIdBoard.value = selectedSubscribeVideoUserIdBoard.value;
    selectedUnSubscribeVideoReceverHandleOption.value = selectedSubscribeVideoReceverHandleOption.value;
    for (let i = 0; i < selectedSubscribeVideoReceverHandleOption.options.length; i++) {
      if (selectedSubscribeVideoReceverHandleOption.options[i].value == selectedSubscribeVideoReceverHandleOption.value) {
        selectedSubscribeVideoReceverHandleOption.options[i].disabled = true;
      }
    }
    let flag = checkExist(subscribeObj, subscribedVideoList, 'recv_handle');
    if (flag === false) {
      subscribedVideoList[subscribeObj.recv_handle] = subscribeObj;
      subscribedVideoList[subscribeObj.recv_handle].rawdataResolution = selectedVideoRawDataResolutioneOption.value;
    }
    subVideoBtnCheck();
  }
}

function handleUnSubscribeVideo() {
  let obj = {
    recv_handle: selectedUnSubscribeVideoReceverHandleOption.value
  }
  let ret = zoomrawdata.UnSubscribe(obj);
  console.log('handleUnSubscribeVideo', ret, obj);
  if (ret == SDKRawDataError.SDKRawDataError_SUCCESS) {
    let obj = {
      recv_handle: selectedUnSubscribeVideoReceverHandleOption.value
    }
    let index = checkExist(obj, subscribedVideoList, 'recv_handle');
    if (index !== false) {
      subscribedVideoList[index] = null;
      userNameList[index].innerHTML = '';
    }
    for (let i = 0; i < selectedUnSubscribeVideoReceverHandleOption.options.length; i++) {
      if (selectedUnSubscribeVideoReceverHandleOption.options[i].value == selectedUnSubscribeVideoReceverHandleOption.value) {
        selectedSubscribeVideoReceverHandleOption.options[i].disabled = false;
      }
    }
    subVideoBtnCheck();
  }
}

selectedUnSubscribeVideoReceverHandleOption.addEventListener('change', changeVideoUnSubReceverHandle);

function changeVideoUnSubReceverHandle(e) {
  let { target } = e
  e.target.recv_handle = target.value;
  let flag = checkExist(target, subscribedVideoList, 'recv_handle');
  if (flag === false) {
    selectedUnSubscribeVideoUserIdBoard.value = '';
  } else {
    selectedUnSubscribeVideoUserIdBoard.value = subscribedVideoList[flag].userid;
  }
  subVideoBtnCheck();
}

selectedVideoRawDataResolutioneOption.addEventListener('change', changeVideoRawDataResolution);

function changeVideoRawDataResolution(e) {
  let { target } = e
  let obj = {
    resolution: target.value,
    recv_handle: selectedSubscribeVideoReceverHandleOption.value
  }
  let ret = zoomrawdata.SetRawDataResolution(obj);
  if (subscribedVideoList[obj.recv_handle]) {
    subscribedVideoList[obj.recv_handle].rawdataResolution = target.value;
  }
  console.log('SetRawDataResolution', ret, obj);
}


function subVideoBtnCheck() {
  if (!selectedSubscribeVideoUserIdBoard.value) {
    subscribeVideoBtn.disabled()
  } else {
    subscribeVideoBtn.enabled()
  }
  console.log('subVideoBtnCheck', selectedUnSubscribeVideoUserIdBoard.value, !selectedUnSubscribeVideoUserIdBoard.value)
  if (!selectedUnSubscribeVideoUserIdBoard.value) {
    unSubscribeVideoBtn.disabled()
  } else {
    unSubscribeVideoBtn.enabled()
  }
}

StartVideoClient();
setMeetingVideoStatusCB();
SetRenderVideoRawDataCB();
startPreviewDevice();