export default function makeFindSessions ({ currentDb, CustomError }) {
  return async function findSessions ({ userId } = {}) {
    if (userId == null) {
      throw new CustomError('No userId supplied', 400)
    }
    const result = await currentDb.findAll({ userId })
    if (result == null) {
      throw new Error('No db result')
    }
    return result
  }
}