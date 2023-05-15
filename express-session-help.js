export default function makeExpressSessionHelp ({ msSessionApiAccess, msUserApiAccess }) {
  return Object.freeze({
    setAuthCookie,
    authCookieMiddleware
  })
  function setAuthCookie (res, session) {
    res.cookie(
      'auth',
      session.token,
      {
        maxAge: session.expireAt - Date.now(),
        httpOnly: true
      }
    )
  }
  async function authCookieMiddleware (req, res, next) {
    const token = req.cookies.auth
    if (token == null) {
      req.session = null
      req.user = null
      return next()
    }
    try {
      let session = await msSessionApiAccess.continueSession({ token })
      setAuthCookie(res, session)
      req.session = Object.freeze(session)
      req.user = await msUserApiAccess.cacheUser({ id: session.userId })
    } catch (e) {
      req.session = null
      req.user = null
      res.clearCookie('auth')
    }
    next()
  }
}