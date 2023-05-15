export default function makeCurrentCache ({ defaultCacheFunctions }) {
  return Object.freeze({
    setUser,
    getUser,
    removeUser
  })
  function setUser ({ info, timeLeftS, expireAt, unique } = {}) {
    return defaultCacheFunctions.setObj({
      info,
      timeLeftS,
      expireAt,
      unique,
      lookUps: [ info.usernameId, info.passwordId ]
    })
  }
  function getUser (info) {
    return defaultCacheFunctions.findObjByVarious(
      info, [ 'id', 'usernameId', 'passwordId' ])
  }
  async function removeUser (info) {
    const result = await getUser(info)
    return result == null
      ? true
      : defaultCacheFunctions.remove({
          id: result.id,
          lookUps: [ result.usernameId, result.passwordId ]
        })
  }
}