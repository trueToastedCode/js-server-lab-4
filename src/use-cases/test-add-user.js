import makeUser from '../submodules/user-entity'

export default function makeTestAddUser ({ msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean }) {
  return function testAddUser ({ username, password } = {}) {
    if (username == null) {
      throw new Error('No username supplied')
    }
    if (password == null) {
      throw new Error('No password supplied')
    }
    const userEntity = makeUser()
    return allSettledAndClean([
      msUsernameApiAccess.testAddUsername({ username, userId: userEntity.getId() }),
      msPasswordApiAccess.testAddPassword({ password, userId: userEntity.getId() })
    ])
  }
}