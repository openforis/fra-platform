import { CountryIso } from 'meta/area/countryIso'
import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { DescriptionLinkLocationPath, LinkLocation, LinkToVisit } from 'meta/cycleData/links/link'
import { Routes } from 'meta/routes/routes'
import { Htmls } from 'utils/htmls'

import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'

type ProcessLinksProps = {
  countryIso: CountryIso
  html: string
} & LinkLocation

const _processLinks = (props: ProcessLinksProps): Array<LinkToVisit> => {
  const { countryIso, html, ...location } = props

  const links = Htmls.getLinks(html)

  const locations = [location]

  return links.map((linkInfo) => {
    const { link, name } = linkInfo
    return { countryIso, link, locations, name }
  })
}

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

const _getDescriptionDataSourcesLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, countryIso, cycle } = props

  const descriptionsByDataSourcesLinks = await DescriptionRepository.getManyWithDataSourcesLinks({
    assessment,
    countryIso,
    cycle,
  })

  const linksToVisit: Array<LinkToVisit> = descriptionsByDataSourcesLinks.flatMap((description) => {
    const { countryIso, name, sectionName, value } = description
    return value.dataSources?.flatMap((dataSource) => {
      const { reference, uuid } = dataSource
      const urlParams = { assessmentName: assessment.props.name, cycleName: cycle.name, countryIso, sectionName }
      const url = Routes.Section.generatePath(urlParams)
      return _processLinks({
        colName: 'value',
        countryIso,
        descriptionName: name,
        html: reference,
        path: DescriptionLinkLocationPath.dataSourceReference,
        sectionName,
        url,
        uuid,
      })
    })
  })

  return linksToVisit
}

const _getDescriptionTextLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, countryIso, cycle } = props

  const descriptionsByTextLinks = await DescriptionRepository.getManyWithTextLinks({ assessment, countryIso, cycle })

  const linksToVisit: Array<LinkToVisit> = descriptionsByTextLinks.flatMap((description) => {
    const { countryIso, name, sectionName, value } = description
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, sectionName }
    const url = Routes.Section.generatePath(urlParams)
    return _processLinks({
      colName: 'value',
      countryIso,
      descriptionName: name,
      html: value.text,
      path: DescriptionLinkLocationPath.text,
      sectionName,
      url,
    })
  })

  return linksToVisit
}

const _getOriginalDataPointLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, countryIso, cycle } = props
  if (assessment.props.name === AssessmentNames.panEuropean) return []

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const [odpsByDescriptionsLinks, odpsByReferenceLinks] = await Promise.all([
    OriginalDataPointRepository.getManyWithDescriptionLinks({ assessment, countryIso, cycle }),
    OriginalDataPointRepository.getManyWithReferenceLinks({ assessment, countryIso, cycle }),
  ])

  const commentFieldConfigs: Array<{ field: OriginalDataPointCommentKey; sectionName: SectionNames }> = [
    { field: TableNames.extentOfForest, sectionName: SectionNames.extentOfForest },
    { field: TableNames.forestCharacteristics, sectionName: SectionNames.forestCharacteristics },
  ]

  const linksToVisit: Array<LinkToVisit> = odpsByDescriptionsLinks.flatMap((odp) => {
    const { comments, countryIso, uuid, year } = odp

    return commentFieldConfigs.flatMap(({ field, sectionName }) => {
      const html = comments[field]
      if (!html) return []
      const urlParams = { assessmentName, countryIso, cycleName, sectionName, year: String(year) }
      const url = Routes.OriginalDataPoint.generatePath(urlParams)

      return _processLinks({
        countryIso,
        html,
        identifier: uuid,
        odpSection: ODPCommentColumns[field],
        sectionName: 'originalDataPoint',
        url,
        year,
      })
    })
  })

  return linksToVisit.concat(
    odpsByReferenceLinks.reduce<Array<LinkToVisit>>((acc, odp) => {
      const { countryIso, dataSources = [], year } = odp
      const sectionName = SectionNames.extentOfForest
      const urlParams = { assessmentName, countryIso, cycleName, sectionName, year: String(year) }
      const url = Routes.OriginalDataPoint.generatePath(urlParams)

      dataSources.forEach((dataSource) => {
        const links = _processLinks({
          countryIso,
          html: dataSource.reference,
          identifier: dataSource.uuid,
          odpSection: 'data_source_references',
          sectionName: 'originalDataPoint',
          url,
          year,
        })
        acc.push(...links)
      })

      return acc
    }, [])
  )
}

export const getAllLinksToVisit = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, countryIso, cycle } = props

  const [descriptionTextLinks, descriptionDataSourcesLinks, originalDataPointLinks] = await Promise.all([
    _getDescriptionTextLinks({ assessment, countryIso, cycle }),
    _getDescriptionDataSourcesLinks({ assessment, countryIso, cycle }),
    _getOriginalDataPointLinks({ assessment, countryIso, cycle }),
  ])

  return descriptionTextLinks.concat(descriptionDataSourcesLinks, originalDataPointLinks)
}
