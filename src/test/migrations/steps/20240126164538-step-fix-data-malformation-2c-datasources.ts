import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, DataSource, SectionName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

type DBType = {
  id: number
  countryIso: CountryIso
  sectionName: SectionName
  name: string
  value: { text: string; dataSources: Array<DataSource> }
}

type Props = { assessment: Assessment; cycle: Cycle }

// Malformed data example:
// "reference": { text: "NFI 2007-2011" }
// expected: "reference": "NFI 2007-2011"
const _malformedData = async (props: Props, client: BaseProtocol): Promise<Array<DBType>> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<DBType>(
    `
        with data_sources as (
            select id, (jsonb_array_elements_text(value -> 'dataSources')::jsonb) as d
            from ${schemaCycle}.descriptions
            where name = 'dataSources')
        select descriptions.*
        from data_sources
                 left join ${schemaCycle}.descriptions on data_sources.id = descriptions.id
        where d -> 'reference' -> 'text' is not null
`,
    [],
    (row) => Objects.camelize(row)
  )
}

const _convertReferenceToString = (dataSource: DataSource): DataSource => {
  if (typeof dataSource.reference === 'object' && dataSource.reference !== null) {
    // @ts-ignore
    const reference = dataSource.reference.text
    return { ...dataSource, reference }
  }
  return dataSource
}

const _fixData = (data: DBType): DBType => {
  return {
    ...data,
    value: {
      ...data.value,
      dataSources: data.value.dataSources.map(_convertReferenceToString),
    },
  }
}
const _writeDb = async (props: Props, fixedData: Array<DBType>, client: BaseProtocol) => {
  const { assessment, cycle } = props
  const schema = Schemas.getNameCycle(assessment, cycle)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet<DBType>(
    [
      {
        name: 'value',
        cast: 'jsonb',
      },
      {
        name: 'id',
        cast: 'bigint',
        cnd: true,
      },
    ],
    {
      table: { table: 'descriptions', schema },
    }
  )

  const query = `${pgp.helpers.update(fixedData, cs)} WHERE v.id = t.id;`
  await client.query(query)
}

export default async (client: BaseProtocol) => {
  const params = { assessmentName: 'fra', cycleName: '2025' }
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(params, client)

  const malformedData = await _malformedData({ assessment, cycle }, client)
  if (malformedData.length === 0) return

  const fixedData = malformedData.map(_fixData)
  await _writeDb({ assessment, cycle }, fixedData, client)
}
