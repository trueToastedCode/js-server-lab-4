import Id from '../Id'
import isValidDate from '../is-valid-date'
import CustomError from '../custom-error'

import buildMakeUser from './user'

export default buildMakeUser({ Id, isValidDate, CustomError })