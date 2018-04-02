import React from 'react'

import ExtentOfForestView from '../assessmentFra/extentOfForest/extentOfForestView'
import ForestCharacteristicsView from '../assessmentFra/forestCharacteristics/forestCharacteristicsView'

const AssessmentFraPrintView = (props) => {
  console.log(props)
  return <div>

    <ExtentOfForestView {...props}/>
    <div className="page-break"/>
    <ForestCharacteristicsView {...props}/>

  </div>
}

export default AssessmentFraPrintView
