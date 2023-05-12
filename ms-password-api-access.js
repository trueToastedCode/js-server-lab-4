export default function makeMsPasswordApiAccess ({ makeBalancedAmqpAccess, defaultAmqpSend }) {
  const balancedAmqpAccess = makeBalancedAmqpAccess({
    urls: JSON.parse(process.env.MS_PASSWORD_API_URLS),
    rpcQueue: process.env.MS_PASSWORD_API_RPC_QUEUE,
    replyQueue: process.env.MS_PASSWORD_API_REPLY_QUEUE
  })
  return Object.freeze({
    testAddPassword,
    removePassword,
    addPassword,
    changePassword,
    verifyPassword,
    findPassword
  })
  function testAddPassword ({ id, userId, password } = {}) {
    return defaultAmqpSend({
      controllerName: 'testAddPassword',
      args: { id, userId, password },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function removePassword ({ id, userId } = {}) {
    return defaultAmqpSend({
      controllerName: 'removePassword',
      args: { id, userId },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function addPassword ({ id, userId, password } = {}) {
    return defaultAmqpSend({
      controllerName: 'addPassword',
      args: { id, userId, password },
      sendRPCMessage: balancedAmqpAccess.choice(),
      expectedStatusCode: 201
    })
  }
  function changePassword ({ id, userId, password } = {}) {
    return defaultAmqpSend({
      controllerName: 'changePassword',
      args: { id, userId, password },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function verifyPassword ({ id, userId, password } = {}) {
    return defaultAmqpSend({
      controllerName: 'verifyPassword',
      args: { id, userId, password },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
  function findPassword ({ id, userId } = {}) {
    return defaultAmqpSend({
      controllerName: 'findPassword',
      args: { id, userId },
      sendRPCMessage: balancedAmqpAccess.choice()
    })
  }
}