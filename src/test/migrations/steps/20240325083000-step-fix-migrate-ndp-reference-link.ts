import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames, Cycle, OriginalDataPoint } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const oldUrl = '/api/file/assessment/'

const _fixReference = async (
  originalDataPoint: OriginalDataPoint,
  schemaName: string,
  client: BaseProtocol
): Promise<OriginalDataPoint> => {
  let updatedDataSourceReferences = originalDataPoint.dataSourceReferences

  const regex = /<a href="([^"]+)"/g
  const anchors = updatedDataSourceReferences.match(regex).filter((a) => a.includes(oldUrl))

  if (anchors.length === 0) return originalDataPoint

  // eslint-disable-next-line no-restricted-syntax
  for (const a of anchors) {
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

    // eslint-disable-next-line no-await-in-loop
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

    updatedDataSourceReferences = updatedDataSourceReferences.replace(a, `<a href="${newUrl}"`)
  }

  return {
    ...originalDataPoint,
    dataSourceReferences: updatedDataSourceReferences,
  }
}

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)

  await Promises.each(assessment.cycles, async (cycle: Cycle) => {
    const schemaName = Schemas.getNameCycle(assessment, cycle)
    // 1. Get all data sources with old file api link
    const odps = await client.map<OriginalDataPoint>(
      `
          select * from ${schemaName}.original_data_point
          where data_source_references ilike '%api/file/assessment%'
      `,
      [],
      (row) => Objects.camelize(row)
    )

    if (odps.length === 0) {
      Logger.debug(`No data source with old file api link in:\t${assessment.props.name}\t${cycle.name}`)
      return
    }
    Logger.debug(`Assessment, cycle:\t${assessment.props.name}\t${cycle.name}`)

    // 2. Fix all odps
    const fixed = await Promise.all(odps.map((d) => _fixReference(d, schemaName, client)))

    // 3. write db
    const pgp = pgPromise()
    const cs = new pgp.helpers.ColumnSet<OriginalDataPoint>(
      [
        { name: 'data_source_references', cast: 'text', prop: 'dataSourceReferences' },
        { name: 'id', cast: 'bigint', cnd: true },
      ],
      { table: { table: 'original_data_point', schema: schemaName } }
    )

    fixed.forEach((odp) => {
      Logger.debug(`Fixed data source for:\t${odp.countryIso}\t${odp.year}`)
      // log env url, replace port 9001 with 9000 for localhost
      const url = ProcessEnv.appUri.replace('9001', '9000')
      Logger.debug(`${url}/assessments/fra/2025/${odp.countryIso}/originalDataPoints/${odp.year}/extentOfForest`)
    })

    const query = `${pgp.helpers.update(fixed, cs)} where v.id = t.id;`
    await client.query(query)

    Logger.debug(`Fixed data source count: ${fixed.length}`)
  })
}
