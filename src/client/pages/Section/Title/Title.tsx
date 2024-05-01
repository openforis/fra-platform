import './Title.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { SubSectionHints, SubSections } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import DefinitionLink from 'client/components/DefinitionLink'
import { Components, TitleDefault } from 'client/pages/Section/Title/Components'

import { Props } from './props'

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

const Title: React.FC<Props> = (props) => {
  const { subSection } = props
  const { hints: sectionHints, name: sectionName } = subSection.props

  const { i18n, t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const cycle = useCycle()

  const anchor = SubSections.getAnchor({ cycle, subSection })
  const hints = sectionHints?.[cycle.uuid] ?? {}
  const Component = Components[assessmentName]?.[sectionName] ?? TitleDefault

  return (
    <div className="section__title">
      {React.createElement(Component, { subSection })}

      {Object.keys(hints).length > 0 && (
        <div>
          {HINTS.map((hint) => {
            const { document, key, labelKey } = hint
            const show = Boolean(hints?.[key])

            if (show) {
              return (
                <DefinitionLink
                  key={key}
                  anchor={anchor}
                  assessmentName={assessmentName}
                  className="title-hint__link"
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
      )}
    </div>
  )
}
export default Title
