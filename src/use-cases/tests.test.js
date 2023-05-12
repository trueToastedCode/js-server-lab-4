import { describe, test, expect } from 'vitest'
import Id from '../submodules/Id'

import {
  testAddPassword,
  removePassword,
  addPassword,
  changePassword,
  verifyPassword,
  findPassword
} from './index'

describe('#use cases', () => {
  const id = Id.createId()
  const userId = Id.createId()
  const password = 'password123'

  test('add password', async () => {
    const result = await addPassword({ id, userId, password })
    expect(result.id).toBe(id)
    expect(result.userId).toBe(userId)
    expect(result.modifiedOn).toBeTypeOf('number')
    expect(result.password).toBeUndefined()
  })

  test('verfiy password', async () => {
    const result = await verifyPassword({ id, password })
    expect(result.id).toBe(id)
    expect(result.userId).toBe(userId)
    expect(result.modifiedOn).toBeTypeOf('number')
    expect(result.password).toBeUndefined()
  })

  test('change password', async () => {
    const result = await changePassword({ id, password: 'hallo123' })
    expect(result.id).toBe(id)
    expect(result.userId).toBeUndefined()
    expect(result.modifiedOn).toBeTypeOf('number')
    expect(result.password).toBeUndefined()
  })

  test('verfiy invalid password', async () => {
    const error = await new Promise(async (resolve, reject) => {
      try {
        await verifyPassword({ userId, password })
        reject('No error thrown')
      } catch (e) {
        resolve(e.message)
      }
    })
    expect(error).toBeDefined()
  })

  test('find password', async () => {
    const result = await findPassword({ id })
    expect(result.id).toBe(id)
    expect(result.userId).toBe(userId)
    expect(result.modifiedOn).toBeTypeOf('number')
    expect(result.password).toBeUndefined()
  })

  test('add password twice', async () => {
    const error = await new Promise(async (resolve, reject) => {
      try {
        await addPassword({ id, userId, password })
        reject('No error thrown')
      } catch (e) {
        resolve(e.message)
      }
    })
    expect(error).toBeDefined()
  })

  test('test add password', async () => {
    const error = await new Promise(async (resolve, reject) => {
      try {
        await testAddPassword({ id, userId, password: 'password' })
        reject('No error thrown')
      } catch (e) {
        resolve(e.message)
      }
    })
    expect(error).toBeDefined()
  })

  test('remove password', async () => {
    const result1 = await removePassword({ userId })
    expect(result1).toBe(true)
    const result2 = await removePassword({ id })
    expect(result2).toBe(false)
  })
})