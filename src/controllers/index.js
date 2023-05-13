import makeDefaultController from '../submodules/default-controller'
    
import currentService from '../use-cases'

const findSessions = makeDefaultController({ ucFunc: currentService.findSessions })
const continueSession = makeDefaultController({ ucFunc: currentService.continueSession })
const findSession = makeDefaultController({ ucFunc: currentService.findSession })
const removeSession = makeDefaultController({ ucFunc: currentService.removeSession })
const removeSessions = makeDefaultController({ ucFunc: currentService.removeSessions })
const addSession = makeDefaultController({ ucFunc: currentService.addSession })

const currentControllers = Object.freeze({
  findSessions,
  continueSession,
  findSession,
  removeSession,
  removeSessions,
  addSession
})

export default currentControllers
export {
  findSessions,
  continueSession,
  findSession,
  removeSession,
  removeSessions,
  addSession
}