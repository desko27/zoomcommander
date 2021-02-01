module.exports = function makeCommandsObject ({
  zoommeeting,
  zoomauth,
  sdk,
  meetingEvents,
  events: {
    onUserAudioStatusChange,
    onUserVideoStatusChange
  }
}) {
  // get required sdk instances for 'simple' commands object generation
  /* eslint-disable no-unused-vars */
  const zoomparticipantsctrl = zoommeeting.GetMeetingParticipantsCtrl(meetingEvents)
  const zoominfomod = zoommeeting.GetMeetingInfo()
  const zoomuicontroller = zoommeeting.GetMeetingUICtrl()
  const zoomannotation = zoommeeting.GetAnnotationCtrl()
  const zoomshare = zoommeeting.GetMeetingShare()
  const zoomh323 = zoommeeting.GetMeetingH323()
  const zoomconfiguration = zoommeeting.GetMeetingConfiguration()
  const zoomupdateaccount = zoommeeting.GetUpdateAccount()
  const zoomaudio = zoommeeting.GetMeetingAudio({ onUserAudioStatusChange })
  const zoomvideo = zoommeeting.GetMeetingVideo({ onUserVideoStatusChange })
  const zoomsetting = sdk.GetSetting()
  const zoomsetgeneral = zoomsetting.GetGeneralSetting()
  const zoomsetrecord = zoomsetting.GetRecordingSetting()
  const zoomsetvideo = zoomsetting.GetVideoSetting()
  const zoomsetaudio = zoomsetting.GetAudioSetting()
  const zoomsetui = zoomsetting.GetSettingUICtrl()
  const zoomsetstatistic = zoomsetting.GetSettingStatisticCtrl()
  const zoomsetaccessibility = zoomsetting.GetSettingAccessibilityCtrl()
  const zoomcustomizedresource = sdk.GetCustomizedResource()
  const zoompremeeting = sdk.PreMeeting()
  const zoomsms = sdk.SMSHelper()
  const zoomdirectshare = zoomauth.GetDirectShare()

  return {
    getMeetingTopic: () => zoominfomod.GetMeetingTopic(),
    leave: () => zoommeeting.LeaveMeeting(),
    getParticipantsList: () => zoomparticipantsctrl.GetParticipantsList(),
    getUserInfoByUserID: userid => zoomparticipantsctrl.GetUserInfoByUserID(userid),
    lowerHand: userid => zoomparticipantsctrl.LowerHand(userid),
    lowerAllHands: () => zoomparticipantsctrl.LowerAllHands(),
    muteAudio: userid =>
      zoomaudio.MeetingAudio_MuteAudio({ userid, allowunmutebyself: false }),
    unMuteAudio: userid =>
      zoomaudio.MeetingAudio_UnMuteAudio({ userid }),
    startAppShare: windowId => zoomshare.MeetingShare_StartAppShare({
      zn_hShare_app: windowId
    }),
    stopShare: () => zoomshare.MeetingShare_StopShare()
  }
}
