import makePassword from '../submodules/password-entity'

export default function makeTestAddPassword ({ findPassword }) {
  return async function testAddPassword ({ id, userId, password } = {}) {
    makePassword({ id: id ?? undefined, userId, passwordRaw: password })
    let exists
    try {
      await findPassword({ id, userId })
      exists = true
    } catch (e) {
      exists = false
    }
    if (exists) {
      throw new Error('Password for user already exists')
    }
  }
}