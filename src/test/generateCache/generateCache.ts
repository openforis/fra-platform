import { Objects } from '@utils/objects'
import IORedis from 'ioredis'

import { Assessment, AssessmentNames, Table } from '@meta/assessment'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'
import { ProcessEnv } from '@server/utils'
import { Logger } from '@server/utils/logger'

afterAll(async () => {
  await DB.$pool.end()
})

const generateDataCache = async (props: { assessment: Assessment }, client: BaseProtocol) => {
  const redis = new IORedis(ProcessEnv.redisUrl)

  const { assessment } = props
  for (let i = 0; i < assessment.cycles.length; i += 1) {
    const cycle = assessment.cycles[i]

    // ***** START

    const schemaName = Schemas.getName(assessment)
    // eslint-disable-next-line no-await-in-loop
    const tables = await client.map<Table>(
      `
          select t.*
          from ${schemaName}.table t
          where props -> 'cycles' ? $1;
      `,
      [cycle.uuid],
      (table) => {
        const { props, ...rest } = table
        return {
          ...Objects.camelize(rest),
          props,
        }
      }
    )

    // eslint-disable-next-line no-await-in-loop
    const countries = await AreaController.getCountries({ assessment, cycle }, client)
    const countryISOs = countries.map((c) => c.countryIso)

    // eslint-disable-next-line no-await-in-loop
    const data = await CycleDataController.getTableData(
      {
        assessment,
        cycle,
        countryISOs,
        // dependencies,
        aggregate: false,
        columns: [],
        mergeOdp: false,
        tableNames: tables.map((table) => table.props.name),
        variables: [],
      },
      client
    )

    const keyData = `fra:data:${assessment.props.name}-${cycle.name}`
    // eslint-disable-next-line no-await-in-loop
    await redis.set(keyData, JSON.stringify(data))

    if (assessment.props.name === AssessmentNames.fra) {
      // eslint-disable-next-line no-await-in-loop
      const originalDataPointData = await DataRepository.getOriginalDataPointData(
        { assessment, cycle, countryISOs },
        client
      )
      const keyOdpData = `fra:dataODP:${assessment.props.name}-${cycle.name}`
      // eslint-disable-next-line no-await-in-loop
      await redis.set(keyOdpData, JSON.stringify(originalDataPointData))
    }

    // eslint-disable-next-line no-await-in-loop
    // const getdd = JSON.parse(await redis.get(keyData)) as unknown as TableData
    // eslint-disable-next-line no-await-in-loop
    // const getdd2 = JSON.parse(await redis.get(keyOdpData)) as unknown as TableData
    // console.log(getdd, getdd2)

    // ***** END
  }
}

describe('Generate cache', () => {
  test('*', async () => {
    const start = new Date().getTime()
    Logger.debug(`========== START GENERATE CACHE ${start}`)

    await DB.tx(async (client) => {
      const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)
      await generateDataCache({ assessment }, client)
      const panEuropean = await AssessmentController.getOne({ assessmentName: 'panEuropean', metaCache: true }, client)
      await generateDataCache({ assessment: panEuropean }, client)
    })

    const end = new Date().getTime()
    Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
    process.exit(0)
  })
})
