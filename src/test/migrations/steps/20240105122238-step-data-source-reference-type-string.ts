import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { CommentableDescription, DataSource, SectionName } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

type DataSourceOld = Omit<DataSource, 'reference'> & {
  reference: {
    text: string
    link?: string
  }
}

type DBType<T> = {
  id: number
  countryIso: CountryIso
  sectionName: SectionName
  name: string
  value: { text: string; dataSources: Array<T> }
}

// Update old dataSource reference from object to a string
const _fixReference = (reference: { text: string; link?: string }): string => {
  if (typeof reference === 'string') return reference
  if (reference.link) {
    return `<p><a href="${reference.link}">${reference.text}</a></p>`
  }
  return `<p>${reference.text}</p>`
}

const _fixDataSource = (dataSource: DataSourceOld): DataSource => ({
  ...dataSource,
  reference: _fixReference(dataSource.reference),
})

const _fixValue = (value: { text: string; dataSources: Array<DataSourceOld> }) => ({
  ...value,
  dataSources: value.dataSources.map((ds) => _fixDataSource(ds)),
})

const _fixRow = (row: DBType<DataSourceOld>): DBType<DataSource> => ({
  ...row,
  value: _fixValue(row.value),
})

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const rowsToUpdate = await client.map<DBType<DataSourceOld>>(
        `
            select * from ${schemaCycle}.descriptions
            where value ->> 'dataSources' is not null`,
        [],
        (row) => Objects.camelize(row)
      )

      const fixedRows: Array<DBType<DataSource>> = rowsToUpdate.map((row) => ({
        ..._fixRow(row),
      }))

      const pgp = pgPromise()
      const cs = new pgp.helpers.ColumnSet<CommentableDescription>(
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
          table: { table: 'descriptions', schema: schemaCycle },
        }
      )

      const query = `${pgp.helpers.update(fixedRows, cs)} where v.id = t.id;`
      await client.query(query)
    })
  )
}
