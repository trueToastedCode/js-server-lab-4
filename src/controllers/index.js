import makeDefaultController from '../submodules/default-controller'
    
import currentService from '../use-cases'

const cacheUser = makeDefaultController({ ucFunc: currentService.cacheUser })
const addUser = makeDefaultController({ ucFunc: currentService.addUser, statusCode: 201 })
const removeUser = makeDefaultController({ ucFunc: currentService.removeUser })
const findUser = makeDefaultController({ ucFunc: currentService.findUser })
const testAddUser = makeDefaultController({ ucFunc: currentService.testAddUser })
const loginUsernamePassword = makeDefaultController({ ucFunc: currentService.loginUsernamePassword })

const currentControllers = Object.freeze({
  cacheUser,
  addUser,
  removeUser,
  findUser,
  testAddUser,
  loginUsernamePassword
})

export default currentControllers
export {
  cacheUser,
  addUser,
  removeUser,
  findUser,
  testAddUser,
  loginUsernamePassword
}