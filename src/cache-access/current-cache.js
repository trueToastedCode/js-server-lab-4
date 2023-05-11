export default function makeCurrentCache ({ defaultCacheFunctions }) {
  return Object.freeze({
    setUsername,
    getUsername,
    removeUsername
  })
  function setUsername ({ info, timeLeftS, expireAt, unique } = {}) {
    return defaultCacheFunctions.setObj({
      info,
      timeLeftS,
      expireAt,
      unique,
      lookUps: [ info.userId, info.username ]
    })
  }
  function getUsername ({ id, userId, username } = {}) {
    return defaultCacheFunctions.findObjByVarious(
      { id, userId, username }, [ 'id', 'userId', 'username' ])
  }
  async function removeUsername (info) {
    const result = await getUsername(info)
    if (result == null) {
      return true
    }
    return defaultCacheFunctions.remove({
      id: result.id,
      lookUps: [ result.userId, result.username ]
    })
  }
}