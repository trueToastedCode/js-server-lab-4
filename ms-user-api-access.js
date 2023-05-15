export default function makeMsUserApiAccess ({ makeBalancedAmqpAccess, defaultAmqpSend }) {
  const balancedAmqpAccess = makeBalancedAmqpAccess({
    urls: JSON.parse(process.env.MS_USER_API_URLS),
    rpcQueue: process.env.MS_USER_API_RPC_QUEUE,
    replyQueue: process.env.MS_USER_API_REPLY_QUEUE
  })
  return Object.freeze({
    cacheUser,
    addUser,
    removeUser,
    findUser,
    testAddUser
  })
  function cacheUser ({ id, usernameId, passwordId } = {}) {
    return defaultAmqpSend({
      controllerName: 'cacheUser',
      args: { id, usernameId, passwordId },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function addUser ({ username, password } = {}) {
    return defaultAmqpSend({
      controllerName: 'addUser',
      args: { username, password },
      sendRPCMessage: balancedAmqpAccess.choice(),
      expectedStatusCode: 201
    })
  }
  function removeUser ({ id, usernameId, passwordId } = {}) {
    return defaultAmqpSend({
      controllerName: 'removeUser',
      args: { id, usernameId, passwordId },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function findUser ({ id, usernameId, passwordId } = {}) {
    return defaultAmqpSend({
      controllerName: 'findUser',
      args: { id, usernameId, passwordId },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function testAddUser ({ username, password } = {}) {
    return defaultAmqpSend({
      controllerName: 'testAddUser',
      args: { username, password },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
}