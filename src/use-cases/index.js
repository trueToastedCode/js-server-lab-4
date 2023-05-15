import { renameProperty, copyRenameProperty } from '../submodules/rename-property'
import CustomError from '../submodules/custom-error'

import currentDb from '../data-access'
import currentCache from '../cache-access'

import makeTestAddPassword from './test-add-password'
import makeRemovePassword from './remove-password'
import makeAddPassword from './add-password'
import makeChangePassword from './change-password'
import makeVerifyPassword from './verify-password'
import makeFindPassword from './find-password'
import makeCachePassword from './cache-password'

const removePassword = makeRemovePassword({ currentDb, currentCache })
const addPassword = makeAddPassword({ currentDb })
const verifyPassword = makeVerifyPassword({ currentDb, currentCache, copyRenameProperty, CustomError })
const findPassword = makeFindPassword({ currentDb, currentCache })
const testAddPassword = makeTestAddPassword({ findPassword })
const changePassword = makeChangePassword({ currentDb, currentCache, CustomError })
const cachePassword = makeCachePassword({ currentCache, currentDb })

const currentService = Object.freeze({
  testAddPassword,
  removePassword,
  addPassword,
  changePassword,
  verifyPassword,
  findPassword,
  cachePassword
})

export default currentService
export {
  testAddPassword,
  removePassword,
  addPassword,
  changePassword,
  verifyPassword,
  findPassword,
  cachePassword
}