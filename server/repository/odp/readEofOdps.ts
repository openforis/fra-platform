import * as db from '@server/db/db_deprecated'
import * as R from 'ramda'

export const eofReducer = (results: any, row: any, _type = 'fra') => [
  ...results,
  {
    odpId: row.odp_id,
    forestArea: row.forest_area,
    otherWoodedLand: row.other_wooded_land_area,
    name: `${row.year}`,
    type: 'odp',
    year: Number(row.year),
    dataSourceMethods: R.path(['data_source_methods', 'methods'], row),
    draft: row.draft,
  },
]

export const readEofOdps = async (countryIso: any, schemaName = 'public') => {
  const tableNameOdp = `${schemaName}._legacy_odp`
  const tableNameOdpVersion = `${schemaName}._legacy_odp_version`
  const tableNameOdpClass = `${schemaName}._legacy_odp_class`
  const res = await db.pool.query(
    `
    SELECT
      p.id as odp_id,
      v.year,
      v.data_source_methods,
      SUM(c.area * c.forest_percent / 100.0) AS forest_area,
      SUM(c.area * c.other_wooded_land_percent / 100.0) AS other_wooded_land_area,
      CASE
        WHEN p.draft_id IS NULL
        THEN FALSE
        ELSE TRUE
      END AS draft
    FROM ${tableNameOdp} p
    JOIN ${tableNameOdpVersion} v
    ON v.id =
      CASE WHEN p.draft_id IS NULL
      THEN p.actual_id
      ELSE p.draft_id
    END
    LEFT OUTER JOIN ${tableNameOdpClass} c
      ON c.odp_version_id = v.id
    WHERE p.country_iso = $1 AND year IS NOT NULL
    GROUP BY odp_id, v.year, v.data_source_methods, draft`,
    [countryIso]
  )
  return R.reduce(eofReducer, [], res.rows)
}
