const jwt = require('jsonwebtoken')
const { ZoomAuthResult, ZoomMeetingStatus } = require('../../../../lib/settings')

const makeCommandsObject = require('./make-commands-object')

module.exports = async function getMeeting ({ app, sdk, events }) {
  const joinMeeting = () => new Promise((resolve, reject) => {
    const zoomauth = sdk.GetAuth({
      authcb: status => {
        if (ZoomAuthResult.AUTHRET_SUCCESS !== status) {
          return reject(new Error('Error in ZoomAuthResult before trying to join meeting!'))
        }

        const meetingEvents = {
          meetingstatuscb: status => {
            if (status === ZoomMeetingStatus.MEETING_STATUS_INMEETING) {
              events.onJoined()
            }
          },
          meetinguserjoincb: events.onUserJoined,
          meetinguserleftcb: events.onUserLeft,
          meetinghostchangecb: () => {},
          meetingloworraisehandstatuschangecb: events.onLowOrRaiseHandStatusChanged,
          meetingusernamechangecb: events.onUserNameChanged
        }

        const zoommeeting = sdk.GetMeeting(meetingEvents)
        const commands = makeCommandsObject({
          zoommeeting,
          zoomauth,
          sdk,
          meetingEvents,
          events
        })

        const joinMeetingResult = zoommeeting.JoinMeetingWithoutLogin({
          meetingnum: global.zoomMeetingID,
          username: global.zoomUsername,
          psw: global.zoomMeetingPassword
        })
        if (joinMeetingResult !== 0) {
          return reject(new Error('Error while joining, probably bad meeting id or password'))
        }

        const meeting = { commands }
        resolve(meeting)
      }
    })

    const makeJwtFromLocalSecrets = () => {
      // make jwt token from sdk key and secret
      const timestampIssued = Math.floor(Date.now() / 1000) - 60 // ms -> s
      const timestampExpires = timestampIssued + 86400 // 24h
      return jwt.sign(
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
    }

    // start everything by initializing sdk
    const token = global.jwt || makeJwtFromLocalSecrets()
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
