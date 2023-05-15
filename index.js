import msSessionApiAccess from '../ms-session-api-access'
import msUserApiAccess from '../ms-user-api-access'

import makeExpressSessionHelp from './express-session-help'

export default makeExpressSessionHelp({ msSessionApiAccess, msUserApiAccess })