import { createI18nPromise } from 'i18n/i18nFactory'
import { Objects } from 'utils/objects'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Link } from 'meta/cycleData'
import { Links } from 'meta/cycleData/links/links'
import { Lang } from 'meta/lang'

import { MetadataController } from 'server/controller/metadata'
import { LinkRepository } from 'server/db/repository/assessmentCycle/links'
import { LinksGetManyProps } from 'server/db/repository/assessmentCycle/links/linksGetManyProps'
import { LinksQueryParams } from 'server/db/repository/assessmentCycle/links/LinksQueryParams'
import { ProcessEnv } from 'server/utils'

type Props = LinksGetManyProps & {
  lang: Lang
}

type Returned = {
  query: string
  queryParams: LinksQueryParams
  rowTransformer: (rawLink: Link) => Record<string, string>
}

export const getManyExport = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, lang } = props

  const { query, queryParams } = LinkRepository.buildGetManyQuery(props)

  const sections = await MetadataController.getSections({ assessment, cycle })
  const subSections = sections.flatMap((section) => section.subSections ?? [])
  const i18n = await createI18nPromise(lang)
  const { t } = i18n
  const linkHeader = t('common.link')
  const statusHeader = t('admin.lastStatus')
  const locationsHeader = t('admin.locations')
  const isPanEuropean = assessment.props.name === AssessmentNames.panEuropean
  const { appUri } = ProcessEnv

  const rowTransformer = (rawLink: Link): Record<string, string> => {
    const link = Objects.camelize(rawLink) as Link
    const code = link.visits?.at(-1).code
    const status = t(Links.getI18nValidationStatusLabelKey(code))
    const formattedLocations = (link.locations ?? [])
      .map((location, index) => {
        const label = Links.getLocationLabel({
          countryIso: link.countryIso,
          cycle,
          isPanEuropean,
          location,
          subSections,
          t,
        })
        return `${index + 1}. ${label} (${appUri}${location.url})`
      })
      .join('\n')

    return {
      [linkHeader]: link.link,
      [statusHeader]: status,
      [locationsHeader]: formattedLocations,
    }
  }

  return { query, queryParams, rowTransformer }
}
