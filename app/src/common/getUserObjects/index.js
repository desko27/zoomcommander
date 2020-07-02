export default function getUserObjects (userIds = [], userData = {}) {
  return userIds.map(id => {
    const userObject = userData[id] || { id }
    return userObject
  })
}
