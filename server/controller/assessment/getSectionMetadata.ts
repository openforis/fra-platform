import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { AssessmentName, TableSection } from '@meta/assessment'

export const getSectionMetadata = async (
  props: { assessmentName: AssessmentName; section: string; cycleName: string },
  client: BaseProtocol = DB
): Promise<Array<TableSection>> => {
  const { assessmentName, section, cycleName } = props

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)
    const cycle = assessment.cycles.find((cycle) => cycle.name === cycleName)
    const sectionMetadata = await AssessmentRepository.getSectionMetaData(
      {
        cycle,
        assessment,
        section,
      },
      t
    )

    return sectionMetadata
  })
}
