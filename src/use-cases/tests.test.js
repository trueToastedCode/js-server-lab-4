import { describe, test, expect, expectTypeOf } from 'vitest'
import Id from '../submodules/Id'

import {
  findSessions,
  continueSession,
  findSession,
  removeSession,
  removeSessions,
  addSession
} from './index'

describe('#use cases', () => {
  const userId = Id.createId()
  let id
  let createdOn
  let token
  let lastActiveOn
  let expireAt

  test('add session', async () => {
    const result = await addSession({ userId })
    expect(result.id).toBeDefined()
    id = result.id
    expect(result.userId).toBe(userId)
    expect(result.createdOn).toBeTypeOf('number')
    createdOn = result.createdOn
    expect(result.lastActiveOn).toBeTypeOf('number')
    lastActiveOn = result.lastActiveOn
    expect(result.expireAt).toBeTypeOf('number')
    expireAt = result.expireAt
    expect(result.token).toBeTypeOf('string')
    token = result.token
  })

  test('continue session', async () => {
    const result = await continueSession({ token })
    expect(result.id).toBe(id)
    expect(result.lastActiveOn).toBeTypeOf('number')
    expect(result.lastActiveOn).toBeGreaterThan(lastActiveOn)
    lastActiveOn = result.lastActiveOn
    expect(result.expireAt).toBeTypeOf('number')
    expect(result.expireAt).toBeGreaterThan(expireAt)
    expireAt = result.expireAt
    expect(result.token).toBeTypeOf('string')
    token = result.token
  })

  test('find session', async () => {
    const result = await findSession({ id })
    expect(result.id).toBe(id)
    expect(result.userId).toBe(userId)
    expect(result.createdOn).toBe(createdOn)
    expect(result.lastActiveOn).toBe(lastActiveOn)
    expect(result.expireAt).toBe(expireAt)
  })

  test('find sessions', async () => {
    const result = await findSessions({ userId })
    expectTypeOf(result).toBeArray()
    expect(result.length).toBe(1)
    const item = result[0]
    expect(item.id).toBe(id)
    expect(item.userId).toBe(userId)
    expect(item.createdOn).toBe(createdOn)
    expect(item.lastActiveOn).toBe(lastActiveOn)
    expect(item.expireAt).toBe(expireAt)
  })

  test('remove session', async () => {
    const result = await removeSession({ token })
    expect(result).toBe(true)
  })

  test('remove session twice', async () => {
    const result = await removeSession({ token })
    expect(result).toBe(false)
  })

  test('remove sessions', async () => {
    await addSession({ userId })
    const result = await removeSessions({ userId })
    expect(result).toBe(true)
  })

  test('remove sessions twice', async () => {
    const result = await removeSessions({ userId })
    expect(result).toBe(false)
  })
})