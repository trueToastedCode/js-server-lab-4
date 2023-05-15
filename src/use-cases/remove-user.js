export default function makeRemoveUser ({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean }) {
  return async function removeUser (info) {
    const findResult = await currentCache.getUser(info) ?? await currentDb.findUser(info)
    if (findResult == null) {
      return false
    }
    const cacheResult = await currentCache.removeUser({ id: findResult.id })
    if (cacheResult == null) {
      throw new Error('No cache result')
    }
    const results = await allSettledAndClean([
      (async () => {
        const result = currentDb.removeUser({ id: findResult.id })
        if (result == null) {
          throw new Error('No db result')
        }
        return result
      })(),
      msUsernameApiAccess.removeUsername({ id: findResult.usernameId }),
      msPasswordApiAccess.removePassword({ id: findResult.passwordId })
    ])
    return results[0]
  }
}