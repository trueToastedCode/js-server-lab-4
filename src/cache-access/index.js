import buildMakeCache from '../submodules/base-cache-access'
import makeDefaultCacheFunctions from '../submodules/default-cache-functions'

import makeCurrentCache from './current-cache'

const makeCache = buildMakeCache({ url: process.env.MS_CURRENT_API_CACHE_URL })

const defaultCacheFunctions = makeDefaultCacheFunctions({ makeCache })

const currentCache = makeCurrentCache({ defaultCacheFunctions })

export default currentCache
export { makeCache }