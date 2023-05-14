export default function makeCurrentCache ({ defaultCacheFunctions }) {
  return Object.freeze({
    setPassword,
    getPassword,
    removePassword
  })
  function setPassword ({ info, timeLeftS, expireAt, unique } = {}) {
    return defaultCacheFunctions.setObj({
      info,
      timeLeftS,
      expireAt,
      unique,
      lookUps: [ info.userId ]
    })
  }
  function getPassword (info) {
    return defaultCacheFunctions.findObjByVarious(
      info, [ 'id', 'userId' ])
  }
  async function removePassword (info) {
    const result = await getPassword(info)
    return result == null
      ? true
      : defaultCacheFunctions.remove({
          id: result.id,
          lookUps: [ result.userId ]
        })
  }
}