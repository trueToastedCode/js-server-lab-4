export default function buildMakePassword ({ Id, Hash, isValidDate }) {
  return function makePassword ({
    id = Id.createId(),
    userId,
    passwordRaw,
    passwordHash,
    modifiedOn = Date.now()
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Invalid id')
    }

    if (!Id.isValidId(userId)) {
      throw new Error('Invalid user id')
    }
   
    if (passwordRaw != null) {
      /**
      * ^                            start of string
      * (?=.*\d)                     positive lookahead to assert that at least one digit is present
      * (?=\S)                       positive lookahead to assert that no whitespace characters are present
      * [\p{L}\p{N}\p{P}\p{S}]{8,64} match between 8 and 64 characters that consist of Unicode letters, digits, punctuation, and symbols
      * $                            end of string
      */
      if (!/^(?=.*\d)(?=\S)[\p{L}\p{N}\p{P}\p{S}]{8,64}$/u.test(passwordRaw)) {
        throw new Error('Password must be 8-64 characters long, can contain Unicode letters, digits, punctuation, and symbols with at least one digit')
      }
      passwordHash = Hash.hashSync(passwordRaw)
      passwordRaw = null
    } else if (typeof passwordHash != 'string') {
      throw new Error('Invalid password')
    } else if (passwordHash.length === 0) {
      throw new Error('No password supplied')
    }

    if (!isValidDate(modifiedOn)) {
      throw new Error('Invalid modified on date')
    }

    return Object.freeze({
      getId: () => id,
      getUserId: () => userId,
      getPasswordHash: () => passwordHash,
      comparePassword: (plain) => Hash.compareSync(plain, passwordHash),
      getModifiedOn: () => modifiedOn
    })
  }
}