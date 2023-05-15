export default function makeFindUser ({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean }) {
  return async function findUser (info) {
    const findResult = await currentCache.getUser(info) ?? await currentDb.findUser(info)
    if (findResult == null) {
      throw new Error('User not found')
    }
    const results = await allSettledAndClean([
      msUsernameApiAccess.findUsername({ id: findResult.usernameId }),
      msPasswordApiAccess.findPassword({ id: findResult.passwordId })
    ])
    return { ...findResult, username: results[0], password: results[1] }
  }
}