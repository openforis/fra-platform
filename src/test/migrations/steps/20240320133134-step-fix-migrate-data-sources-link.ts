import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { ApiEndPoint } from 'meta/api/endpoint'
import {
  Assessment,
  AssessmentNames,
  CommentableDescription,
  CommentableDescriptionValue,
  Cycle,
  DataSource,
} from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { Logger } from 'server/utils/logger'

const oldUrl = '/api/file/assessment/'

const _fixAnchors = async (a: string, schemaName: string, client: BaseProtocol): Promise<Record<string, string>> => {
  const fileUuid = a.split(oldUrl)[1].split('?')[0]
  const { assessmentName, cycleName, countryIso } = a
    .replaceAll('#x26;', '')
    .split('?')[1]
    .split('"')[0]
    .split('&')
    .reduce((acc, curr) => {
      // eslint-disable-next-line no-param-reassign,prefer-destructuring
      acc[curr.split('=')[0]] = curr.split('=')[1]
      return acc
    }, {} as any)

  const x = await client.one<RepositoryItem>(
    `
        select * from ${schemaName}.repository r
        where file_uuid = $1
    `,
    [fileUuid]
  )

  const { uuid } = x
  const urlParams = new URLSearchParams({ assessmentName, cycleName, countryIso })
  const newUrl = `${ApiEndPoint.CycleData.Repository.File.one(uuid)}?${urlParams.toString()}`

  return { [a]: a.replace(/<a href="([^"]+)"/g, `<a href="${newUrl}"`) }
}
const _fixReference = async (reference: string, schemaName: string, client: BaseProtocol) => {
  if (!reference.includes(oldUrl)) return reference

  // ([^"]+): match any character except " one or more times
  // ": match the character "
  const regex = /<a href="([^"]+)"/g

  const anchors = reference.match(regex).filter((a) => a.includes(oldUrl))
  if (anchors.length === 0) return reference
  const fixedAnchors = await Promise.all(anchors.map((a) => _fixAnchors(a, schemaName, client)))

  const fixedReference = fixedAnchors.reduce((acc, curr) => {
    return Object.entries(curr).reduce((acc, [k, v]) => {
      // Logger.debug(`Fixing data source:\n\t${k}\nto\n\t${v}`)
      return acc.replace(k, v)
    }, acc)
  }, reference)
  return fixedReference
}
const _fixDatasource = async (dataSource: DataSource, schemaName: string, client: BaseProtocol) => {
  const { reference } = dataSource
  const oldUrl = '/api/file/assessment/'
  if (!reference.includes(oldUrl)) {
    return dataSource
  }

  const fixedReference = await _fixReference(reference, schemaName, client)
  return { ...dataSource, reference: fixedReference }
}
const _fixValue = async (value: CommentableDescriptionValue, schemaName: string, client: BaseProtocol) => {
  const dataSources = await Promise.all(value.dataSources.map((ds) => _fixDatasource(ds, schemaName, client)))
  return {
    ...value,
    dataSources,
  }
}
const _fixDescription = async (description: CommentableDescription, schemaName: string, client: BaseProtocol) => {
  Logger.debug(`Fixed data source for:\t${description.countryIso}\t${description.sectionName}`)
  // Logger.debug(
  //   `http://localhost:9000/assessments/fra/2025/${description.countryIso}/sections/${description.sectionName}`
  // )
  const value = await _fixValue(description.value, schemaName, client)
  return { ...description, value }
}

// Fix all data sources with old file api link
export default async (client: BaseProtocol, _assessment?: Assessment) => {
  const assessment = _assessment ?? (await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client))

  await Promises.each(assessment.cycles, async (cycle: Cycle) => {
    const schemaName = Schemas.getNameCycle(assessment, cycle)
    // 1. Get all data sources with old file api link
    const descriptions = await client.map<CommentableDescription>(
      `
          with data_sources as (
              select id, jsonb_array_elements(d.value -> 'dataSources') as data_sources from ${schemaName}.descriptions d where d.value ->> 'dataSources' is not null
              )
          select d.* from data_sources
                              left join ${schemaName}.descriptions d on d.id = data_sources.id
          where data_sources ->> 'reference' ilike '%api/file/assessment%'
      `,
      [],
      (row) => Objects.camelize(row)
    )

    if (descriptions.length === 0) {
      return
    }
    Logger.debug(`Assessment, cycle:\t${assessment.props.name}\t${cycle.name}`)

    // 2. Fix all data source
    const fixed = await Promise.all(descriptions.map((d) => _fixDescription(d, schemaName, client)))

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
        table: { table: 'descriptions', schema: schemaName },
      }
    )

    const query = `${pgp.helpers.update(fixed, cs)} where v.id = t.id;`
    await client.query(query)
  })
}
