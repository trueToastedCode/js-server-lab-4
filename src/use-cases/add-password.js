import makePassword from '../submodules/password-entity'

export default function makeAddPassword ({ currentDb }) {
  return async function addPassword ({ id, userId, password } = {}) {
    const passwordEntity = makePassword({ id: id ?? undefined, userId, passwordRaw: password })
    const result = await currentDb.insertOne({
      id: passwordEntity.getId(),
      userId: passwordEntity.getUserId(),
      password: passwordEntity.getPasswordHash(),
      modifiedOn: passwordEntity.getModifiedOn()
    })
    if (result == null) {
      throw new Error('No db result')
    }
    delete result.password
    return result
  }
}