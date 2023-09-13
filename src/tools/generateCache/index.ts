import 'tsconfig-paths/register'
import 'dotenv/config'

import IORedis from 'ioredis'
import { Objects } from 'utils/objects'

import { Assessment, AssessmentNames, Cycle, SectionName, Table } from 'meta/assessment'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const redis = new IORedis(ProcessEnv.redisDataUrl)

const generateMetaDataCache = async (props: { assessment: Assessment; cycle: Cycle }, client: BaseProtocol) => {
  const { assessment, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const sections = await SectionRepository.getMany({ assessment, cycle }, client)
  const key = `metadata-sections:${assessmentName}-${cycleName}`
  await redis.set(key, JSON.stringify(sections))

  const sectionNames: Array<SectionName> = []
  sections.forEach((section) =>
    section.subSections.forEach((subSection) => {
      sectionNames.push(subSection.props.name)
    })
  )

  const sectionsMetadata = await SectionRepository.getManyMetadata({ assessment, cycle, sectionNames }, client)
  await Promise.all(
    Object.entries(sectionsMetadata).map(async ([name, tableSections]) => {
      const key = `metadata-section:${assessmentName}-${cycleName}-${name}`
      return redis.set(key, JSON.stringify(tableSections))
    })
  )
}

const generateDataCache = async (props: { assessment: Assessment; cycle: Cycle }, client: BaseProtocol) => {
  const { assessment, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  // ***** START

  const schemaName = Schemas.getName(assessment)

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

  const countries = await AreaController.getCountries({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)

  const data = await DataRepository.getTableData(
    {
      assessment,
      cycle,
      countryISOs,
      // dependencies,
      // aggregate: false,
      // columns: [],
      // mergeOdp: false,
      tables: tables.reduce((acc, table) => ({ ...acc, [table.props.name]: {} }), {}),
      // variables: [],
    },
    client
  )

  // persist data
  await Promise.all(
    countryISOs.map((countryIso) => {
      const keyData = `data:${assessmentName}-${cycleName}-${countryIso}`
      return redis.set(keyData, JSON.stringify(data[countryIso]))
    })
  )

  // persist odp data
  if (assessmentName === AssessmentNames.fra) {
    // eslint-disable-next-line no-await-in-loop
    const originalDataPointData = await DataRepository.getOriginalDataPointData(
      { assessment, cycle, countryISOs },
      client
    )
    await Promise.all(
      countryISOs.map((countryIso) => {
        const keyOdpData = `dataODP:${assessmentName}-${cycleName}-${countryIso}`
        return redis.set(keyOdpData, JSON.stringify(originalDataPointData[countryIso]))
      })
    )
    // eslint-disable-next-line no-await-in-loop
  }

  // eslint-disable-next-line no-await-in-loop
  // const getdd = JSON.parse(await redis.get(keyData)) as unknown as TableData
  // eslint-disable-next-line no-await-in-loop
  // const getdd2 = JSON.parse(await redis.get(keyOdpData)) as unknown as TableData
  // console.log(getdd, getdd2)

  // ***** END
}

const exec = async () => {
  await DB.tx(async (client) => {
    const assessments = await AssessmentController.getAll({ metaCache: true }, client)
    await Promise.all(
      assessments.map(async (assessment) =>
        Promise.all(
          assessment.cycles.map(async (cycle) => {
            await generateMetaDataCache({ assessment, cycle }, client)
            await generateDataCache({ assessment, cycle }, client)
          })
        )
      )
    )
  })
}

const start = new Date().getTime()
Logger.debug(`========== START GENERATE CACHE ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  DB.$pool.end()
  process.exit(0)
})
