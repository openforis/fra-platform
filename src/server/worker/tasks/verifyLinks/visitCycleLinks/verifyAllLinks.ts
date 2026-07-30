import { CountryIso } from 'meta/area/countryIso'
import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { LinkToVisit } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { BaseProtocol, DB } from 'server/db/db'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { DataValidationService } from 'server/service/dataValidation'
import { Logger } from 'server/utils/logger'

import { buildCountryLinks, CountryLinks } from './utils/buildCountryLinks'
import { filterLinks } from './utils/filterLinks'
import { mergeLinks } from './utils/mergeLinks'
import { visitLinks } from './utils/visitLinks'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
  logKey: string
}

const _getCycleNationalDataPoints = (
  props: {
    assessment: Assessment
    countryISOs: Array<CountryIso>
    cycle: Cycle
  },
  client: BaseProtocol
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, countryISOs, cycle } = props
  // panEuropean doesn't have NDPs
  if (assessment.props.name === AssessmentNames.panEuropean) return Promise.resolve([])
  return OriginalDataPointRepository.getMany({ assessment, countryISOs, cycle }, client)
}

// Verifies all links (descriptions + national data points) of an assessment/cycle,
// or of a single country when countryIso is set.
export const verifyAllLinks = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, logKey } = props
  try {
    const time = new Date().getTime()
    Logger.info(`${logKey} started.`)

    const isFullCycleJob = Objects.isEmpty(countryIso)

    // 1. Get all the countryIsos if we are running the full cycle job
    let countryISOs: Array<CountryIso>
    if (isFullCycleJob) {
      const countries = await AreaRedisRepository.getManyCountries({ assessment, cycle }, client)
      countryISOs = countries.map(({ countryIso }) => countryIso)
    } else {
      countryISOs = [countryIso]
    }

    // Include deleted approved rows, so a previously approved URL stays approved if it is added back.
    const approvedLinkFilters = isFullCycleJob
      ? { approved: true, excludeDeleted: false }
      : { approved: true, countries: countryISOs, excludeDeleted: false }

    // 2. Get the countries' descriptions, NDPs, approved links, and cycle sections
    const [descriptionValues, cycleNationalDataPoints, approvedLinks, sections] = await Promise.all([
      DescriptionRepository.getValues({ assessment, countryISOs, cycle }, client),
      _getCycleNationalDataPoints({ assessment, countryISOs, cycle }, client),
      LinkRepository.getMany({ assessment, cycle, filters: approvedLinkFilters }, client),
      SectionRedisRepository.getMany({ assessment, cycle }, client),
    ])

    const nationalDataPoints: Partial<Record<CountryIso, Array<OriginalDataPoint>>> = {}
    cycleNationalDataPoints.forEach((nationalDataPoint) => {
      const countryDataPoints = nationalDataPoints[nationalDataPoint.countryIso] ?? []
      countryDataPoints.push(nationalDataPoint)
      nationalDataPoints[nationalDataPoint.countryIso] = countryDataPoints
    })

    // 3. Build the countries' links to visit
    const countryLinks = countryISOs.map<CountryLinks>((countryIso) =>
      buildCountryLinks({
        assessment,
        countryIso,
        cycle,
        descriptionValues,
        nationalDataPoints,
      })
    )

    const linksToVisit = countryLinks.flatMap<LinkToVisit>(
      ({ descriptionLinksToVisit, nationalDataPointLinksToVisit }) =>
        descriptionLinksToVisit.concat(nationalDataPointLinksToVisit)
    )
    const mergedLinks = mergeLinks({ linksToVisit })
    const linkVisits = await visitLinks(filterLinks({ approvedLinks, linksToVisit: mergedLinks }))

    // 4. Refresh link table locations
    await client.tx(async (tx) => {
      await LinkRepository.clearLocations({ assessment, countryIso, cycle }, tx)
      await LinkRepository.markDeletedMany(
        {
          assessment,
          countryIso,
          cycle,
          excludedLinks: mergedLinks.map((link) => ({
            countryIso: link.countryIso,
            link: link.link,
          })),
        },
        tx
      )
      await LinkRepository.upsertLinks({ assessment, cycle, linkVisits, linksToVisit: mergedLinks }, tx)
    })

    const sectionNames = sections.flatMap(({ subSections }) => subSections?.map(({ props }) => props.name) ?? [])

    // 5. Update validations cache
    await Promise.all(
      countryLinks.map(async (country) => {
        const commonProps = { approvedLinks, assessment, countryIso: country.countryIso, cycle, linkVisits }

        await DataValidationService.updateDescriptionValidations({
          ...commonProps,
          descriptions: country.descriptions,
          linksToVisit: country.descriptionLinksToVisit,
          replaceDescriptions: true,
          sectionNames,
        })

        await DataValidationService.updateNDPValidations({
          ...commonProps,
          includeStoredTargets: true,
          linksToVisit: country.nationalDataPointLinksToVisit,
          nationalDataPoints: nationalDataPoints[country.countryIso] ?? [],
          targets: country.nationalDataPointTargets,
        })
      })
    )

    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${linkVisits.length} links visited.`)
    return Promise.resolve()
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}
