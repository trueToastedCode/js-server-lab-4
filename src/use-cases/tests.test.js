import { describe, test, expect } from 'vitest'

import {
  cacheUser,
  addUser,
  removeUser,
  findUser,
  testAddUser
} from './index'

describe('#use cases', () => {
  const username = 'user123'
  const password = 'password#1'
  let id

  test('test add user', async () => {
    await testAddUser({ username, password })
  })

  test('add user', async () => {
    const result = await addUser({ username, password })
    expect(result.id).toBeDefined()
    id = result.id
    expect(result.usernameId).toBeDefined()
    expect(result.passwordId).toBeDefined()
    expect(result.createdOn).toBeTypeOf('number')
    expect(result.username).toBeTypeOf('object')
    expect(result.password).toBeTypeOf('object')
  })

  test('find user by id', async () => {
    const result = await findUser({ id })
    expect(result.id).toBe(id)
    expect(result.usernameId).toBeDefined()
    expect(result.passwordId).toBeDefined()
    expect(result.username).toBeTypeOf('object')
    expect(result.password).toBeTypeOf('object')
  })
  
  test('cache user', async () => {
    await cacheUser({ id })
  })

  test('remove user', async () => {
    const result = await removeUser({ id })
    expect(result).toBe(true)
    const result2 = await removeUser({ id })
    expect(result2).toBe(false)
  })
})