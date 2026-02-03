import './ReportAndStory.scss'
import React from 'react'

import Report from './Report'
import Story from './Story'

const ReportAndStory: React.FC = () => {
  return (
    <div className="report-and-story">
      <Report />
      <Story />
    </div>
  )
}

export default ReportAndStory
