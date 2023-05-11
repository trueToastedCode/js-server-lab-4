import makeUsername from '../submodules/username-entity'

export default function makeChangeUsername ({ currentDb, currentCache, findUsername }) {
  return async function changeUsername ({ id, userId, username, newUsername } = {}) {
    if (newUsername == null) {
      throw new Error('No new username supplied')
    }
    const findDbResult = await findUsername({ id, userId, username })
    const usernameEntity = makeUsername({ ...findDbResult, modifiedOn: undefined, username: newUsername })
    const findCacheResult = await currentCache.getUsername({ id: findDbResult.id })
    let updateDbResult = currentDb.updateOne({
      id: usernameEntity.getId(),
      username: usernameEntity.getUsername(),
      modifiedOn: usernameEntity.getModifiedOn()
    })
    if (findCacheResult != null) {
      const updateCacheResult = await currentCache.setUsername({
        info: {
          id: usernameEntity.getId(),
          userId: usernameEntity.getUserId(),
          username: usernameEntity.getUsername(),
          modifiedOn: usernameEntity.getModifiedOn()
        },
        timeLeftS: process.env.USERNAME_CACHE_S,
        unique: false
      })
      updateDbResult = await updateDbResult
      if (updateCacheResult == null) {
        throw new Error('No cache result')  
      }
    } else {
      updateDbResult = await updateDbResult
    }
    if (updateDbResult == null) {
      throw new Error('No db result')
    }
    return updateDbResult
  }
}