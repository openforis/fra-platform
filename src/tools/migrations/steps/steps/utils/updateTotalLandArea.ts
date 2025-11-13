import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { NodeExtType } from 'meta/nodeExt'
import { User } from 'meta/user'

import { DataRedisRepository } from 'server/cache/repository/data'
import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { updateDependents } from 'server/controller/cycleData/updateDependencies/updateDependents'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export type TotalLandAreaUpdateData = {
  [countryIso in CountryIso]?: Array<{ year: number; value: number }>
}

type Props = {
  cycleName: CycleName
  data: TotalLandAreaUpdateData
  user: User
}

type Meta = Record<ColName, { colUuid: string; rowUuid: string }>

const assessmentName = AssessmentNames.fra
const tableName = TableNames.extentOfForest
const variableName = 'totalLandArea'

export const updateTotalLandArea = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { cycleName, data, user } = props

  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName, metaCache: true },
    client
  )
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

      const query = values.reduce<Array<string>>((acc, { value, year }) => {
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
        ({ value, year }) => `
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

  // 6. update dependents
  await Promises.each(dataEntries, async ([_countryIso, values]) => {
    const countryIso = _countryIso as CountryIso
    const country = await AreaController.getCountry({ assessment, countryIso, cycle }, client)
    const nodes = values.reduce<Array<NodeUpdate>>((acc, value) => {
      const { value: raw, year } = value
      const colName = String(year)
      acc.push({ tableName, variableName, colName, value: { raw } })
      return acc
    }, [])
    const nodeUpdates: NodeUpdates = { assessmentName, cycleName, countryIso, nodes }
    await updateDependents({ assessment, cycle, country, nodeUpdates, notifyClients: false, user }, client)
  })
}
