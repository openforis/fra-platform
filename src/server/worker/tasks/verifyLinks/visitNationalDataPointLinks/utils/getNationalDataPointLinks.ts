import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { LinkToVisit } from 'meta/cycleData/links/link'
import { NationalDataPointLinkLocation, NDPLinkField, NDPLinkTarget } from 'meta/cycleData/links/nationalDataPointLink'
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

const commentLinkFields: Array<{
  commentKey: OriginalDataPointCommentKey
  linkField: NDPLinkField
  sectionName: SectionNames
}> = [
  {
    commentKey: TableNames.extentOfForest,
    linkField: NDPLinkField.commentsExtentOfForest,
    sectionName: SectionNames.extentOfForest,
  },
  {
    commentKey: TableNames.forestCharacteristics,
    linkField: NDPLinkField.commentsForestCharacteristics,
    sectionName: SectionNames.forestCharacteristics,
  },
]

export const getNationalDataPointLinks = async (props: Props): Promise<Array<LinkToVisit>> => {
  const { assessment, countryIso, cycle, targets } = props

  const originalDataPoints = await OriginalDataPointRepository.getMany({ assessment, countryIso, cycle })

  return targets.flatMap<LinkToVisit>((target) => {
    const originalDataPoint = originalDataPoints.find(({ uuid }) => uuid === target.ndpUuid)
    if (!originalDataPoint) return []

    const { comments, dataSources = [], uuid, year } = originalDataPoint
    const urlParams = { assessmentName: assessment.props.name, countryIso, cycleName: cycle.name, year: String(year) }

    // Build comment links to visit (1a / 1b)
    const commentLinks = commentLinkFields.flatMap<LinkToVisit>(({ commentKey, linkField, sectionName }) => {
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
}
