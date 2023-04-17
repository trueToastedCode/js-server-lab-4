import Id from '../Id'
import Hash from '../Hash'
import isValidDate from '../is-valid-date'

import buildMakePassword from './password'

export default buildMakePassword({ Id, Hash, isValidDate })