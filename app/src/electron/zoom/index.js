const initSdk = require('./init-sdk')
const getMeeting = require('./get-meeting')

module.exports = async function zoomMeetingControllerFactory ({ app, events }) {
  const sdk = initSdk({ app })
  const meeting = await getMeeting({ app, sdk, events })

  return meeting
}
