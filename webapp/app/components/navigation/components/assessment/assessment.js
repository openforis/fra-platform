import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import Section from './section'

const Assessment = (props) => {
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
          prefix={key > 0 ? key : ''}
          key={key}
          section={section}
          showSections={showSections}
        />
      ))}
    </div>
  )
}

Assessment.propTypes = {
  assessment: PropTypes.object.isRequired,
}

export default Assessment
