import React, { useState } from 'react'

import { Assessment } from '@core/assessment'

import Header from './Header'
import Section from './Section'

type Props = {
  assessment: Assessment
}

const NavAssessment: React.FC<Props> = (props: Props) => {
  const { assessment } = props

  const [showSections, setShowSections] = useState(false)

  return (
    <div className="nav-assessment">
      <Header assessment={assessment} showSections={showSections} setShowSections={setShowSections} />

      {Object.entries(assessment.sections).map(([key, section]) => (
        <Section
          assessment={assessment}
          prefix={Number(key) > 0 ? key : ''}
          key={key}
          section={section}
          showSections={showSections}
        />
      ))}
    </div>
  )
}

export default NavAssessment
