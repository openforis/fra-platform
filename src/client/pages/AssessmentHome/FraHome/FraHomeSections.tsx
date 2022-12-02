import React from 'react'
import { useParams } from 'react-router-dom'

import { useSections } from './hooks/useSections'

const FraHomeSections: React.FC = () => {
  const { sectionName } = useParams<{ sectionName: string }>()
  const sections = useSections()
  const section = sections.find((section) => section.name === sectionName)
  const Component = section?.component

  if (!Component) return null

  return <Component />
}
export default FraHomeSections
