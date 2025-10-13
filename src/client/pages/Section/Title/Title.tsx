import './Title.scss'
import React from 'react'

import { SectionName } from 'meta/assessment/section'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { Components, TitleDefault } from 'client/pages/Section/Title/Components'
import CSVAllTables from 'client/pages/Section/Title/CSVAllTables'
import Hints, { HintsSustainableDevelopment } from 'client/pages/Section/Title/Hints'

import { Props } from './props'

const HintsComponents: Record<SectionName, React.FC<Props>> = {
  sustainableDevelopment: HintsSustainableDevelopment,
}

const Title: React.FC<Props> = (props) => {
  const { subSection } = props
  const { name: sectionName } = subSection.props

  const { assessmentName } = useCycleRouteParams()

  const { print } = useIsPrintRoute()

  const Component = Components[assessmentName]?.[sectionName] ?? TitleDefault
  const HintsComponent = HintsComponents[sectionName] ?? Hints

  return (
    <div className="section__title">
      <div className="section__title__header">
        {React.createElement(Component, { subSection })}
        {!print && <CSVAllTables />}
      </div>
      {!print && <HintsComponent subSection={subSection} />}
    </div>
  )
}
export default Title
