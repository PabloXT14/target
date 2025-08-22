import { useSQLiteContext } from 'expo-sqlite'

export type TransactionCreate = {
  target_id: number
  amount: number
  observation?: string
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

  return {
    create,
  }
}
