import { deleteIssuesByIds } from '@server/repository/review/reviewRepository'
import { BaseProtocol, DB } from '@server/db'

export const wipeNationalClassIssues = async (
  options: { odpId: any; countryIso: any; nationalClasses: any },
  client: BaseProtocol = DB
) => {
  const { odpId, countryIso, nationalClasses } = options
  const hasClasses = nationalClasses.length > 0
  const classUuids = nationalClasses.map((c: any) => `"${c.uuid}"`)
  const classQueryPlaceholders = [...Array(nationalClasses.length).keys()].map((x) => `$${x + 3}`).join(',')

  const res = await client.query(
    `
      SELECT
        i.id as issue_id
      FROM issue i
      WHERE i.country_iso = $1
      AND i.section = $2
      AND i.target #> '{params,0}' = '"${odpId}"'
      ${
        hasClasses
          ? `AND i.target #> '{params,2}' NOT IN (${classQueryPlaceholders})`
          : `AND i.target #> '{params,1}' = '"class"'`
      }
    `,
    hasClasses ? [countryIso, 'odp', ...classUuids] : [countryIso, 'odp']
  )

  console.log({ res })
  const issueIds = res.map((r: any) => r.issue_id)

  await deleteIssuesByIds(client, issueIds)

  return { odpId }
}
