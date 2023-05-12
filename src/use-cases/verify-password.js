import makePassword from '../submodules/password-entity'

export default function makeVerifyPassword ({ currentDb, renameProperty }) {
  return async function verifyPassword ({ id, userId, password } = {}) {
    if (password == null) {
        throw new Error('No password supplied')
    }
    const result = await currentDb.findPassword({ id, userId })
    if (result == null) {
      throw new Error('Invalid user or password')
    }
    const passwordEntity = makePassword(
      renameProperty(result, 'password', 'passwordHash'))
    const isMatch = passwordEntity.comparePassword(password)
    if (!isMatch) {
      throw new Error('Invalid user or password')
    }
    delete result.password
    return result
  }
}