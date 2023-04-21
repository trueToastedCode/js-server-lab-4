export default function buildMakeSession ({ Id, isValidDate }) {
  return function makeSession ({
    id = Id.createId(),
    userId,
    createdOn = Date.now(),
    lastActiveOn = Date.now()
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Invalid id')
    }

    if (!Id.isValidId(userId)) {
      throw new Error('Invalid user id')
    }

    if (!isValidDate(createdOn)) {
      throw new Error('Invalid created on date')
    }

    if (!isValidDate(lastActiveOn)) {
      throw new Error('Invalid last active on date')
    }

    const now = Date.now()
    const msSinceLastActive = now - lastActiveOn
    lastActiveOn = now

    if (msSinceLastActive > 1.8e+6) {
      // more than 30 minutes
      throw new Error('Session inactive for more than 30 minutes')
    }

    if (lastActiveOn - createdOn > 8.64e+7) {
      // session older than one day
      throw new Error('Session max age of one day exceeded')
    }

    return Object.freeze({
      getId: () => id,
      getUserId: () => userId,
      getCreatedOn: () => createdOn,
      getLastActiveOn: () => lastActiveOn
    })
  }
}