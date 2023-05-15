export default function makecacheUser ({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean }) {
  return async function cacheUser (info) {
    const findResult = await currentCache.getUser(info) ?? await currentDb.findUser(info)
    if (findResult == null) {
      throw new Error('User not found')
    }
    const results = await allSettledAndClean([
      (async () => {
        const result = await currentCache.setUser({
          info: findResult,
          timeLeftS: process.env.USER_CACHE_S,
          unique: false
        })
        if (result == null) {
          throw new Error('No cache result')
        }
        return result
      })(),
      msUsernameApiAccess.cacheUsername({ id: findResult.usernameId }),
      msPasswordApiAccess.cachePassword({ id: findResult.passwordId })
    ])
    return { ...results[0], username: results[1], password: results[2] }
  }
}