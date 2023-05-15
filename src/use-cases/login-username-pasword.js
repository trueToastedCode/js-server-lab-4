export default function makeLoginUsernamePassword ({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, msSessionApiAccess, allSettledAndClean, CustomError }) {
  return async function loginUsernamePassword ({ username, password } = {}) {
    if (username == null) {
      throw new CustomError('No username supplied', 400)
    }
    if (password == null) {
      throw new CustomError('No password supplied', 400)
    }
    let findUsernameResult
    try {
      findUsernameResult = await msUsernameApiAccess.findUsername({ username })
    } catch (e) {
      throw new CustomError('Username not found or password wrong', 400)
    }
    const results = await allSettledAndClean([
      (async () => {
        const result = await currentCache.getUser({ id: findUsernameResult.userId }) ?? await currentDb.findUser({ id: findUsernameResult.userId })
        if (result == null) {
          throw new CustomError('Username not found or password wrong', 400)
        }
        return result
      })(),
      (async () => {
        try {
          return await msPasswordApiAccess.verifyPassword({ userId: findUsernameResult.userId, password })
        } catch (e) {
          throw new CustomError('Username not found or password wrong', 400)
        }
      })()
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