export default function makeCurrentDb ({ defaultDbFunctions }) {
  return Object.freeze({
    ...defaultDbFunctions,
    findPassword,
    removePassword
  })
  function findPassword (info) {
    return defaultDbFunctions.findOneByVarious(
      info, [ 'id', 'userId' ])
  }
  function removePassword (info) {
    return defaultDbFunctions.removeOneByVarious(
      info, [ 'id', 'userId' ])
  }
}