const GetShareLibuvClientObj = libuvAddon.GetShareLibuvClientObj()

const shareRecvHandle = 4;
let sharingUserList = $("#sharingUserList")[0];
let selectedSubscribeShareUserIdBoard = $("#selectedSubscribeShareUserIdBoard")[0];
let selectedShareRawDataResolutionOption = $("#selectedShareRawDataResolutionOption")[0];
let selectedUnSubscribeShareUserIdBoard = $("#selectedUnSubscribeShareUserIdBoard")[0];
let subscribeShareBtn = $("#subscribeShareBtn");
let unSubscribeShareBtn = $("#unSubscribeShareBtn");
let subscribedShareObj = {}

let canvasShare = $("#canvasShare")[0];
let shareRender = new CanvasRender(canvasShare);
shareRender.clear();

function StartShareClient() {
  let ret = GetShareLibuvClientObj.StartShareClient();
  console.log('StartShareClient', ret)
}

function StopShareClient() {
  let ret = GetShareLibuvClientObj.StopShareClient();
  console.log('StopShareClient', ret)
}

function onRenderShareRawDataReceived(format, recv_list, databuf) {
  let formatList = format.split(';');
  croppingParams.width = formatList[2];
  croppingParams.height = formatList[3];
  croppingParams.rotation = formatList[4];
  let data = new Uint8Array(databuf);
  shareRender.drawNextOuptutPictureGL(croppingParams.width, croppingParams.height, croppingParams, data, croppingParams.rotation, 1);
}

function SetRenderShareRawDataCB() {
  let ret = GetShareLibuvClientObj.SetRenderShareRawDataCB(onRenderShareRawDataReceived);
  console.log('SetRenderShareRawDataCB', ret)
}

function subShareBtnCheck() {
  subscribeShareBtn.enabled()
  unSubscribeShareBtn.disabled()
  console.log('subscribedShareObj', subscribedShareObj)
  if (subscribedShareObj && subscribedShareObj.userid) {
    subscribeShareBtn.disabled()
    unSubscribeShareBtn.enabled()
  }
}

function handleSubscribeShare(e) {
  let resolutionObj = {
    resolution: selectedShareRawDataResolutionOption.value,
    recv_handle: shareRecvHandle
  }
  let SetRawDataResolution = zoomrawdata.SetRawDataResolution(resolutionObj);
  console.log('SetRawDataResolution', SetRawDataResolution, resolutionObj)
  let obj = {
    userid: selectedSubscribeShareUserIdBoard.value,
    rawdataType: ZoomSDKRawDataType.RAW_DATA_TYPE_SHARE,
    recv_handle: shareRecvHandle
  }
  let ret = zoomrawdata.Subscribe(obj);
  console.log('handleSubscribeShare', ret, obj)
  subscribedShareObj = obj;
  subShareBtnCheck();
}

function handleUnSubscribeShare() {
  let obj = {
    recv_handle: shareRecvHandle,
    userid: selectedUnSubscribeShareUserIdBoard.value
  }
  let ret = zoomrawdata.UnSubscribe(obj);
  console.log('handleUnSubscribeShare', ret, obj);
  if (ret == SDKRawDataError.SDKRawDataError_SUCCESS) {
    subscribedShareObj = null;
    subShareBtnCheck();
  }
}

sharingUserList.addEventListener('click', function (e) {
  let { target } = e
  for (let i = 0; i < sharingUserList.children.length; i++) {
    sharingUserList.children[i].removeAttribute("style");
  }

  let shareUlIndex = checkExist(target, sharingUserList.children, 'userId');
  if (shareUlIndex !== false) {
    sharingUserList.children[shareUlIndex].style = "color: red";
  }

  selectedSubscribeShareUserIdBoard.value = target.userId;
  selectedUnSubscribeShareUserIdBoard.value = target.userId;
  subShareBtnCheck();
})

function onSharingStatus(status) {
  console.log('onSharingStatus', status);
  if (status.ShareStatus == ZNShareStatus.ZN_Sharing_Other_Share_Begin) {
    let userObj = zoomparticipantsctrl.GetUserInfoByUserID(status.userId);
    let checkShareUser = checkExist(userObj, sharingUserList.children, 'userId');
    if (!checkShareUser && userObj.userName) {
      sharingUserList.style = 'display: block';
      let shareLi = document.createElement("li");
      shareLi.innerHTML = `${userObj.userName} is sharing`;
      shareLi.userId = status.userId;
      sharingUserList.appendChild(shareLi);
    }
  } else if (status.ShareStatus == ZNShareStatus.ZN_Sharing_Other_Share_End) {
      if (subscribedShareObj && (status.userId == subscribedShareObj.userid)) {
        let obj = {
          recv_handle: shareRecvHandle
        }
        let ret = zoomrawdata.UnSubscribe(obj);
        console.log('unsubscribeShare', ret, obj);
        if (ret == SDKRawDataError.SDKRawDataError_SUCCESS) {
          subscribedShareObj = null;
          selectedSubscribeShareUserIdBoard.value = '';
          selectedUnSubscribeShareUserIdBoard.value = '';
        }
      }

    for (let i = 0; i < sharingUserList.children.length; i++) {
      if (status.userId == sharingUserList.children[i].userId) {
        sharingUserList.children[i].remove();
        break;
      }
    }

    if (sharingUserList.children.length == 0) {
      sharingUserList.style = 'display: none';
    }
  }
  subShareBtnCheck();
}

function SetOnSharingStatusCB() {
  zoomshare.MeetingShare_SetOnSharingStatusCB(onSharingStatus);
}

selectedShareRawDataResolutionOption.addEventListener('change', changeShareRawDataResolution);

function changeShareRawDataResolution(e) {
  let { target } = e
  let obj = {
    resolution: target.value,
    recv_handle: shareRecvHandle
  }
  let ret = zoomrawdata.SetRawDataResolution(obj);
  console.log('changeShareRawDataResolution', ret, obj);
}

StartShareClient();
SetOnSharingStatusCB();
SetRenderShareRawDataCB();