let userNameList = [];
let inMeetingUserList = $("#inMeetingUserList")[0];

function getParticipantsList() {
  let userList = zoomparticipantsctrl.GetParticipantsList();
  console.log('GetParticipantsList', userList);
  for (let i = 0; i < userList.length; i++) {
    let userObj = zoomparticipantsctrl.GetUserInfoByUserID(userList[i].userid);
    console.log('getParticipantsList', userObj);
    userObj.userid = userObj.userID
    if (checkExist(userObj, inMeetingUserList.children, 'userid') === false) {
      if (userObj.userName && userObj.userID) {
        let li = document.createElement("li");
        li.innerHTML = userObj && userObj.isVideoOn ? `${userObj.userName} (${userObj.userID}) | VideoOn` : `${userObj.userName} (${userObj.userID}) | VideoOff`;
        li.userid = userObj.userID;
        inMeetingUserList.appendChild(li);
      }
    }
  }
}

function onUserJoin(userId_List) {
  console.log('onUserJoin', userId_List)
  for (let i = 0; i < userId_List.length; i++) {
    if (checkExist(userId_List[i], inMeetingUserList.children, 'userid') === false) {
      let userObj = zoomparticipantsctrl.GetUserInfoByUserID(userId_List[i].userid);
      console.log('onUserJoin', userObj);
      if (userObj.userName && userObj.userID) {
        let li = document.createElement("li");
        li.innerHTML = userObj && userObj.isVideoOn ? `${userObj.userName} (${userObj.userID}) | VideoOn` : `${userObj.userName} (${userObj.userID}) | VideoOff`;
        li.userid = userObj.userID;
        inMeetingUserList.appendChild(li);
      }
    }
  }
}

function SetMeetingUserJoinCB() {
  zoomparticipantsctrl.SetMeetingUserJoinCB(onUserJoin);
}

function onUserLeft(userId_List) {
  console.log('onUserLeft', userId_List);
  for (let i = 0; i < userId_List.length; i++) {
    for (let k = 0; k < inMeetingUserList.children.length; k++) {
      if (inMeetingUserList.children[k].userid == userId_List[i].userid) {
        inMeetingUserList.children[k].remove();
      }
    }
  }
  for (let i = 0; i < userId_List.length; i++) {
    for (let j = 0; j < subscribedVideoList.length; j++) {
      if (subscribedVideoList[j] && subscribedVideoList[j].userid == userId_List[i].userid) {
        let obj = {
          recv_handle: subscribedVideoList[j].recv_handle
        }
        let ret = zoomrawdata.UnSubscribe(obj);
        console.log('unsubscribeVideo', ret, obj);
        selectedSubscribeVideoReceverHandleOption.options[subscribedVideoList[j].recv_handle].disabled = false;
        subscribedVideoList[j] = null;
        userNameList[j].innerHTML = '';
        subVideoBtnCheck();
      }
    }
  }
  for (let i = 0; i < userId_List.length; i++) {
    if (subscribedShareObj && subscribedShareObj.userid == userId_List[i].userid) {
      let obj = {
        recv_handle: subscribedShareObj.recv_handle
      }
      let ret = zoomrawdata.UnSubscribe(obj);
      console.log('unsubscribeShare', ret, obj);
      selectedSubscribeShareUserIdBoard.value = '';
      selectedUnSubscribeShareUserIdBoard.value = '';
      subscribedShareObj = null;
      subShareBtnCheck();
    }
  }

  for (let i = 0; i < userId_List.length; i++) {
    for (let j = 0; j < sharingUserList.children.length; j++) {
      if (userId_List[i].userid == sharingUserList.children[j].userId) {
        sharingUserList.children[j].remove();
      }
    }
  }
}

function SetMeetingUserLeftCB() {
  zoomparticipantsctrl.SetMeetingUserLeftCB(onUserLeft);
}

function onHostChangeNotification(userid) {
  console.log('onHostChangeNotification', userid);
}

function SetMeetingHostChangeCB() {
  zoomparticipantsctrl.SetMeetingHostChangeCB(onHostChangeNotification);
}

inMeetingUserList.addEventListener('click', function (e) {
  let { target } = e
  for (let i = 0; i < inMeetingUserList.children.length; i++) {
    inMeetingUserList.children[i].removeAttribute("style");
  }
  e.target.value = target.userid;

  let ulIndex = checkExist(target, inMeetingUserList.children, 'userid');
  if (ulIndex !== false) {
    inMeetingUserList.children[ulIndex].style = "color: red";
  }

  subscribedUserName = target.textContent ? target.textContent.split('(')[0] : null;
  let videoIndex = checkExist(target, subscribedVideoList, 'userid');
  if (videoIndex === false) {
    selectedSubscribeVideoUserIdBoard.value = target.userid;
    for (let i = 0; i < selectedSubscribeVideoReceverHandleOption.options.length; i++) {
      if (!selectedSubscribeVideoReceverHandleOption.options[i].disabled) {
        selectedSubscribeVideoReceverHandleOption.value = selectedSubscribeVideoReceverHandleOption.options[i].value;
        break;
      }
    }
    subVideoBtnCheck();
  } else {
    selectedSubscribeVideoUserIdBoard.value = subscribedVideoList[videoIndex].userid;
    selectedVideoRawDataResolutioneOption.value = subscribedVideoList[videoIndex].rawdataResolution;
    selectedSubscribeVideoReceverHandleOption.value = subscribedVideoList[videoIndex].recv_handle;
  }
})

SetMeetingUserJoinCB();
SetMeetingUserLeftCB();
SetMeetingHostChangeCB();