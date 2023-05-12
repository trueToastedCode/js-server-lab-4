import dotenv from 'dotenv'

import { makeDb } from '../src/data-access'

dotenv.config()

;(async function setupDb() {
  console.log('Setting up database...')
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await makeDb()
  const result = await db
    .collection(process.env.MS_CURRENT_API_DB_DEFAULT_COLLECTION)
    .createIndexes([
      { key: { userId: -1 }, name: 'userId_idx', unique: true }
    ])
  console.log(result)
  console.log('Database setup complete')
  process.exit()
})()