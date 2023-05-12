export default function makeCacheUsername ({ currentCache, findUsername }) {
  return async function cacheUsername (info) {
    const findResult = await findUsername(info)
    const result = await currentCache.setUsername({
      info: findResult,
      timeLeftS: process.env.USERNAME_CACHE_S,
      unique: false
    })
    if (result == null) {
      throw new Error('No cache result')
    }
    return result
  }
}