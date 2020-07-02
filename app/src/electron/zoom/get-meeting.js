const { ZoomAuthResult, ZoomMeetingStatus } = require('../../../../lib/settings')

const makeCommandsObject = require('./make-commands-object')

let preMeetingJoinDone = false

module.exports = async function getMeeting ({ app, sdk, events }) {
  const joinMeeting = () => new Promise((resolve, reject) => {
    const zoomauth = sdk.GetAuth({
      authcb: status => {
        if (ZoomAuthResult.AUTHRET_SUCCESS !== status) {
          return reject(new Error('Error in ZoomAuthResult before trying to join meeting!'))
        }

        const meetingEvents = {
          meetingstatuscb: status => {
            // console.log('STATUS --->', status)
            if (status === ZoomMeetingStatus.MEETING_STATUS_INMEETING) {
              // MEETING_STATUS_INMEETING runs twice:
              //  1) When user is accepted by host (then system starts joining meeting)
              //  2) When meeting is finally joined, which means all's actually ready
              if (preMeetingJoinDone) events.onJoined() // actual meeting joined
              preMeetingJoinDone = true
            }
          },
          meetinguserjoincb: events.onUserJoined,
          meetinguserleftcb: events.onUserLeft,
          meetinghostchangecb: () => {},
          meetingloworraisehandstatuschangecb: events.onLowOrRaiseHandStatusChanged
        }

        const zoommeeting = sdk.GetMeeting(meetingEvents)
        const commands = makeCommandsObject({
          zoommeeting,
          zoomauth,
          sdk,
          meetingEvents,
          events
        })

        zoommeeting.JoinMeetingWithoutLogin({
          meetingnum: process.env.ZOOM_MEETING_ID,
          username: process.env.ZOOM_MEETING_USERNAME,
          psw: process.env.ZOOM_MEETING_PASSWORD
        })

        const meeting = { commands }
        resolve(meeting)
      }
    })

    // start everything by initializing sdk
    zoomauth.SDKAuth(process.env.ZOOM_SDK_KEY, process.env.ZOOM_SDK_SECRET)
  })

  // RUN PROMISE
  const meeting = await joinMeeting()

  // leave meeting and clean up when closing!
  app.on('window-all-closed', () => {
    meeting.commands.leave()
    sdk.CleanUPSDK()
  })

  return meeting
}
