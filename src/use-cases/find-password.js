export default function makeFindPassword ({ currentDb, currentCache }) {
  return async function findPassword (info) {
    const result = await currentCache.getPassword(info) ?? await currentDb.findPassword(info)
    if (result == null) {
      throw new Error('Password not found')
    }
    delete result.password
    return result
  }
}