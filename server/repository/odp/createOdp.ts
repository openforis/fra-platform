import { insertAudit } from '@server/repository/audit/auditRepository'

export const createOdp = async (client: any, countryIso: any, user: any) => {
  await client.query('INSERT INTO odp (country_iso ) VALUES ($1)', [countryIso])
  const resSelectId = await client.query('SELECT last_value FROM odp_id_seq')
  const odpId = resSelectId.rows[0].last_value
  await insertAudit(client, user.id, 'createOdp', countryIso, 'odp', { odpId })
  return odpId
}
