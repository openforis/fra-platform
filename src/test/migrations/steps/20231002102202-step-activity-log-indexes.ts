import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
      CREATE INDEX IF NOT EXISTS idx_activity_log_cycle_message ON public.activity_log (cycle_uuid, message);
      CREATE INDEX IF NOT EXISTS idx_activity_log_filtering ON public.activity_log (assessment_uuid, cycle_uuid, country_iso, message, time DESC);
  `)
}
