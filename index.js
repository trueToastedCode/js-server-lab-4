import Id from '../Id'
import Hash from '../Hash'
import isValidDate from '../is-valid-date'
import CustomError from '../custom-error'

import buildMakePassword from './password'

export default buildMakePassword({ Id, Hash, isValidDate, CustomError })