import { describe, test, expect } from 'vitest'
import Id from '../submodules/Id'

import { addUsername, removeUsername, cacheUsername, findUsername, changeUsername, testAddUsername } from './index'

describe('#use cases', () => {
  const userId = Id.createId()
  const username = 'user123'
  let id

  test('add username', async () => {
    const result = await addUsername({ userId, username })
    expect(result.id).toBeDefined()
    expect(result.userId).toBe(userId)
    expect(result.username).toBe(username)
    expect(result.modifiedOn).toBeTypeOf('number')
    id = result.id
  })

  test('find user', async () => {
    const result = await findUsername({ id })
    expect(result.id).toBe(id)
    expect(result.userId).toBe(userId)
    expect(result.username).toBe(username)
    expect(result.modifiedOn).toBeTypeOf('number')
  })

  test('test add exisitng usename', async () => {
    const error = await new Promise(async (resolve, reject) => {
      try {
        await testAddUsername({ userId, username })
        reject('No error')
      } catch (e) {
        resolve(e.message)
      }
    })
    expect(error).toBeDefined()
  })

  test('remove username by id', async () => {
    const result = await removeUsername({ id })
    expect(result).toBe(true)
    const result2 = await removeUsername({ id })
    expect(result2).toBe(false)
  })

  test('remove username by userId', async () => {
    await addUsername({ userId, username })
    const result = await removeUsername({ userId })
    expect(result).toBe(true)
    const result2 = await removeUsername({ userId })
    expect(result2).toBe(false)
  })

  test('remove username by username', async () => {
    await addUsername({ userId, username })
    const result = await removeUsername({ username })
    expect(result).toBe(true)
    const result2 = await removeUsername({ username })
    expect(result2).toBe(false)
  })

  test('add username twice', async () => {
    await addUsername({ userId, username })
    const error = await new Promise(async (resolve, reject) => {
      try {
        await addUsername({ userId: Id.createId(), username })
      } catch (e) {
        return resolve(e.message)
      }
      reject()
    })
    expect(error).toBeDefined()
  })

  test('cache username', async () => {
    const result = await cacheUsername({ username })
    expect(result.id).toBeDefined()
    expect(result.userId).toBeDefined()
    expect(result.username).toBe(username)
    expect(result.modifiedOn).toBeTypeOf('number')
    const result2 = await findUsername({ userId: result.userId })
    expect(result2.id).toBe(result.id)
    expect(result2.userId).toBe(result.userId)
    expect(result2.username).toBe(result.username)
    expect(result2.modifiedOn).toBe(result.modifiedOn)
    const result3 = await removeUsername({ username })
    expect(result3).toBe(true)
  })

  test('change username', async () => {
    const newUsername = 'user456'
    const result = await addUsername({ userId, username })
    await cacheUsername({ userId })
    const result2 = await changeUsername({ id: result.id, newUsername })
    expect(result2.id).toBe(result.id)
    expect(result2.username).toBe(newUsername)
    expect(result.modifiedOn).toBeTypeOf('number')
    await cacheUsername({ id: result.id })
    const result3 = await findUsername({ id: result.id })
    expect(result3.username).toBe(newUsername)
    const result4 = await removeUsername({ userId })
    expect(result4).toBe(true)
  })

  test('find deleted user', async () => {
    const error = new Promise(async (resolve, reject) => {
      try {
        await findUsername({ username })
      } catch (e) {
        return resolve(e.message)
      }
      reject()
    })
    expect(error).toBeDefined()
  })
})