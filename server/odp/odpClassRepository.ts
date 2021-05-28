import * as R from 'ramda'

import { deleteIssuesByIds } from '../repository/review/reviewRepository'

export const getOdpNationalClasses = async (client: any, odpVersionId: any, schemaName = 'public') => {
  const tableName = `${schemaName}.odp_class`
  const res = await client.query(
    `
    SELECT
      name, definition, area,
      forest_percent, other_wooded_land_percent, forest_natural_percent,
      forest_plantation_percent, forest_plantation_introduced_percent, other_planted_forest_percent,
      uuid
    FROM ${tableName}
    WHERE odp_version_id = $1
    ORDER BY id`,
    [odpVersionId]
  )

  return res.rows.map((row: any) => ({
    className: row.name,
    definition: row.definition,
    area: row.area,
    forestPercent: row.forest_percent,
    otherWoodedLandPercent: row.other_wooded_land_percent,
    naturalForestPercent: row.forest_natural_percent,
    plantationPercent: row.forest_plantation_percent,
    plantationIntroducedPercent: row.forest_plantation_introduced_percent,
    otherPlantedPercent: row.other_planted_forest_percent,
    uuid: row.uuid,
  }))
}

export const wipeNationalClassIssues = async (client: any, odpId: any, countryIso: any, nationalClasses: any) => {
  const hasClasses = nationalClasses.length > 0
  const classUuids = nationalClasses.map((c: any) => `"${c.uuid}"`)
  const classQueryPlaceholders = R.range(3, nationalClasses.length + 3)
    .map((i: any) => `$${i}`)
    .join(',')

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
  const issueIds = res.rows.map((r: any) => r.issue_id)

  await deleteIssuesByIds(client, issueIds)

  return { odpId }
}

export const addClassData = async (client: any, odpVersionId: any, odp: any) => {
  const nationalInserts = R.map(
    (nationalClass: any) =>
      client.query(
        `INSERT INTO odp_class
        (odp_version_id,
        name,
        definition,
        area,
        forest_percent,
        other_wooded_land_percent,
        forest_natural_percent,
        forest_plantation_percent,
        forest_plantation_introduced_percent,
        other_planted_forest_percent,
        uuid)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        [
          odpVersionId,
          nationalClass.className,
          nationalClass.definition,
          nationalClass.area,
          nationalClass.forestPercent,
          nationalClass.otherWoodedLandPercent,
          nationalClass.naturalForestPercent,
          nationalClass.plantationPercent,
          nationalClass.plantationIntroducedPercent,
          nationalClass.otherPlantedPercent,
          nationalClass.uuid,
        ]
      ),
    odp.nationalClasses
  )
  return await Promise.all(nationalInserts)
}

export const wipeClassData = async (client: any, odpVersionId: any) =>
  await client.query('DELETE FROM odp_class WHERE odp_version_id = $1', [odpVersionId])

export default {
  getOdpNationalClasses,
  addClassData,
  wipeClassData,
  wipeNationalClassIssues,
}
