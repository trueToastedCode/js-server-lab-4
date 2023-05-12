import Id from '../Id'
import isValidDate from '../is-valid-date'
import CustomError from '../custom-error'

import makeBuildMakeSession from './session'

export default makeBuildMakeSession({ Id, isValidDate, CustomError })