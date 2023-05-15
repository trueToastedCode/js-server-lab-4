import msUsernameApiAccess from '../submodules/ms-username-api-access'
import msPasswordApiAccess from '../submodules/ms-password-api-access'
import allSettledAndClean from '../submodules/all-settled-and-clean'

import currentDb from '../data-access'
import currentCache from '../cache-access'

import makecacheUser from './cache-user'
import makeAddUser from './add-user'
import makeRemoveUser from './remove-user'
import makeFindUser from './find-user'
import makeTestAddUser from './test-add-user'

const cacheUser = makecacheUser({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean })
const addUser = makeAddUser({ currentDb, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean })
const removeUser = makeRemoveUser({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean })
const findUser = makeFindUser({ currentDb, currentCache, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean })
const testAddUser = makeTestAddUser({ msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean })

const currentService = Object.freeze({
  cacheUser,
  addUser,
  removeUser,
  findUser,
  testAddUser
})

export default currentService
export {
  cacheUser,
  addUser,
  removeUser,
  findUser,
  testAddUser
}