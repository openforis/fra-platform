import React, { useState } from 'react'

import { Objects } from 'utils/objects'

import { useSections } from 'client/store/metadata'

import Header from './Header'
import NavigationSection from './Section'

const NavAssessment: React.FC = () => {
  const sections = useSections()
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
