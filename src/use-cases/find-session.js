export default function makeFindSession ({ currentDb, currentCache, CustomError, Token }) {
  return async function findSession ({ id, token } = {}) {
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
    const result = await currentCache.findObj({ id }) ?? await currentDb.findOne({ id })
    if (result == null) {
      throw new Error('Session not found')
    }
    return result
  }
}