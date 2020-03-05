import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { assessments } from '@common/assessmentSectionItems'

import Header from '@webapp/app/components/navigation/components/assessment/header'
import Section from '@webapp/app/components/navigation/components/assessment/section'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const Assessment = props => {
  const { name } = props

  const assessment = useSelector(AssessmentState.getAssessment(name))
  const sections = assessments[name]

  const [showSections, setShowSections] = useState(false)

  return (
    <div className="nav-assessment">

      <Header
        assessment={assessment}
        showSections={showSections}
        setShowSections={setShowSections}
      />

      {
        sections.map(
          (section, i) => (
            <Section
              key={i}
              section={section}
              showSections={showSections}
            />
          )
        )
      }
    </div>
  )
}

Assessment.propTypes = {
  name: PropTypes.string.isRequired
}

export default Assessment





