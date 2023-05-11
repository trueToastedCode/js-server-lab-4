import makeUsername from '../submodules/username-entity'

export default function makeChangeUsername ({ currentDb, currentCache, findUsername,  }) {
  return async function changeUsername ({ id, userId, username, newUsername } = {}) {
    if (newUsername == null) {
      throw new Error('No new username supplied')
    }
    const findResult = await findUsername({ id, userId, username })
    const usernameEntity = makeUsername({ ...findResult, modifiedOn: undefined, username: newUsername })
    const results = await Promise.all([
      currentCache.removeUsername({
        id: usernameEntity.getId()
      }),
      currentDb.updateOne({
        id: usernameEntity.getId(),
        username: usernameEntity.getUsername(),
        modifiedOn: usernameEntity.getModifiedOn()
      })
    ])
    if (results[1] == null) {
      throw new Error('No db result')
    }
    if (results[0]) {
      const setCacheResult = await currentCache.setUsername({
        info: {
          id: usernameEntity.getId(),
          userId: usernameEntity.getUserId(),
          username: usernameEntity.getUsername(),
          modifiedOn: usernameEntity.getModifiedOn()
        },
        timeLeftS: process.env.USERNAME_CACHE_S
      })
      if (setCacheResult == null) {
        throw new Error('No cache result')
      }
    }
    return results[1]
  }
}