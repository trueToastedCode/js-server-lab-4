export default function makeFindUsername ({ currentDb, currentCache }) {
  return async function findUsername (info) {
    const result = await currentCache.getUsername(info) ?? await currentDb.findUsername(info)
    if (result == null) {
      throw new Error('Username not found')
    }
    return result
  }
}