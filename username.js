export default function buildMakeUsername ({ Id, isValidDate, CustomError }) {
  return function makeUsername ({
    id = Id.createId(),
    userId,
    username,
    modifiedOn = Date.now()
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new CustomError('Invalid id', 400)
    }

    if (!Id.isValidId(userId)) {
      throw new CustomError('Invalid user id', 400)
    }

    username = username.trim()

    /** 
    * /^            Start of the string
    * (?=.{2,20}$)  Positive lookahead to match between 2 and 20 characters
    *               '.' matches any character, and '{2,20}' means between 2 and 20 times
    * [\p{L}\p{N}\-_]+ Match one or more Unicode letters or digits or underscore or minus
    * $/u           End of the string
    */
    if (!/^(?=.{2,20}$)[\p{L}\p{N}\-_]+$/u.test(username)) {
      throw new CustomError(`Username must be 2-20 characters long, can contain Unicode letters or digits but no whitespace, punctuation or symbols with the exception of underscore and minus`, 400)
    }

    if (!isValidDate(modifiedOn)) {
      throw new CustomError('Invalid modified on date', 400)
    }

    return Object.freeze({
      getId: () => id,
      getUserId: () => userId,
      getUsername: () => username,
      getModifiedOn: () => modifiedOn
    })
  }
}