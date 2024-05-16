import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { LinkToVisit } from 'meta/cycleData/link'

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
  uuid?: string
}

const _processLinks = (props: ProcessLinksProps): Array<LinkToVisit> => {
  const { colName, countryIso, html, id, path, tableName, uuid } = props
  const links = getLinksFromHtml(html)
  return links.map((linkInfo) => {
    const { link, name } = linkInfo
    const locations = [{ colName, id, path, tableName, uuid }]
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
    const { countryIso, id, value } = description
    return value.dataSources?.flatMap((dataSource) => {
      const { reference, uuid } = dataSource
      return _processLinks({
        colName: 'value',
        countryIso,
        html: reference,
        id,
        path: ['dataSources', 'reference'],
        tableName: 'descriptions',
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
    const { id, countryIso, value } = description
    return _processLinks({
      colName: 'value',
      countryIso,
      html: value.text,
      id,
      path: ['text'],
      tableName: 'descriptions',
    })
  })

  return linksToVisit
}

const _getOriginalDataPointLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, cycle } = props

  const [odpsByDescriptionsLinks, odpsByReferenceLinks] = await Promise.all([
    OriginalDataPointRepository.getManyWithDescriptionLinks({ assessment, cycle }),
    OriginalDataPointRepository.getManyWithReferenceLinks({ assessment, cycle }),
  ])

  const linksToVisit: Array<LinkToVisit> = odpsByDescriptionsLinks.flatMap((odp) => {
    const { id, countryIso, description } = odp
    return _processLinks({
      colName: 'description',
      countryIso,
      html: description,
      id,
      tableName: 'original_data_point',
    })
  })

  linksToVisit.concat(
    odpsByReferenceLinks.flatMap((odp) => {
      const { id, countryIso, dataSourceReferences } = odp
      return _processLinks({
        colName: 'data_source_references',
        countryIso,
        html: dataSourceReferences,
        id,
        tableName: 'original_data_point',
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
