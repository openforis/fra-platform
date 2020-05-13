import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Header from '@webapp/app/components/navigation/components/assessment/header'
import Section from '@webapp/app/components/navigation/components/assessment/section'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { useLocation, matchPath } from 'react-router'

import * as BasePaths from '@webapp/main/basePaths'

const Assessment = (props) => {
  const { name, sections } = props

  const assessment = useSelector(AssessmentState.getAssessment(name))

  const [showSections, setShowSections] = useState(false)

  const { pathname } = useLocation()
  const isDataExport = matchPath(pathname, { path: BasePaths.dataExport })

  return (
    <div className="nav-assessment">
      {!isDataExport && (
        <Header assessment={assessment} showSections={showSections} setShowSections={setShowSections} />
      )}

      {Object.entries(sections).map(([key, section]) => (
        <Section
          assessmentType={name}
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
  name: PropTypes.string.isRequired,
  sections: PropTypes.object.isRequired,
}

export default Assessment
