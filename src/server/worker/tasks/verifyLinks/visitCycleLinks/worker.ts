import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { LinkToVisit } from 'meta/cycleData/links/link'
import { SectionNames } from 'meta/routes/sectionNames'
import { Objects } from 'utils/objects'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { Logger } from 'server/utils/logger'
import { refreshDescriptionValidations } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/utils/refreshDescriptionValidations'
import { refreshNationalDataPointValidations } from 'server/worker/tasks/verifyLinks/visitNationalDataPointLinks/utils/refreshNationalDataPointValidations'

import { buildCountryLinks, CountryLinks } from './utils/buildCountryLinks'
import { filterLinks } from './utils/filterLinks'
import { mergeLinks } from './utils/mergeLinks'
import { visitLinks } from './utils/visitLinks'
import { VerifyAllLinksJob } from './props'

const _getLogKey = (job: VerifyAllLinksJob): string => {
  const { assessment, countryIso, cycle } = job.data

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const scope = Objects.isEmpty(countryIso)
    ? `${assessmentName}-${cycleName}`
    : `${assessmentName}-${cycleName}-${countryIso}`
  return `[visitCycleLinks-workerThread] [${scope}] [job-${job.id}]`
}

const _getCycleNationalDataPoints = (props: {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}): Promise<Array<OriginalDataPoint>> => {
  const { assessment, countryISOs, cycle } = props
  // panEuropean doesn't have NDPs
  if (assessment.props.name === AssessmentNames.panEuropean) return Promise.resolve([])
  return OriginalDataPointRepository.getMany({ assessment, countryISOs, cycle })
}

export default async (job: VerifyAllLinksJob): Promise<void> => {
  const logKey = _getLogKey(job)
  try {
    const { assessment, countryIso, cycle, user } = job.data

    const target = { jobStatus: 'started' }
    const message = ActivityLogMessage.linksCheckStart
    const section = SectionNames.Admin.links
    const activityLog = { countryIso, message, section, target, user }
    const activityLogParams = { activityLog, assessment, cycle }
    await ActivityLogRepository.insertActivityLog(activityLogParams)

    const time = new Date().getTime()
    Logger.info(`${logKey} started.`)

    const isFullCycleJob = Objects.isEmpty(countryIso)

    // 1. Get all the countryIsos if we are running the full cycle job
    let countryISOs: Array<CountryIso>
    if (isFullCycleJob) {
      const countries = await AreaRedisRepository.getManyCountries({ assessment, cycle })
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
      DescriptionRepository.getValues({ assessment, countryISOs, cycle }),
      _getCycleNationalDataPoints({ assessment, countryISOs, cycle }),
      LinkRepository.getMany({ assessment, cycle, filters: approvedLinkFilters }),
      SectionRedisRepository.getMany({ assessment, cycle }),
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

    // TODO: Clear locations

    const mergedLinks = mergeLinks({ linksToVisit })

    await LinkRepository.markDeletedMany({
      assessment,
      countryIso,
      cycle,
      excludedLinks: mergedLinks.map((link) => ({
        countryIso: link.countryIso,
        link: link.link,
      })),
    })

    const linkVisits = await visitLinks(filterLinks({ approvedLinks, linksToVisit: mergedLinks }))

    await LinkRepository.upsertMany({
      assessment,
      cycle,
      linkVisits,
    })

    const sectionNames = sections.flatMap(({ subSections }) => subSections?.map(({ props }) => props.name) ?? [])

    // 4. Update validations cache
    await Promise.all(
      countryLinks.map(async (country) => {
        const commonProps = { approvedLinks, assessment, countryIso: country.countryIso, cycle, linkVisits }

        await refreshDescriptionValidations({
          ...commonProps,
          descriptions: country.descriptions,
          linksToVisit: country.descriptionLinksToVisit,
          sectionNames,
        })

        await refreshNationalDataPointValidations({
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
