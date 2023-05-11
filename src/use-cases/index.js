import currentDb from '../data-access'
import currentCache from '../cache-access'

import makeAddUsername from './add-username'
import makeRemoveUsername from './remove-username'
import makeCacheUsername from './cache-username'
import makeFindUsername from './find-username'
import makeChangeUsername from './change-username'

const addUsername = makeAddUsername({ currentDb })
const removeUsername = makeRemoveUsername({ currentDb, currentCache })
const findUsername = makeFindUsername({ currentDb, currentCache })
const cacheUsername = makeCacheUsername({ currentCache, findUsername })
const changeUsername = makeChangeUsername({ currentDb, currentCache, findUsername })

const currentService = Object.freeze({
  addUsername,
  removeUsername,
  cacheUsername,
  findUsername,
  changeUsername
})

export default currentService
export {
  addUsername,
  removeUsername,
  cacheUsername,
  findUsername,
  changeUsername
}