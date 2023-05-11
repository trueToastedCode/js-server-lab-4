import makeUsername from '../submodules/username-entity'

export default function makeAddUsername ({ currentDb }) {
  return async function addUsername ({ id, userId, username } = {}) {
    const usernameEntity = makeUsername({ id: id ?? undefined, userId, username })
    const result = await currentDb.insertOne({
      id: usernameEntity.getId(),
      userId: usernameEntity.getUserId(),
      username: usernameEntity.getUsername(),
      modifiedOn: usernameEntity.getModifiedOn()
    })
    if (result == null) {
      throw new Error('No db result')
    }
    return result
  }
}