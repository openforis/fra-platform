import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { assessments } from '@common/assessmentSectionItems'

import Header from '@webapp/loggedin/navigation/components/assessment/header'
import Section from '@webapp/loggedin/navigation/components/assessment/section'

import * as AssessmentState from '@webapp/country/assessmentState'

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
          (item, i) => (
            <Section
              key={i}
              item={item}
              assessment={assessment}
              showSections={showSections}
              {...props}
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





