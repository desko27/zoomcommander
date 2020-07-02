const jwt = require('jsonwebtoken')
const { ZoomAuthResult, ZoomMeetingStatus } = require('../../../../lib/settings')

const makeCommandsObject = require('./make-commands-object')

let preMeetingJoinDone = false

module.exports = async function getMeeting ({ app, sdk, events }) {
  const joinMeeting = () => new Promise((resolve, reject) => {
    const zoomauth = sdk.GetAuth({
      authcb: status => {
        console.log('===== (authcb) :: TEST TEST TEST =====')
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

    // make jwt token from sdk key and secret
    const timestampIssued = Math.floor(Date.now() / 1000) - 60 // ms -> s
    const timestampExpires = timestampIssued + 86400 // 24h
    const token = jwt.sign(
      {
        appKey: process.env.ZOOM_SDK_KEY,
        iat: timestampIssued,
        exp: timestampExpires,
        tokenExp: timestampExpires
      },
      process.env.ZOOM_SDK_SECRET,
      {
        header: {
          alg: 'HS256',
          typ: 'JWT'
        }
      }
    )

    // start everything by initializing sdk
    zoomauth.AuthWithJwtToken(token)
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
