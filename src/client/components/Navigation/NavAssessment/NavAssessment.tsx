import React, { useState } from 'react'

import { Objects } from 'utils/objects'

import { useAssessmentSections } from 'client/store/assessment'

import Header from './Header'
import NavigationSection from './Section'

const NavAssessment: React.FC = () => {
  const sections = useAssessmentSections()
  const [showSections, setShowSections] = useState(false)

  if (Objects.isEmpty(sections)) return null

  return (
    <div className="nav-assessment">
      <Header showSections={showSections} setShowSections={setShowSections} />

      {sections.map((section) => (
        <NavigationSection key={section.uuid} section={section} showSections={showSections} />
      ))}
    </div>
  )
}

export default NavAssessment
