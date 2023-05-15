export default function makeLoginUsernamePassword ({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, msSessionApiAccess, allSettledAndClean, CustomError }) {
  return async function loginUsernamePassword ({ username, password } = {}) {
    if (username == null) {
      throw new CustomError('No username supplied', 400)
    }
    if (password == null) {
      throw new CustomError('No password supplied', 400)
    }
    const findUsernameResult = await msUsernameApiAccess.findUsername({ username })
    if (findUsernameResult == null) {
      throw new CustomError('Username not found or password wrong', 400)
    }
    const results = await allSettledAndClean([
      (async () => {
        const result = await currentCache.getUser({ id: findUsernameResult.userId }) ?? await currentDb.findUser({ id: findUsernameResult.userId })
        if (result == null) {
          throw new Error('User not found')
        }
        return result
      })(),
      msPasswordApiAccess.verifyPassword({ userId: findUsernameResult.userId })
    ])
    const addSessionResult = await msSessionApiAccess.addSession({ userId: findUsernameResult.userId })
    return {
      user: {
        ...results[0],
        username: findUsernameResult,
        password: results[1]
      },
      session: addSessionResult
    }
  }
}