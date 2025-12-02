import pgPromise from 'pg-promise'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type DataSourceDB<T = string> = {
  type?: string
  uuid: string
  year?: T
  comments?: string
  reference?: string
  variables?: Array<string>
}

type DescriptionValueDB<T = string> = {
  text: string
  dataSources?: Array<DataSourceDB<T>>
}

interface DescriptionDB<T = string> {
  id: number
  country_iso: string
  value: DescriptionValueDB<T>
}

const _isValidYearFormat = (year: string): boolean => {
  // allow only numbers, comma and space
  return /^[\d,\s]+$/.test(year)
}

const _fixDataSourceYear = (year: string | Array<string>): Array<string> => {
  // In case double running the step:
  if (Array.isArray(year)) {
    return year
  }

  if (Objects.isEmpty(year)) return []

  if (!_isValidYearFormat(year)) {
    return [year]
  }

  // if comma separated years
  if (year.includes(',')) {
    return year.split(',').reduce<Array<string>>((acc, y) => {
      const trimmed = y.trim()
      if (trimmed.length > 0) acc.push(trimmed)
      return acc
    }, [])
  }

  return [year]
}

const _fixDataSource = (dataSource: DataSourceDB): DataSourceDB<Array<string>> => {
  return {
    ...dataSource,
    year: _fixDataSourceYear(dataSource.year),
  }
}

const _fixDescription = (description: DescriptionValueDB): DescriptionValueDB<Array<string>> => {
  return {
    ...description,
    dataSources: description.dataSources.map(_fixDataSource),
  }
}

const _fixAssessmentCycleDescriptions = async (
  assessment: Assessment,
  cycle: Cycle,
  client: BaseProtocol
): Promise<void> => {
  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const descriptionsToUpdate = await client.manyOrNone<DescriptionDB>(`
    select id, country_iso, value
    from ${schemaName}.descriptions
    where name = 'dataSources'
      and jsonb_array_length(value->'dataSources') > 0
  `)

  const pgp = pgPromise()

  await Promises.each(descriptionsToUpdate, async (record) => {
    // fix
    const fixedValue = _fixDescription(record.value)

    // write
    const cs = new pgp.helpers.ColumnSet(['value'], { table: { table: 'descriptions', schema: schemaName } })
    const query = `${pgp.helpers.update({ value: fixedValue }, cs)} where id = $1`
    await client.none(query, [record.id])
  })
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      await _fixAssessmentCycleDescriptions(assessment, cycle, client)
    })
  )
}
