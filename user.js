export default function buildMakeUser ({ Id, isValidDate }) {
  return function makeUser ({
    id = Id.createId(),
    createdOn = Date.now()
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Invalid id')
    }

    if (!isValidDate(createdOn)) {
      throw new Error('Invalid created on date')
    }

    return Object.freeze({
      getId: () => id,
      getCreatedOn: () => createdOn
    })
  }
}