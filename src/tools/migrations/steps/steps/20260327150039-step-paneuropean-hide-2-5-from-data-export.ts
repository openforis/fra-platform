import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Promises } from 'utils/promises'

import { SectionRedisRepository } from 'server/cache/repository/section'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { SectionRepository } from 'server/db/repository/assessment/section'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const sectionName = 'areaWithForestLandDegradation'

export default async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
  const subSection = await SectionRedisRepository.getSubSection({ assessment, cycle, sectionName })

  await SectionRepository.updateSubSection(
    {
      assessment,
      section: {
        ...subSection,
        props: {
          ...subSection.props,
          dataExport: false,
        },
      },
    },
    client
  )

  // dataExport is shared across cycles
  await Promises.each(assessment.cycles, async (currentCycle) => {
    await SectionRedisRepository.getMany({ assessment, cycle: currentCycle, force: true }, client)
    await SectionRedisRepository.getManyMetadata({ assessment, cycle: currentCycle, force: true }, client)
  })
}
