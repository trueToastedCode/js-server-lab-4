import makeUsername from '../submodules/username-entity'

export default function makeTestAddUsername ({ findUsername }) {
  return async function testAddUsername ({ id, userId, username } = {}) {
    const usernameEntity = makeUsername({ id: id ?? undefined, userId, username })
    let exists
    try {
      await findUsername({ username: usernameEntity.getUsername() })
      exists = true
    } catch (e) {
      exists = false
    }
    if (exists) {
      throw new Error('Username already exists')
    }
  }
}