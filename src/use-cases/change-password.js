import makePassword from '../submodules/password-entity'

export default function makeChangePassword ({ currentDb, currentCache, CustomError }) {
  return async function changePassword ({ id, userId, password } = {}) {
    if (password == null) {
      throw new CustomError('No password supplied', 400)
    }
    const findResult = await currentCache.getPassword({ id, userId }) ?? await currentDb.findPassword({ id, userId })
    if (findResult == null) {
      throw new Error('Password not found')
    }
    const passwordEntity = makePassword({ ...findResult, passwordRaw: password, modifiedOn: undefined })
    const cacheRmResult = await currentCache.removePassword({ id: passwordEntity.getId(), userId: passwordEntity.getUserId() })
    if (cacheRmResult == null) {
      throw new Error('No cache result')
    }
    const dbUpdateResult = await currentDb.updateOne({
      id: passwordEntity.getId(),
      password: passwordEntity.getPasswordHash(),
      modifiedOn: passwordEntity.getModifiedOn()
    })
    if (dbUpdateResult == null) {
      throw new Error('No db result')
    }
    delete dbUpdateResult.password
    if (cacheRmResult === false) {
      return dbUpdateResult
    }
    const cacheSetResult = await currentCache.setPassword({
      info: {
        id: passwordEntity.getId(),
        userId: passwordEntity.getUserId(),
        password: passwordEntity.getPasswordHash(),
        modifiedOn: passwordEntity.getModifiedOn()
      },
      timeLeftS: process.env.PASSWORD_CACHE_S
    })
    if (cacheSetResult == null) {
      throw new Error('No cache result')
    }
    return dbUpdateResult
  }
}