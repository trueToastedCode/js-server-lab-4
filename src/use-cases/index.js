import { renameProperty } from '../submodules/rename-property'
import CustomError from '../submodules/custom-error'

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
const verifyPassword = makeVerifyPassword({ currentDb, renameProperty, CustomError })
const findPassword = makeFindPassword({ currentDb })
const changePassword = makeChangePassword({ currentDb, findPassword, CustomError })

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