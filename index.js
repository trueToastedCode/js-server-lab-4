import makeBalancedAmqpAccess from '../balanced-amqp-access'
import defaultAmqpSend from '../default-amqp-send'

import makeMsPasswordApiAccess from './ms-password-api-access'

export default makeMsPasswordApiAccess({ makeBalancedAmqpAccess, defaultAmqpSend })