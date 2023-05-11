import makeDefaultController from '../submodules/default-controller'
    
import currentService from '../use-cases'

const addUsername = makeDefaultController({ ucFunc: currentService.addUsername })
const removeUsername = makeDefaultController({ ucFunc: currentService.removeUsername })
const cacheUsername = makeDefaultController({ ucFunc: currentService.cacheUsername })
const findUsername = makeDefaultController({ ucFunc: currentService.findUsername })
const changeUsername = makeDefaultController({ ucFunc: currentService.changeUsername })

const currentControllers = Object.freeze({
  addUsername,
  removeUsername,
  cacheUsername,
  findUsername,
  changeUsername
})

export default currentControllers
export {
  addUsername,
  removeUsername,
  cacheUsername,
  findUsername,
  changeUsername
}