import makeBalancedAmqpAccess from '../balanced-amqp-access'
import defaultAmqpSend from '../default-amqp-send'

import makeMsSessionApiAccess from './ms-session-api-access'

export default makeMsSessionApiAccess({ makeBalancedAmqpAccess, defaultAmqpSend })