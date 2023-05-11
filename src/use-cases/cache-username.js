export default function makeCacheUsername ({ currentCache, findUsername }) {
  return async function cacheUsername (info) {
    const findResult = await findUsername(info)
    return currentCache.setUsername({
      info: findResult,
      timeLeftS: process.env.USERNAME_CACHE_S,
      unique: false
    })
  }
}