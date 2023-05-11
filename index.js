import makeBalancedAmqpAccess from '../balanced-amqp-access'
import defaultAmqpSend from '../default-amqp-send'
import parseEnvList from '../parse-env-list'

import makeMsPasswordApiAccess from './ms-username-api-access'

export default makeMsPasswordApiAccess({ makeBalancedAmqpAccess, defaultAmqpSend, parseEnvList })