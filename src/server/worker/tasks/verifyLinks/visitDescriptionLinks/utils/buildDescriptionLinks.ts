import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import {
  CommentableDescription,
  CommentableDescriptionKey,
  DescriptionCountryValues,
} from 'meta/assessment/descriptionValue'
import { DescriptionLinkLocationPath } from 'meta/cycleData/links/descriptionLink'
import { LinkToVisit } from 'meta/cycleData/links/link'
import { Routes } from 'meta/routes/routes'
import { Htmls } from 'utils/htmls'
import { Objects } from 'utils/objects'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionKeys: Array<CommentableDescriptionKey>
  descriptionValues: DescriptionCountryValues
}

type Returned = {
  descriptions: Array<Omit<CommentableDescription, 'id'>>
  linksToVisit: Array<LinkToVisit>
}

export const buildDescriptionLinks = (props: Props): Returned => {
  const { assessment, countryIso, cycle, descriptionKeys, descriptionValues } = props

  const descriptions = descriptionKeys.reduce<Array<Omit<CommentableDescription, 'id'>>>((acc, descriptionKey) => {
    const { name, sectionName } = descriptionKey
    const value = descriptionValues[countryIso]?.[sectionName]?.[name]
    if (Objects.isEmpty(value)) return acc
    acc.push({ countryIso, name, sectionName, value })
    return acc
  }, [])

  const linksToVisit = descriptions.flatMap<LinkToVisit>((description) => {
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
      const { reference, uuid } = dataSource
      if (Objects.isEmpty(uuid)) return []

      const path = DescriptionLinkLocationPath.dataSourceReference
      const locations = [{ colName: 'value', descriptionName, path, sectionName, url, uuid }]

      return Htmls.getLinks(reference).map(({ link, name }) => ({ countryIso, link: link ?? '', locations, name }))
    })

    return textLinks.concat(referenceLinks)
  })

  return { descriptions, linksToVisit }
}
