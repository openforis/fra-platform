import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/assessment/section'
import { LinkLocation, LinkToVisit } from 'meta/cycleData'
import { Routes } from 'meta/routes'

import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

import { getLinksFromHtml } from './utils/getLinksFromHtml'

type ProcessLinksProps = {
  countryIso: CountryIso
  html: string
} & LinkLocation

const _processLinks = (props: ProcessLinksProps): Array<LinkToVisit> => {
  const { countryIso, html, ...location } = props

  const links = getLinksFromHtml(html)

  const locations = [location]

  return links.map((linkInfo) => {
    const { link, name } = linkInfo
    return { countryIso, link, locations, name }
  })
}

type Props = {
  assessment: Assessment
  cycle: Cycle
}

const _getDescriptionDataSourcesLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, cycle } = props

  const descriptionsByDataSourcesLinks = await DescriptionRepository.getManyWithDataSourcesLinks({ assessment, cycle })

  const linksToVisit: Array<LinkToVisit> = descriptionsByDataSourcesLinks.flatMap((description) => {
    const { countryIso, id, name, sectionName, value } = description
    return value.dataSources?.flatMap((dataSource) => {
      const { reference, uuid } = dataSource
      const urlParams = { assessmentName: assessment.props.name, cycleName: cycle.name, countryIso, sectionName }
      const url = Routes.Section.generatePath(urlParams)
      return _processLinks({
        colName: 'value',
        countryIso,
        descriptionName: name,
        html: reference,
        id,
        path: ['dataSources', 'reference'],
        sectionName,
        url,
        uuid,
      })
    })
  })

  return linksToVisit
}

const _getDescriptionTextLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, cycle } = props

  const descriptionsByTextLinks = await DescriptionRepository.getManyWithTextLinks({ assessment, cycle })

  const linksToVisit: Array<LinkToVisit> = descriptionsByTextLinks.flatMap((description) => {
    const { countryIso, id, name, sectionName, value } = description
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, sectionName }
    const url = Routes.Section.generatePath(urlParams)
    return _processLinks({
      colName: 'value',
      countryIso,
      descriptionName: name,
      html: value.text,
      id,
      path: ['text'],
      sectionName,
      url,
    })
  })

  return linksToVisit
}

const _getOriginalDataPointLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const sectionName = SectionNames.extentOfForest

  const [odpsByDescriptionsLinks, odpsByReferenceLinks] = await Promise.all([
    OriginalDataPointRepository.getManyWithDescriptionLinks({ assessment, cycle }),
    OriginalDataPointRepository.getManyWithReferenceLinks({ assessment, cycle }),
  ])

  const linksToVisit: Array<LinkToVisit> = odpsByDescriptionsLinks.flatMap((odp) => {
    const { countryIso, description, id, year } = odp
    const urlParams = { assessmentName, countryIso, cycleName, sectionName, year: String(year) }
    const url = Routes.OriginalDataPoint.generatePath(urlParams)
    return _processLinks({
      countryIso,
      html: description,
      id,
      odpSection: 'description',
      sectionName: 'originalDataPoint',
      url,
      year,
    })
  })

  return linksToVisit.concat(
    odpsByReferenceLinks.flatMap((odp) => {
      const { countryIso, dataSourceReferences, id, year } = odp
      const urlParams = { assessmentName, countryIso, cycleName, sectionName, year: String(year) }
      const url = Routes.OriginalDataPoint.generatePath(urlParams)
      return _processLinks({
        countryIso,
        html: dataSourceReferences,
        id,
        odpSection: 'data_source_references',
        sectionName: 'originalDataPoint',
        url,
        year,
      })
    })
  )
}

export const getAllLinksToVisit = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, cycle } = props

  const [descriptionTextLinks, descriptionDataSourcesLinks, originalDataPointLinks] = await Promise.all([
    _getDescriptionTextLinks({ assessment, cycle }),
    _getDescriptionDataSourcesLinks({ assessment, cycle }),
    _getOriginalDataPointLinks({ assessment, cycle }),
  ])

  return descriptionTextLinks.concat(descriptionDataSourcesLinks, originalDataPointLinks)
}
