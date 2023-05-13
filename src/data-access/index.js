import buildMakeDb from '../submodules/base-db-access'
import makeDefaultDbFunctions from '../submodules/default-db-functions'

const makeDb = buildMakeDb({
  url: process.env.MS_CURRENT_API_DB_URL,
  dbName: process.env.MS_CURRENT_API_DB_NAME
})

const currentDb = makeDefaultDbFunctions({
  makeDb,
  defaultCollection: process.env.MS_CURRENT_API_DB_DEFAULT_COLLECTION
})

export default currentDb
export { makeDb }