import buildMakeSession from '../submodules/session-entity'
import CustomError from '../submodules/custom-error'

import currentDb from '../data-access'
import currentCache from '../cache-access'
import Token from '../token-access'

import makeFindSessions from './find-sessions'
import makeContinueSession from './continue-session'
import makeFindSession from './find-session'
import makeRemoveSession from './remove-session'
import makeRemoveSessions from './remove-sessions'
import makeAddSession from './add-session'

const makeSession = buildMakeSession({ Token })

const findSessions = makeFindSessions({ currentDb, CustomError })
const findSession = makeFindSession({ currentDb, currentCache, CustomError, Token })
const continueSession = makeContinueSession({ currentDb, currentCache, makeSession, findSession })
const removeSession = makeRemoveSession({ currentDb, currentCache, CustomError, Token })
const removeSessions = makeRemoveSessions({ currentDb, currentCache, findSessions })
const addSession = makeAddSession({ currentDb, currentCache, makeSession })

const currentService = Object.freeze({
  findSessions,
  continueSession,
  findSession,
  removeSession,
  removeSessions,
  addSession
})

export default currentService
export {
  findSessions,
  continueSession,
  findSession,
  removeSession,
  removeSessions,
  addSession
}