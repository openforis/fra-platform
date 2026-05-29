import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'
import { LinkToVisit } from 'meta/cycleData/links/link'
import { Routes } from 'meta/routes/routes'
import { Htmls } from 'utils/htmls'

import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionIds: Array<number>
}

type Returned = {
  descriptions: Array<CommentableDescription>
  linksToVisit: Array<LinkToVisit>
}

export const getDescriptionLinks = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, descriptionIds } = props

  const descriptions = await DescriptionRepository.getManyByIds({ assessment, countryIso, cycle, ids: descriptionIds })

  const linksToVisit = descriptions.flatMap((description) => {
    const { id, name: descriptionName, sectionName, value } = description
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, sectionName }
    const url = Routes.Section.generatePath(urlParams)
    const locations = [{ colName: 'value', descriptionName, id, path: ['text'], sectionName, url }]

    return Htmls.getLinks(value.text).map(({ link, name }) => ({ countryIso, link: link ?? '', locations, name }))
  })

  return { descriptions, linksToVisit }
}
