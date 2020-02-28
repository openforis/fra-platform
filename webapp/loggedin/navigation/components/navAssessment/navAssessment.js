import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { assessments } from '@common/assessmentSectionItems'

import NavAssessmentHeader from '@webapp/loggedin/navigation/components/navAssessment/header/navAssessmentHeader'
import NavAssessmentSection from '@webapp/loggedin/navigation/components/navAssessment/navAssessmentSection'

import * as AssessmentState from '@webapp/country/assessmentState'

const NavAssessment = props => {
  const { name } = props

  const assessment = useSelector(AssessmentState.getAssessment(name))
  const sections = assessments[name]

  const [showSections, setShowSections] = useState(false)

  return (
    <div className="nav-assessment">

      <NavAssessmentHeader
        assessment={assessment}
        showSections={showSections}
        setShowSections={setShowSections}
      />

      {
        sections.map(
          (item, i) => (
            <NavAssessmentSection
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

NavAssessment.propTypes = {
  name: PropTypes.string.isRequired
}

export default NavAssessment





