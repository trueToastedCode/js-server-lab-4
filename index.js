import makeBalancedAmqpAccess from '../balanced-amqp-access'
import defaultAmqpSend from '../default-amqp-send'

import makeMsUserApiAccess from './ms-user-api-access'

export default makeMsUserApiAccess({ makeBalancedAmqpAccess, defaultAmqpSend })