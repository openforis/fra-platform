import 'tsconfig-paths/register'
import 'dotenv/config'

import { Assessment, Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db'
import { SectionRedisRepository } from 'server/repository/redis/section'
import { Logger } from 'server/utils/logger'

const generateMetadataCache = async (props: { assessment: Assessment; cycle: Cycle }) => {
  const { assessment, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const sections = await SectionRedisRepository.getMany({ assessment, cycle })
  Logger.info(`${assessmentName}-${cycleName}: "${sections.length} sections" generated`)

  const sectionsMetadata = await SectionRedisRepository.getManyMetadata({ assessment, cycle })
  Logger.info(`${assessmentName}-${cycleName}: "${Object.keys(sectionsMetadata).length} sectionsMetadata" generated`)
}

const exec = async () => {
  const assessments = await AssessmentController.getAll({})

  await Promise.all(
    assessments.map(async (assessment) =>
      Promise.all(
        assessment.cycles.map(async (cycle) => {
          await generateMetadataCache({ assessment, cycle })
          // await generateDataCache({ assessment, cycle }, client)
        })
      )
    )
  )
}

const start = new Date().getTime()
Logger.debug(`========== START GENERATE CACHE ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  DB.$pool.end()
  process.exit(0)
})
