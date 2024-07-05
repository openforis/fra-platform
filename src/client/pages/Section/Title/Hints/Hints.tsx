import './Hints.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { SubSectionHints, SubSections } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useCycleRouteParams, useSectionRouteParams } from 'client/hooks/useRouteParams'
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

  const routeParams = useSectionRouteParams<CountryIso>()
  const searchParams = new URLSearchParams(routeParams)

  return (
    <div className="title-hints">
      {['Metadata-15-01-01', 'Metadata-15-02-01'].map((key) => {
        searchParams.set('key', key)

        return (
          <a
            key={key}
            className="definition-link no-print"
            href={`${ApiEndPoint.File.sdgMetadata()}?${searchParams.toString()}`}
            rel="noreferrer"
            target="_blank"
          >
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

  const { i18n, t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
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
          return (
            <DefinitionLink
              key={key}
              anchor={anchor}
              assessmentName={assessmentName}
              cycleName={cycleName}
              document={document}
              lang={i18n.resolvedLanguage}
              title={t(labelKey)}
            />
          )
        }

        return null
      })}
    </div>
  )
}

export default Hints
