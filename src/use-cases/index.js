import { renameProperty } from '../submodules/rename-property'

import currentDb from '../data-access'

import makeTestAddPassword from './test-add-password'
import makeRemovePassword from './remove-password'
import makeAddPassword from './add-password'
import makeChangePassword from './change-password'
import makeVerifyPassword from './verify-password'
import makeFindPassword from './find-password'

const testAddPassword = makeTestAddPassword()
const removePassword = makeRemovePassword({ currentDb })
const addPassword = makeAddPassword({ currentDb })
const verifyPassword = makeVerifyPassword({ currentDb, renameProperty })
const findPassword = makeFindPassword({ currentDb })
const changePassword = makeChangePassword({ currentDb, findPassword })

const currentService = Object.freeze({
  testAddPassword,
  removePassword,
  addPassword,
  changePassword,
  verifyPassword,
  findPassword
})

export default currentService
export {
  testAddPassword,
  removePassword,
  addPassword,
  changePassword,
  verifyPassword,
  findPassword
}