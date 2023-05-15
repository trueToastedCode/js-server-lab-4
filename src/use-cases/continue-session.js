export default function makeContinueSession ({ currentDb, currentCache, makeSession, findSession }) {
  return async function continueSession ({ id, token } = {}) {
    const findResult = await findSession({ id, token })
    const sessionEntity = makeSession({ ...findResult, lastActiveOn: undefined })
    const updateInfo = Object.freeze({
      id: sessionEntity.getId(),
      lastActiveOn: sessionEntity.getLastActiveOn(),
      expireAt: sessionEntity.getExpireAt()
    })
    const reslts = await Promise.all([
      currentDb.updateOne(updateInfo),
      currentCache.setObj({
        info: {
          ...updateInfo,
          userId: sessionEntity.getUserId(),
          createdOn: sessionEntity.getCreatedOn()
        },
        expireAt: sessionEntity.getExpireAt(),
        unique: false
      })
    ])
    if (reslts[0] === null) {
      throw new Error('No db result')
    }
    if (reslts[1] === null) {
      throw new Error('No cache result')
    }
    return { ...reslts[1], token: sessionEntity.getToken() }
  }
}