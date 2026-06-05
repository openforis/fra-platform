import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'
import { Sockets } from 'meta/socket/sockets'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { SocketServer } from 'server/service/socket'
import { buildDescriptionLinkValidationsByCountry } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/utils/buildDescriptionLinkValidations'

type Props = {
  assessment: Assessment
  approvedLinks: Array<Link>
  countryIso?: CountryIso
  cycle: Cycle
  linkVisits: Array<VisitedLink>
  linksToVisit: Array<LinkToVisit>
}

export const refreshDescriptionLinkValidationCache = async (props: Props): Promise<void> => {
  const { approvedLinks, assessment, countryIso, cycle, linkVisits, linksToVisit } = props

  const sections = await SectionRedisRepository.getMany({ assessment, cycle })
  const sectionNames = sections.flatMap(({ subSections }) => subSections?.map(({ props }) => props.name) ?? [])

  let targetCountryISOs: Array<CountryIso>
  if (countryIso) {
    targetCountryISOs = [countryIso]
  } else {
    const countries = await AreaRedisRepository.getManyCountries({ assessment, cycle })
    targetCountryISOs = countries.map(({ countryIso }) => countryIso)
  }

  const descriptionValidationsByCountry = buildDescriptionLinkValidationsByCountry({
    approvedLinks,
    linkVisits,
    linksToVisit,
  })

  await Promise.all(
    targetCountryISOs.map(async (targetCountryIso) => {
      const descriptionValidations = descriptionValidationsByCountry[targetCountryIso] ?? {}

      const updatedDescriptionValidations = await DescriptionValidationRedisRepository.updateDescriptionLinkValidations(
        {
          assessment,
          countryIso: targetCountryIso,
          cycle,
          descriptionValidations,
          sectionNames,
        }
      )

      const eventName = Sockets.getDescriptionValidationsUpdateEvent({
        assessmentName: assessment.props.name,
        countryIso: targetCountryIso,
        cycleName: cycle.name,
      })
      SocketServer.emit(eventName, {
        descriptionValidations: updatedDescriptionValidations,
      })
    })
  )
}
