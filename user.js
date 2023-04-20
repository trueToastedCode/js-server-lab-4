export default function buildMakeUser ({ Id, isValidDate }) {
  return function makeUser ({
    id = Id.createId(),
    createdOn = Date.now(),
    usernameId,
    passwordId
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Invalid id')
    }

    if (!isValidDate(createdOn)) {
      throw new Error('Invalid created on date')
    }

    if (!Id.isValidId(usernameId)) {
      throw new Error('Invalid username id')
    }

    if (!Id.isValidId(passwordId)) {
      throw new Error('Invalid password id')
    }

    return Object.freeze({
      getId: () => id,
      getCreatedOn: () => createdOn,
      getUsernameId: () => usernameId,
      getPasswordId: () => passwordId
    })
  }
}