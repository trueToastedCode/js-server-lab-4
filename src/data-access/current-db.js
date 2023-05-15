export default function makeCurrentDb ({ defaultDbFunctions }) {
  return Object.freeze({
    ...defaultDbFunctions,
    findUser,
    removeUser
  })
  function findUser (info) {
    return defaultDbFunctions.findOneByVarious(
      info, [ 'id', 'usernameId', 'passwordId' ])
  }
  function removeUser (info) {
    return defaultDbFunctions.removeOneByVarious(
      info, [ 'id', 'usernameId', 'passwordId' ])
  }
}