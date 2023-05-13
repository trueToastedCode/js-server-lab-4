export default function makeRemoveSessions ({ currentDb, currentCache, findSessions }) {
  return async function removeSessions ({ userId } = {}) {
    const sessions = await findSessions({ userId })
    const results = await Promise.all([
      currentDb.removeAll({ userId }),
      ...sessions.map(
        session => currentCache.remove({ id: session.id }))
    ])
    if (results[0] == null) {
      throw new Error('No db result')
    }
    if (results.some(item => item == null)) {
      throw new Error('No cache result')
    }
    return results[0]
  }
}