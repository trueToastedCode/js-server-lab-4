export default function makeRemoveSession ({ currentDb, currentCache, CustomError, Token }) {
  return async function removeSession ({ id, token } = {}) {
    if (id == null && token == null) {
      throw new CustomError('No id or token supplied', 400)
    }
    if (id == null && token != null) {
      const decoded = Token.verify(token)
      id = decoded.id
      if (id == null) {
        throw new Error('No id supplied')
      }
    }
    const results = await Promise.all([
      currentDb.removeOne({ id }),
      currentCache.remove({ id })
    ])
    if (results[0] == null) {
      throw new Error('No db result')
    }
    if (results[1] == null) {
      throw new Error('No cache result')
    }
    return results[0]
  }
}