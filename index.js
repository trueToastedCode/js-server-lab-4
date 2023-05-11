import makeBalancedAmqpAccess from '../balanced-amqp-access'
import defaultAmqpSend from '../default-amqp-send'

import makeMsUsernameApiAccess from './ms-username-api-access'

export default makeMsUsernameApiAccess({ makeBalancedAmqpAccess, defaultAmqpSend })