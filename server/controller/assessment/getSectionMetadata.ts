import { BaseProtocol, DB } from '@server/db'
import { AssessmentRepository } from '@server/repository'
import { AssessmentName, TableSection } from '@meta/assessment'

export const getSectionMetadata = async (
  props: { assessmentName: AssessmentName; section: string },
  client: BaseProtocol = DB
): Promise<TableSection> => {
  const { assessmentName, section } = props

  return client.tx(async (t) => {
    const assessment = await AssessmentRepository.read({ name: assessmentName }, t)
    const sectionMetadata = await AssessmentRepository.getSectionMetaData(
      {
        assessment,
        section,
      },
      t
    )

    return sectionMetadata
  })
}
