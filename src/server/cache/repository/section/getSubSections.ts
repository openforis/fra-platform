import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName, SubSection } from 'meta/assessment/section'

import { getMany } from 'server/cache/repository/section/getMany'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

type Returned = Record<SectionName, SubSection>

export const getSubSections = async (props: Props): Promise<Returned> => {
  const { assessment, cycle } = props

  const sections = await getMany({ assessment, cycle })

  return sections.reduce<Returned>((acc, section) => {
    section.subSections?.forEach((subSection) => {
      acc[subSection.props.name] = subSection
    })
    return acc
  }, {})
}
