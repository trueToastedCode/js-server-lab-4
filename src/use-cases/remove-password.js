export default function makeRemovePassword ({ currentDb, currentCache }) {
  return async function removePassword (info) {
    const cacheResult = await currentCache.removePassword(info)
    if (cacheResult == null) {
      throw new Error('No cache result')
    }
    const dbResult = await currentDb.removePassword(info)
    if (dbResult == null) {
      throw new Error('No db result')
    }
    return dbResult
  }
}