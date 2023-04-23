import Token from '../Token'
import Id from '../Id'
import isValidDate from '../is-valid-date'

import buildMakeSession from './session'

export default buildMakeSession({ Token, Id, isValidDate })