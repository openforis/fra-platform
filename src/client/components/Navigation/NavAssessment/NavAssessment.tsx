import './NavAssessment.scss'
import React, { useState } from 'react'

import { Objects } from 'utils/objects'

import { useSections } from 'client/store/metadata'
import Header from 'client/components/Navigation/NavAssessment/Header'
import NavigationSection from 'client/components/Navigation/NavAssessment/Section'

import { useMaxHeight } from './hooks/useMaxHeight'

const NavAssessment: React.FC = () => {
  const sections = useSections()

  const maxHeight = useMaxHeight()
  const [showSections, setShowSections] = useState<boolean>(false)

  if (Objects.isEmpty(sections)) return null

  return (
    <div className="nav-assessment" style={{ maxHeight }}>
      <Header showSections={showSections} setShowSections={setShowSections} />

      {sections.map((section) => (
        <NavigationSection key={section.uuid} section={section} showSections={showSections} />
      ))}
    </div>
  )
}

export default NavAssessment
