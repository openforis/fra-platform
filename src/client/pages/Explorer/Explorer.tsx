import React from 'react'

import Filters from 'client/pages/Explorer/Filters/Filters'

import ResultGrid from './ResultGrid/ResultGrid'

const Explorer: React.FC = () => {
  return (
    <div className="app-view__content">
      <Filters />
      <ResultGrid />
    </div>
  )
}

export default Explorer
