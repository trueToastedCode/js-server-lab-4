export default function makeRemovePassword ({ currentDb }) {
  return async function removePassword (info) {
    const result = await currentDb.removePassword(info)
    if (result == null) {
      throw new Error('No db result')
    }
    return result
  }
}