export default function makeMsSessionApiAccess ({ makeBalancedAmqpAccess, defaultAmqpSend }) {
  const balancedAmqpAccess = makeBalancedAmqpAccess({
    urls: JSON.parse(process.env.MS_SESSION_API_URLS),
    rpcQueue: process.env.MS_SESSION_API_RPC_QUEUE,
    replyQueue: process.env.MS_SESSION_API_REPLY_QUEUE
  })
  return Object.freeze({
    findSessions,
    continueSession,
    findSession,
    removeSession,
    removeSessions,
    addSession
  })
  function findSessions ({ userId }) {
    return defaultAmqpSend({
      controllerName: 'findSessions',
      args: { userId },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function continueSession ({ id, token } = {}) {
    return defaultAmqpSend({
      controllerName: 'continueSession',
      args: { id, token },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function findSession ({ id, token } = {}) {
    return defaultAmqpSend({
      controllerName: 'findSession',
      args: { id, token },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function removeSession ({ id, token } = {}) {
    return defaultAmqpSend({
      controllerName: 'removeSession',
      args: { id, token },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function removeSessions ({ userId }) {
    return defaultAmqpSend({
      controllerName: 'removeSessions',
      args: { userId },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function addSession ({ id, userId } = {}) {
    return defaultAmqpSend({
      controllerName: 'addSession',
      args: { id, userId },
      sendRPCMessage: balancedAmqpAccess.choice(),
      expectedStatusCode: 201
    })
  }
}