import makeUsername from '../submodules/username-entity'

export default function makeChangeUsername ({ currentDb, currentCache, findUsername, CustomError }) {
  return async function changeUsername ({ id, userId, username, newUsername } = {}) {
    if (newUsername == null) {
      throw new CustomError('No new username supplied', 400)
    }
    const findResult = await findUsername({ id, userId, username })
    const usernameEntity = makeUsername({ ...findResult, modifiedOn: undefined, username: newUsername })
    const cacheRmResult = await currentCache.removeUsername({ id: usernameEntity.getId() })
    if (cacheRmResult == null) {
      throw new Error('No cache result')
    }
    const dbUpdateResult = await currentDb.updateOne({
      id: usernameEntity.getId(),
      username: usernameEntity.getUsername(),
      modifiedOn: usernameEntity.getModifiedOn()
    })
    if (dbUpdateResult == null) {
      throw new Error('No db result')
    }
    if (cacheRmResult === false) {
      return dbUpdateResult
    }
    const cacheSetResult = await currentCache.setUsername({
      info: {
        id: usernameEntity.getId(),
        userId: usernameEntity.getUserId(),
        username: usernameEntity.getUsername(),
        modifiedOn: usernameEntity.getModifiedOn()
      },
      timeLeftS: process.env.USERNAME_CACHE_S
    })
    if (cacheSetResult == null) {
      throw new Error('No cache result')
    }
    return dbUpdateResult
  }
}