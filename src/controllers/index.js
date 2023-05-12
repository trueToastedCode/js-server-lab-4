import makeDefaultController from '../submodules/default-controller'
    
import currentService from '../use-cases'

const testAddPassword = makeDefaultController({ ucFunc: currentService.testAddPassword })
const removePassword = makeDefaultController({ ucFunc: currentService.removePassword })
const addPassword = makeDefaultController({ ucFunc: currentService.addPassword })
const changePassword = makeDefaultController({ ucFunc: currentService.changePassword })
const verifyPassword = makeDefaultController({ ucFunc: currentService.verifyPassword })
const findPassword = makeDefaultController({ ucFunc: currentService.findPassword })

const currentControllers = Object.freeze({
  testAddPassword,
  removePassword,
  addPassword,
  changePassword,
  verifyPassword,
  findPassword
})

export default currentControllers
export {
  testAddPassword,
  removePassword,
  addPassword,
  changePassword,
  verifyPassword,
  findPassword
}