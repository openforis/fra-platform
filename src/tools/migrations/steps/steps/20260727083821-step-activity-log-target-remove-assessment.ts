import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  await client.query(`
    update public.activity_log
    set target = target - 'assessment'
    where message = 'assessmentStatusUpdate'
      and target ? 'assessment'
  `)
}
