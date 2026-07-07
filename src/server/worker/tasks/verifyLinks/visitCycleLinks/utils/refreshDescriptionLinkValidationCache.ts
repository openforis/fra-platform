import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Link, LinkToVisit, VisitedLink } from 'meta/cycleData/links/link'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { notifyDescriptionValidationUpdate } from 'server/controller/cycleData/validations/descriptions/notifyDescriptionValidationUpdate'
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

      notifyDescriptionValidationUpdate({
        assessment,
        countryIso: targetCountryIso,
        cycle,
        descriptionValidations: updatedDescriptionValidations,
      })
    })
  )
}
