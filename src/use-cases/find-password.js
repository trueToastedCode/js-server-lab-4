export default function makeFindPassword ({ currentDb }) {
  return async function findPassword (info) {
    const result = await currentDb.findPassword(info)
    if (result == null) {
      throw new Error('Password not found')
    }
    delete result.password
    return result
  }
}