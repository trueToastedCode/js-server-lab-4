export default function makeCachePassword ({ currentCache, currentDb }) {
  return async function cachePassword (info) {
    const findResult = await currentCache.getPassword(info) ?? await currentDb.findPassword(info)
    if (findResult == null) {
      throw new Error('Password not found')
    }
    const result = await currentCache.setPassword({
      info: findResult,
      timeLeftS: process.env.PASSWORD_CACHE_S,
      unique: false
    })
    if (result == null) {
      throw new Error('No cache result')
    }
    delete result.password
    return result
  }
}