import buildMakeCache from '../submodules/base-cache-access'
import makeDefaultCacheFunctions from '../submodules/default-cache-functions'

const makeCache = buildMakeCache({ url: process.env.MS_CURRENT_API_CACHE_URL })

const currentCache = makeDefaultCacheFunctions({
  makeCache,
  prefix: process.env.MS_CURRENT_API_CACHE_PREFIX
})

export default currentCache
export { makeCache }