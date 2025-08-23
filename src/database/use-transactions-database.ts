import { useSQLiteContext } from 'expo-sqlite'

export type TransactionCreate = {
  target_id: number
  amount: number
  observation?: string
}

export type TransactionResponse = {
  id: number
  target_id: number
  amount: number
  observation?: string
  created_at: Date
  updated_at: Date
}

export function useTransactionsDatabase() {
  const database = useSQLiteContext()

  async function create({ target_id, amount, observation }: TransactionCreate) {
    const statement = await database.prepareAsync(`
      INSERT INTO transactions (target_id, amount, observation) VALUES ($target_id, $amount, $observation)
    `)

    await statement.executeAsync({
      $target_id: target_id,
      $amount: amount,
      $observation: observation || null,
    })
  }

  function findByTargetId(target_id: number) {
    return database.getAllAsync<TransactionResponse>(
      `
      SELECT id, target_id, amount, observation, created_at, updated_at
      FROM transactions
      WHERE target_id = ${target_id}
      ORDER BY created_at DESC
      `
    )
  }

  return {
    create,
    findByTargetId,
  }
}
