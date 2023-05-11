import dotenv from 'dotenv'

import listenReactAmqp from './submodules/listen-react-amqp'
import healthCheckServer from './submodules/healthcheck-server'

import currentControllers from './controllers'

dotenv.config()

let isServiceHealthy = false

healthCheckServer({ getIsHealthy: () => isServiceHealthy })

listenReactAmqp({
  url: process.env.MS_CURRENT_API_RABBITMQ_URL,
  queue: process.env.MS_CURRENT_API_RABBITMQ_QUEUE,
  controllers: currentControllers,
  healthyCallback: () => isServiceHealthy = true
})