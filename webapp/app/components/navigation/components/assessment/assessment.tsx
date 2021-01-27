import React, { useState } from 'react'

import Header from './header'
import Section from './section'

type Props = {
  assessment: any
}

const Assessment = (props: Props) => {
  const {
    assessment,
    assessment: { sections },
  } = props

    const [showSections, setShowSections] = useState(false)

  return (
    <div className="nav-assessment">
      <Header assessment={assessment} showSections={showSections} setShowSections={setShowSections} />

      {Object.entries(sections).map(([key, section]) => (
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

export default Assessment
