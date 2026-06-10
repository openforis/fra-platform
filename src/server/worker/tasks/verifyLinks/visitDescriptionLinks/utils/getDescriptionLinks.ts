import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionIdentifier } from 'meta/assessment/descriptionValue'
import { DescriptionLinkLocationPath, LinkToVisit } from 'meta/cycleData/links/link'
import { Routes } from 'meta/routes/routes'
import { Htmls } from 'utils/htmls'
import { Objects } from 'utils/objects'

import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { DescriptionLinkSource } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/types'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionTargets: Array<DescriptionIdentifier>
}

type Returned = {
  descriptions: Array<DescriptionLinkSource>
  linksToVisit: Array<LinkToVisit>
}

export const getDescriptionLinks = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, descriptionTargets } = props

  const names = descriptionTargets.map(({ name }) => name)
  const sectionNames = descriptionTargets.map(({ sectionName }) => sectionName)

  const descriptionValues = await DescriptionRepository.getValues({
    assessment,
    countryISOs: [countryIso],
    cycle,
    names,
    sectionNames,
  })

  const descriptions = descriptionTargets.reduce<Array<DescriptionLinkSource>>((acc, descriptionTarget) => {
    const { name, sectionName } = descriptionTarget
    const value = descriptionValues[countryIso]?.[sectionName]?.[name]
    if (Objects.isEmpty(value)) return acc
    acc.push({ countryIso, name, sectionName, value })
    return acc
  }, [])

  const linksToVisit = descriptions.flatMap((description) => {
    const { name: descriptionName, sectionName, value } = description
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, sectionName }
    const url = Routes.Section.generatePath(urlParams)

    // Build text links to visit
    const path = DescriptionLinkLocationPath.text
    const textLocations = [{ colName: 'value', descriptionName, path, sectionName, url }]
    const textLinks = Htmls.getLinks(value.text).map(({ link, name }) => ({
      countryIso,
      link: link ?? '',
      locations: textLocations,
      name,
    }))

    // Build reference links to visit
    const referenceLinks = (value.dataSources ?? []).flatMap((dataSource) => {
      const { placeholder, reference, uuid } = dataSource
      if (placeholder || Objects.isEmpty(uuid)) return []

      const path = DescriptionLinkLocationPath.dataSourceReference
      const locations = [{ colName: 'value', descriptionName, path, sectionName, url, uuid }]

      return Htmls.getLinks(reference).map(({ link, name }) => ({ countryIso, link: link ?? '', locations, name }))
    })

    return textLinks.concat(referenceLinks)
  })

  return { descriptions, linksToVisit }
}
