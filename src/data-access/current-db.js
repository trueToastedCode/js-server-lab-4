export default function makeCurrentDb ({ defaultDbFunctions }) {
  return Object.freeze({
    ...defaultDbFunctions,
    findUsername,
    removeUsername
  })
  function findUsername ({ id, userId, username } = {}) {
    return defaultDbFunctions.findOneByVarious(
      { id, userId, username }, [ 'id', 'userId', 'username' ])
  }
  function removeUsername ({ id, userId, username } = {}) {
    return defaultDbFunctions.removeOneByVarious(
      { id, userId, username }, [ 'id', 'userId', 'username' ])
  }
}