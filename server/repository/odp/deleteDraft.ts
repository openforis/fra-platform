import { getOdpNationalClasses, wipeNationalClassIssues } from '@server/repository/odpClass/odpClassRepository'
import { OdpService } from '@server/service'
import { getAndCheckOdpCountryId } from './getAndCheckOdpCountryId'

export const deleteDraft = async (client: any, odpId: any, user: any) => {
  const countryIso = await getAndCheckOdpCountryId(client, odpId, user)
  const actualRes = await client.query('SELECT actual_id FROM odp WHERE id = $1', [odpId])
  const actualId = actualRes.rows[0].actual_id
  if (actualId) {
    await client.query('UPDATE odp SET draft_id = null WHERE id = $1', [odpId])
    const odpVersionId = await OdpService.getOdpVersionId(client, odpId)
    const odpClasses = await getOdpNationalClasses(client, odpVersionId)
    return wipeNationalClassIssues(client, odpId, countryIso, odpClasses)
  }

  return OdpService.deleteOdp(client, odpId, user)
}
