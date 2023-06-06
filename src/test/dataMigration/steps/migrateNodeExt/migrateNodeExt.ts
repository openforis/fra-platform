import * as pgPromise from 'pg-promise'

import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

import landArea from 'test/dataMigration/steps/updateCalculatedNodes/landArea'

export const migrateNodeExt = async (props: { assessment: Assessment; cycle: Cycle }, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const schemaCycle2020 = Schemas.getNameCycle(
    assessment,
    assessment.cycles.find((c) => c.name === '2020')
  )

  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(
    [
      'country_iso',
      'table_name',
      'variable_name',
      'col_name',
      {
        name: 'value',
        cast: 'jsonb',
      },
    ],
    {
      table: { table: 'node_ext', schema: schemaCycle },
    }
  )

  const sourceData =
    cycle.name === '2025'
      ? landArea
      : await client.one(
          `
with c as (select c.country_iso,
                  jsonb_object_keys(c.props -> 'faoStat') col_name,
                  c.props -> 'faoStat' as                 fao_stat
           from ${schemaCycle}.country c),
     c2 as (select c.country_iso,
                   jsonb_object_agg(c.col_name, jsonb_extract_path(c.fao_stat, c.col_name, 'area')) as data
            from c
            group by c.country_iso)
select jsonb_object_agg(c2.country_iso, c2.data) as data
from c2`,
          [],
          ({ data }) => data
        )

  // @ts-ignore
  const values = []
  Object.keys(sourceData).forEach((countryIso) => {
    Object.keys(sourceData[countryIso]).forEach((colName) => {
      if (!Number.isNaN(Number(colName))) {
        values.push({
          country_iso: countryIso,
          table_name: 'extentOfForest',
          variable_name: 'totalLandArea',
          col_name: colName,
          value: { raw: String(sourceData[countryIso][colName]) },
        })
      }
    })
  })

  // @ts-ignore
  const query = pgp.helpers.insert(values, cs)
  await client.query(query)

  if (cycle.name === '2025') {
    await client.query(`
        insert into ${schemaCycle}.node_ext (country_iso, table_name, variable_name, col_name, value)
        select country_iso, table_name, variable_name, col_name, value
        from ${schemaCycle2020}.node_ext
        where country_iso like 'X%'
    `)
  }
}
