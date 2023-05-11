export default function makeCurrentDb ({ defaultDbFunctions }) {
  return Object.freeze({
    ...defaultDbFunctions,
    findUsername,
    removeUsername
  })
  function findUsername ({ id, userId, username } = {}) {
    if (id != null) {
      return defaultDbFunctions.findOne({ id })
    } else if (userId != null) {
      return defaultDbFunctions.findOne({ userId })
    } else if (username != null) {
      return defaultDbFunctions.findOne({ username })
    }
    throw new Error('No id, userId or username supplied')
  }
  function removeUsername ({ id, userId, username } = {}) {
    if (id != null) {
      return defaultDbFunctions.removeOne({ id })
    } else if (userId != null) {
      return defaultDbFunctions.removeOne({ userId })
    } else if (username != null) {
      return defaultDbFunctions.removeOne({ username })
    }
    throw new Error('No id, userId or username supplied')
  }
}