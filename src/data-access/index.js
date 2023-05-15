import buildMakeDb from '../submodules/base-db-access'
import makeDefaultDbFunctions from '../submodules/default-db-functions'

import makeCurrentDb from './current-db'

const makeDb = buildMakeDb({
  url: process.env.MS_CURRENT_API_DB_URL,
  dbName: process.env.MS_CURRENT_API_DB_NAME
})

const defaultDbFunctions = makeDefaultDbFunctions({
  makeDb,
  defaultCollection: process.env.MS_CURRENT_API_DB_DEFAULT_COLLECTION
})

const currentDb = makeCurrentDb({ defaultDbFunctions })

export default currentDb
export { makeDb }