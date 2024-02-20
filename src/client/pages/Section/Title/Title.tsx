import React from 'react'
import { useTranslation } from 'react-i18next'

import { SubSectionProps, SubSections } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import DefinitionLink from 'client/components/DefinitionLink'
import { Components, TitleDefault } from 'client/pages/Section/Title/Components'

import { Props } from './props'

type Hint = {
  document: string
  key: keyof SubSectionProps['hints']
  labelKey: string
}

const hints: Array<Hint> = [
  { document: 'tad', key: 'definitions', labelKey: 'definition.definitionLabel' },
  { document: 'faq', key: 'faqs', labelKey: 'definition.faqLabel' },
  { document: 'rn', key: 'notes', labelKey: 'definition.seeReportingNotes' },
]

const Title: React.FC<Props> = (props) => {
  const { subSection } = props

  const { i18n, t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const cycle = useCycle()

  const sectionName = subSection.props.name
  const anchor = SubSections.getAnchor({ cycle, subSection })
  const Component = Components[assessmentName]?.[sectionName] ?? TitleDefault

  return (
    <>
      {React.createElement(Component, { subSection })}

      {hints.map((hint) => {
        const { document, key, labelKey } = hint
        const show = Boolean(subSection.props?.hints?.[key]?.[cycle.uuid])

        if (show) {
          return (
            <DefinitionLink
              anchor={anchor}
              assessmentName={assessmentName}
              className="margin-right-big"
              cycleName={cycleName}
              document={document}
              key={key}
              lang={i18n.resolvedLanguage}
              title={t(labelKey)}
            />
          )
        }

        return null
      })}
    </>
  )
}
export default Title
