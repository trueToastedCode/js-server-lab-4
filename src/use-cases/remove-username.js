export default function makeRemoveUsername ({ currentDb, currentCache }) {
  return async function removeUsername (info) {
    const results = await Promise.all([
      currentDb.removeUsername(info),
      currentCache.removeUsername(info)
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