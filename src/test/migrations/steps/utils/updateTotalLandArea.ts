import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { AssessmentNames, ColName, CycleName, TableNames } from 'meta/assessment'
import { NodeExtType } from 'meta/nodeExt'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { DataRedisRepository } from 'server/repository/redis/data'

export type TotalLandAreaUpdateData = {
  [countryIso in CountryIso]?: Array<{ year: number; value: number }>
}

type Props = {
  cycleName: CycleName
  data: TotalLandAreaUpdateData
}

type Meta = Record<ColName, { colUuid: string; rowUuid: string }>

const assessmentName = AssessmentNames.fra
const tableName = TableNames.extentOfForest
const variableName = 'totalLandArea'

export const updateTotalLandArea = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { cycleName, data } = props

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const dataEntries = Object.entries(data)

  // 1. delete node
  await client.query(
    dataEntries.map(([countryIso, values]) => {
      const years = values.map((value) => `'${value.year}'`).join(', ')

      return `delete
              from ${schemaCycle}.node
              where id in
                    (select n.id
                     from ${schemaCycle}.node n
                              left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                              left join ${schemaAssessment}.row r on r.id = c.row_id
                              left join ${schemaAssessment}."table" t on t.id = r.table_id
                     where n.country_iso = '${countryIso}'
                       and t.props ->> 'name' = '${tableName}'
                       and r.props ->> 'variableName' = '${variableName}'
                       and c.props ->> 'colName' in (${years}))
      `
    }).join(`;
  `)
  )

  // 2. delete node_ext
  await client.query(
    dataEntries.map(([countryIso, values]) => {
      const years = values.map((value) => `'${value.year}'`).join(', ')

      return `delete
              from ${schemaCycle}.node_ext
              where id in
                    (select n.id
                     from ${schemaCycle}.node_ext n
                     where n.type = 'node'
                       and n.props ->> 'variableName' = '${variableName}'
                       and n.props ->> 'tableName' = '${tableName}'
                       and n.props ->> 'colName' in (${years})
                       and n.country_iso = '${countryIso}')
      `
    }).join(`;
  `)
  )

  // 3. insert node
  await Promise.all(
    dataEntries.map(async ([countryIso, values]) => {
      const years = values.map((value) => `'${value.year}'`).join(', ')
      const meta = await client.one<Meta>(
        `
            select jsonb_object_agg(
                           c.props ->> 'colName',
                           jsonb_build_object('colUuid', c.uuid, 'rowUuid', r.uuid)
                   ) as meta
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on r.id = c.row_id
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' = '${tableName}'
              and r.props ->> 'variableName' = '${variableName}'
              and c.props ->> 'colName' in (${years})
              and c.props -> 'cycles' ? '${cycle.uuid}'
        `,
        [],
        ({ meta }) => meta
      )

      const query = values.reduce<Array<string>>((acc, { year, value }) => {
        if (meta[year]) {
          const query = `
              insert into ${schemaCycle}.node (country_iso, row_uuid, col_uuid, value)
              values ('${countryIso}', '${meta[year].rowUuid}', '${meta[year].colUuid}',
                      jsonb_build_object('raw', '${value}'))
          `
          acc.push(query)
        }
        return acc
      }, []).join(`; 
    `)
      return client.query(query)
    })
  )

  // 4. insert node_ext
  await Promise.all(
    dataEntries.map(async ([countryIso, values]) => {
      const query = values.map(
        ({ year, value }) => `
            insert into ${schemaCycle}.node_ext (country_iso, props, type, value)
            values ('${countryIso}',
                    jsonb_build_object(
                            'tableName', '${tableName}', 'variableName', '${variableName}', 'colName', '${year}'
                    ),
                    '${NodeExtType.node}',
                    jsonb_build_object('raw', '${value}'))
        `
      ).join(`;
    `)
      return client.query(query)
    })
  )

  // 5. update data cache
  await Promises.each(dataEntries, async ([countryIso]) => {
    const propsCache = { assessment, cycle, countryIso: countryIso as CountryIso, force: true }
    await DataRedisRepository.cacheCountryTable({ ...propsCache, tableName }, client)
    await DataRedisRepository.cacheCountryTable({ ...propsCache, tableName: TableNames.originalDataPointValue }, client)
  })
}
