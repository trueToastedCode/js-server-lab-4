import makePassword from '../submodules/password-entity'

export default function makeChangePassword ({ currentDb, findPassword }) {
  return async function changePassword ({ id, userId, password } = {}) {
    if (password == null) {
      throw new Error('No password supplied')
    }
    const findResult = await findPassword({ id, userId })
    const passwordEntity = makePassword({ ...findResult, passwordRaw: password, modifiedOn: undefined })
    const result = await currentDb.updateOne({
      id: passwordEntity.getId(),
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