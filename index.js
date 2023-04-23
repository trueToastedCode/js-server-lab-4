import jwt from 'jsonwebtoken'

import Id from '../Id'
import isValidDate from '../is-valid-date'

import buildMakeSession from './session'

export default buildMakeSession({ jwt, Id, isValidDate })