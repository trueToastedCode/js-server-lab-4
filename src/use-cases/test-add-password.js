import makePassword from '../submodules/password-entity'

export default function makeTestAddPassword () {
  return function testAddPassword ({ id, userId, password } = {}) {
    makePassword({ id: id ?? undefined, userId, passwordRaw: password })
  }
}