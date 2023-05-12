import makePassword from '../submodules/password-entity'

export default function makeVerifyPassword ({ currentDb, renameProperty, CustomError }) {
  return async function verifyPassword ({ id, userId, password } = {}) {
    if (password == null) {
        throw new CustomError('No password supplied', 400)
    }
    const result = await currentDb.findPassword({ id, userId })
    if (result == null) {
      throw new CustomError('Invalid user or password', 400)
    }
    const passwordEntity = makePassword(
      renameProperty(result, 'password', 'passwordHash'))
    const isMatch = passwordEntity.comparePassword(password)
    if (!isMatch) {
      throw new CustomError('Invalid user or password', 400)
    }
    delete result.password
    return result
  }
}