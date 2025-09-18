import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/assessment/section'
import { LinkToVisit } from 'meta/cycleData'
import { Routes } from 'meta/routes'

import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

import { getLinksFromHtml } from './utils/getLinksFromHtml'

type ProcessLinksProps = {
  colName: string
  countryIso: CountryIso
  html: string
  id: number
  path?: Array<string>
  tableName: string
  url: string
  uuid?: string
}

const _processLinks = (props: ProcessLinksProps): Array<LinkToVisit> => {
  const { colName, countryIso, html, id, path, tableName, url, uuid } = props
  const links = getLinksFromHtml(html)
  return links.map((linkInfo) => {
    const { link, name } = linkInfo
    const locations = [{ colName, id, path, tableName, url, uuid }]
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
    const { countryIso, id, sectionName, value } = description
    return value.dataSources?.flatMap((dataSource) => {
      const { reference, uuid } = dataSource
      const urlParams = { assessmentName: assessment.props.name, cycleName: cycle.name, countryIso, sectionName }
      const url = Routes.Section.generatePath(urlParams)
      return _processLinks({
        colName: 'value',
        countryIso,
        html: reference,
        id,
        path: ['dataSources', 'reference'],
        tableName: 'descriptions',
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
    const { countryIso, id, sectionName, value } = description
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, sectionName }
    const url = Routes.Section.generatePath(urlParams)
    return _processLinks({
      colName: 'value',
      countryIso,
      html: value.text,
      id,
      path: ['text'],
      tableName: 'descriptions',
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
      colName: 'description',
      countryIso,
      html: description,
      id,
      tableName: 'original_data_point',
      url,
    })
  })

  linksToVisit.concat(
    odpsByReferenceLinks.flatMap((odp) => {
      const { countryIso, dataSourceReferences, id, year } = odp
      const urlParams = { assessmentName, countryIso, cycleName, sectionName, year: String(year) }
      const url = Routes.OriginalDataPoint.generatePath(urlParams)
      return _processLinks({
        colName: 'data_source_references',
        countryIso,
        html: dataSourceReferences,
        id,
        tableName: 'original_data_point',
        url,
      })
    })
  )

  return linksToVisit
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
