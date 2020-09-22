import React from 'react'
import ResultsTable from './components/resultsTable'

const ContentCheck = () => {
  const sections = ['extent']
  return (
    <>
      {sections.map((section) => (
        <ResultsTable key={section} section={section} />
      ))}
    </>
  )
}

export default ContentCheck
