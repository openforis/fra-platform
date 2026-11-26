import { CacheController } from 'server/cache/controller'
import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  await client.query(`
    update public.assessment_cycle
    set props = props - 'dateDraft' - 'dateEditing'
    where props ? 'dateDraft' or props ? 'dateEditing'
  `)

  await CacheController.generateAssessments(client)
}
