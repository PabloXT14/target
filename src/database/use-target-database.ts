import { useSQLiteContext } from 'expo-sqlite'

export type TargetCreate = {
  name: string
  amount: number
}

export type TargetResponse = {
  id: number
  name: string
  amount: number
  current: number
  percentage: number
  created_at: Date
  updated_at: Date
}

export function useTargetDatabase() {
  const database = useSQLiteContext()

  async function create({ name, amount }: TargetCreate) {
    const statement = await database.prepareAsync(`
        INSERT INTO targets (name, amount) VALUES ($name, $amount)
    `)

    statement.executeAsync({
      $name: name,
      $amount: amount,
    })
  }

  async function listBySavedValue() {
    return await database.getAllAsync<TargetResponse>(`
      SELECT
        targets.id,
        targets.name,
        targets.amount
      FROM targets
    `)
  }

  return {
    create,
    listBySavedValue,
  }
}
