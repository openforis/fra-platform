import './Title.scss'
import React from 'react'

import { SectionName } from 'meta/assessment'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { Components, TitleDefault } from 'client/pages/Section/Title/Components'
import Hints, { HintsSustainableDevelopment } from 'client/pages/Section/Title/Hints'

import { Props } from './props'

const HintsComponents: Record<SectionName, React.FC<Props>> = {
  sustainableDevelopment: HintsSustainableDevelopment,
}

const Title: React.FC<Props> = (props) => {
  const { subSection } = props
  const { name: sectionName } = subSection.props

  const { assessmentName } = useCycleRouteParams()

  const Component = Components[assessmentName]?.[sectionName] ?? TitleDefault
  const HintsComponent = HintsComponents[sectionName] ?? Hints

  return (
    <div className="section__title">
      {React.createElement(Component, { subSection })}

      <HintsComponent subSection={subSection} />
    </div>
  )
}
export default Title
