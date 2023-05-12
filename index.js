import Id from '../Id'
import isValidDate from '../is-valid-date'
import CustomError from '../custom-error'

import buildMakeUsername from './username'

export default buildMakeUsername({ Id, isValidDate, CustomError })