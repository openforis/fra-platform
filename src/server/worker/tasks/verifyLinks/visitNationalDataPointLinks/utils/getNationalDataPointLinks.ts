import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { LinkToVisit } from 'meta/cycleData/links/link'
import {
  NationalDataPointLinkLocation,
  NDPCommentLinkFields,
  NDPLinkField,
  NDPLinkTarget,
} from 'meta/cycleData/links/nationalDataPointLink'
import { Routes } from 'meta/routes/routes'
import { Htmls } from 'utils/htmls'
import { Objects } from 'utils/objects'

import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  targets: Array<NDPLinkTarget>
}

type Returned = {
  linksToVisit: Array<LinkToVisit>
  nationalDataPoints: Array<OriginalDataPoint>
}

export const getNationalDataPointLinks = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, targets } = props

  const nationalDataPoints = await OriginalDataPointRepository.getMany({ assessment, countryIso, cycle })

  const linksToVisit = targets.flatMap<LinkToVisit>((target) => {
    const nationalDataPoint = nationalDataPoints.find(({ uuid }) => uuid === target.ndpUuid)
    if (Objects.isEmpty(nationalDataPoint)) return []

    const { comments, dataSources = [], uuid, year } = nationalDataPoint
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, year: String(year) }

    // Build comment links to visit (1a / 1b)
    const commentLinks = NDPCommentLinkFields.flatMap<LinkToVisit>(({ commentKey, linkField, sectionName }) => {
      if (!target.fields.includes(linkField)) return []

      const html = comments[commentKey]
      if (Objects.isEmpty(html)) return []

      const url = Routes.OriginalDataPoint.generatePath({ ...urlParams, sectionName })
      const locations: Array<NationalDataPointLinkLocation> = [
        { ndpSection: linkField, ndpUuid: uuid, sectionName: 'originalDataPoint', url, year },
      ]

      return Htmls.getLinks(html).map(({ link, name }) => ({ countryIso, link: link ?? '', locations, name }))
    })

    // Build data source reference links to visit
    if (!target.fields.includes(NDPLinkField.dataSourceReferences)) return commentLinks

    const url = Routes.OriginalDataPoint.generatePath({ ...urlParams, sectionName: SectionNames.extentOfForest })
    const referenceLinks = dataSources.flatMap<LinkToVisit>((dataSource) => {
      const { placeholder, reference, uuid: dataSourceUuid } = dataSource
      if (placeholder || Objects.isEmpty(dataSourceUuid)) return []

      const locations: Array<NationalDataPointLinkLocation> = [
        {
          dataSourceUuid,
          ndpSection: NDPLinkField.dataSourceReferences,
          ndpUuid: uuid,
          sectionName: 'originalDataPoint',
          url,
          year,
        },
      ]

      return Htmls.getLinks(reference).map(({ link, name }) => ({ countryIso, link: link ?? '', locations, name }))
    })

    return commentLinks.concat(referenceLinks)
  })

  return { linksToVisit, nationalDataPoints }
}
