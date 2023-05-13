export default function makeAddSession ({ currentDb, currentCache, makeSession }) {
  return async function addSession ({ id, userId } = {}) {
    const sessionEntity = makeSession({ id: id ?? undefined, userId })
    const info = Object.freeze({
      id: sessionEntity.getId(),
      userId: sessionEntity.getUserId(),
      createdOn: sessionEntity.getCreatedOn(),
      lastActiveOn: sessionEntity.getLastActiveOn(),
      expireAt: sessionEntity.getExpireAt()
    })
    const dbResult = await currentDb.insertOne(info)
    if (dbResult == null) {
      throw new Error('No db result')
    }
    const cacheResult = await currentCache.setObj({
      info,
      expireAt: info.expireAt
    })
    if (cacheResult == null) {
      throw new Error('No cache result')
    }
    return { ...dbResult, token: sessionEntity.getToken() }
  }
}