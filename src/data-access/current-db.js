export default function makeCurrentDb ({ defaultDbFunctions }) {
  return Object.freeze({
    ...defaultDbFunctions,
    findUsername,
    removeUsername
  })
  function findUsername (info) {
    return defaultDbFunctions.findOneByVarious(
      info, [ 'id', 'userId', 'username' ])
  }
  function removeUsername (info) {
    return defaultDbFunctions.removeOneByVarious(
      info, [ 'id', 'userId', 'username' ])
  }
}