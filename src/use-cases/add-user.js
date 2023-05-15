import makeUser from '../submodules/user-entity'

export default function makeAddUser ({ currentDb, msPasswordApiAccess, msUsernameApiAccess, allSettledAndClean, CustomError }) {
  return async function addUser ({ username, password } = {}) {
    if (username == null) {
      throw new CustomError('No username supplied', 400)
    }
    if (password == null) {
      throw new CustomError('No password supplied', 400)
    }
    const userEntity = makeUser()
    const results = await allSettledAndClean(
      [
        (async () => {
          const result = await currentDb.insertOne({
            id: userEntity.getId(),
            usernameId: userEntity.getUsernameId(),
            passwordId: userEntity.getPasswordId(),
            createdOn: userEntity.getCreatedOn()
          })
          if (result == null) {
            throw new Error('No db result')
          }
          return result
        })(),
        msUsernameApiAccess.addUsername({
          id: userEntity.getUsernameId(),
          userId: userEntity.getId(),
          username
        }),
        msPasswordApiAccess.addPassword({
          id: userEntity.getPasswordId(),
          userId: userEntity.getId(),
          password
        })
      ],
      [
        async () => {
          const result = await currentDb.removeOne({ id: userEntity.getId() })
          if (result == null) {
            throw new Error('No db result')
          }
          if (result === false) {
            throw new Error('User not removed')
          }
        },
        async () => {
          const result = await msUsernameApiAccess.removeUsername({ id: userEntity.getUsernameId() })
          if (result === false) {
            throw new Error('Username not removed')
          }
        },
        async () => {
          const result = msPasswordApiAccess.removePassword({ id: userEntity.getPasswordId() })
          if (result === false) {
            throw new Error('Username not removed')
          }
        }
      ]
    )
    return { ...results[0], username: results[1], password: results[2] }
  }
}