export default function buildMakeUser ({ Id, isValidDate, CustomError }) {
  return function makeUser ({
    id = Id.createId(),
    createdOn = Date.now(),
    usernameId = Id.createId(),
    passwordId = Id.createId()
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new CustomError('Invalid id', 400)
    }

    if (!isValidDate(createdOn)) {
      throw new CustomError('Invalid created on date', 400)
    }

    if (!Id.isValidId(usernameId)) {
      throw new CustomError('Invalid username id', 400)
    }

    if (!Id.isValidId(passwordId)) {
      throw new CustomError('Invalid password id', 400)
    }

    return Object.freeze({
      getId: () => id,
      getCreatedOn: () => createdOn,
      getUsernameId: () => usernameId,
      getPasswordId: () => passwordId
    })
  }
}