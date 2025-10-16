import './Hints.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { SubSectionHints } from 'meta/assessment/section'
import { SubSections } from 'meta/assessment/subSections'
import { Files } from 'meta/file'
import { SdgMetadataFileName } from 'meta/file/static'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import DefinitionLink from 'client/components/DefinitionLink'
import { Props } from 'client/pages/Section/Title/props'

type Hint = {
  document: string
  key: keyof SubSectionHints
  labelKey: string
}

const HINTS: Array<Hint> = [
  { document: 'tad', key: 'definitions', labelKey: 'definition.definitionLabel' },
  { document: 'faq', key: 'faqs', labelKey: 'definition.faqLabel' },
  { document: 'rn', key: 'notes', labelKey: 'definition.seeReportingNotes' },
]

export const HintsSustainableDevelopment: React.FC<Props> = () => {
  const { t } = useTranslation()
  const lang = useLanguage()

  const fileNames: Array<SdgMetadataFileName> = [SdgMetadataFileName.Metadata150101, SdgMetadataFileName.Metadata150201]
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()

  return (
    <div className="title-hints">
      {fileNames.map((key) => {
        const href = Files.Static.getSdgMetadata({
          file: key,
          language: lang,
          assessmentName,
          cycleName,
          countryIso,
        })

        return (
          <a key={key} className="definition-link no-print" href={href} rel="noreferrer" target="_blank">
            {t(`fra.sustainableDevelopment.${key}`)}
          </a>
        )
      })}
    </div>
  )
}

const Hints: React.FC<Props> = (props) => {
  const { subSection } = props
  const { hints: sectionHints } = subSection.props

  const { t } = useTranslation()
  const cycle = useCycle()

  const anchor = SubSections.getAnchor({ cycle, subSection })
  const hints = sectionHints?.[cycle.uuid] ?? {}

  if (Objects.isEmpty(hints)) return null

  return (
    <div className="title-hints">
      {HINTS.map((hint) => {
        const { document, key, labelKey } = hint
        const show = Boolean(hints?.[key])

        if (show) {
          return <DefinitionLink key={key} anchor={anchor} document={document} title={t(labelKey)} />
        }

        return null
      })}
    </div>
  )
}

export default Hints
