export default function makeRemoveUsername ({ currentDb, currentCache }) {
  return async function removeUsername (info) {
    const cacheResult = await currentCache.removeUsername(info)
    if (cacheResult == null) {
      throw new Error('No cache result')
    }
    const dbResult = await currentDb.removeUsername(info)
    if (dbResult == null) {
      throw new Error('No db result')
    }
    return dbResult
  }
}