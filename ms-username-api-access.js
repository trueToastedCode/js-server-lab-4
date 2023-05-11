export default function makeMsUsernameApiAccess ({ makeBalancedAmqpAccess, defaultAmqpSend }) {
  const balancedAmqpAccess = makeBalancedAmqpAccess({
    urls: JSON.parse(process.env.MS_USERNAME_API_URLS),
    rpcQueue: process.env.MS_USERNAME_API_RPC_QUEUE,
    replyQueue: process.env.MS_USERNAME_API_REPLY_QUEUE
  })
  return Object.freeze({
    addUsername,
    removeUsername,
    cacheUsername,
    findUsername,
    changeUsername
  })
  function addUsername ({ id, userId, username } = {}) {
    return defaultAmqpSend({
      controllerName: 'addUsername',
      args: { id, userId, username },
      sendRPCMessage: balancedAmqpAccess.choice(),
      expectedStatusCode: 201
    })
  }
  function removeUsername ({ id, userId, username } = {}) {
    return defaultAmqpSend({
      controllerName: 'removeUsername',
      args: { id, userId, username },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function cacheUsername ({ id, userId, username } = {}) {
    return defaultAmqpSend({
      controllerName: 'cacheUsername',
      args: { id, userId, username },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function findUsername ({ id, userId, username } = {}) {
    return defaultAmqpSend({
      controllerName: 'findUsername',
      args: { id, userId, username },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function changeUsername ({ id, userId, username, newUsername } = {}) {
    return defaultAmqpSend({
      controllerName: 'changeUsername',
      args: { id, userId, username, newUsername },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
}