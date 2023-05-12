export default function makeBuildMakeSession ({ Id, isValidDate, CustomError }) {
  return function buildMakeSession ({ Token }) {
    return function makeSession ({
      id = Id.createId(),
      userId,
      createdOn = Date.now(),
      lastActiveOn = Date.now()
    } = {}) {
      if (!Id.isValidId(id)) {
        throw new CustomError('Invalid id', 400)
      }
  
      if (!Id.isValidId(userId)) {
        throw new CustomError('Invalid user id', 400)
      }
  
      if (!isValidDate(createdOn)) {
        throw new CustomError('Invalid created on date', 400)
      }
  
      if (!isValidDate(lastActiveOn)) {
        throw new CustomError('Invalid last active on date', 400)
      }
  
      const now = Date.now()
      const msSinceLastActive = now - lastActiveOn
      lastActiveOn = now
  
      if (msSinceLastActive > 1.8e+6) {
        // more than 30 minutes
        throw new CustomError('Session inactive for more than 30 minutes', 400)
      }
  
      if (lastActiveOn - createdOn > 8.64e+7) {
        // session older than one day
        throw new CustomError('Session max age of one day exceeded', 400)
      }
  
      return Object.freeze({
        getId: () => id,
        getUserId: () => userId,
        getCreatedOn: () => createdOn,
        getLastActiveOn: () => lastActiveOn,
        getExpireAt: () => Math.min(lastActiveOn + 1.8e+6, createdOn + 8.64e+7),
        getToken: () => Token.sign({
          expireAt: Math.min(lastActiveOn + 1.8e+6, createdOn + 8.64e+7),
          data: { id }
        })
      })
    }
  }
}