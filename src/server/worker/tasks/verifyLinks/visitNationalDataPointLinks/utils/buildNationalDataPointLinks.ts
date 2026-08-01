import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
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

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  nationalDataPoints: Array<OriginalDataPoint>
  targets: Array<NDPLinkTarget>
}

export const buildNationalDataPointLinks = (props: Props): Array<LinkToVisit> => {
  const { assessment, countryIso, cycle, nationalDataPoints, targets } = props

  const dataSourcesVersion = Cycles.getNDPDataSourcesVersion({ cycle })

  return targets.flatMap<LinkToVisit>((target) => {
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
      const { reference, uuid: dataSourceUuid } = dataSource
      // DataSources v2 validations are keyed by data source uuid; skip rows missing one
      if (dataSourcesVersion !== 1 && Objects.isEmpty(dataSourceUuid)) return []

      const location: NationalDataPointLinkLocation = {
        ndpSection: NDPLinkField.dataSourceReferences,
        ndpUuid: uuid,
        sectionName: 'originalDataPoint',
        url,
        year,
      }

      if (dataSourcesVersion !== 1) location.dataSourceUuid = dataSourceUuid

      const locations: Array<NationalDataPointLinkLocation> = [location]

      return Htmls.getLinks(reference).map(({ link, name }) => ({ countryIso, link: link ?? '', locations, name }))
    })

    return commentLinks.concat(referenceLinks)
  })
}
