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
    if (id != null) {
      return defaultCacheFunctions.findObj({ id })
    } else if (userId != null) {
      return defaultCacheFunctions.findObj({ lookUp: userId })
    } else if (username != null) {
      return defaultCacheFunctions.findObj({ lookUp: username })
    }
    throw new Error('No id, userId or username supplied')
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