import React from 'react'

import ExtentOfForestView from '../assessmentFra/extentOfForest/extentOfForestView'
import ForestCharacteristicsView from '../assessmentFra/forestCharacteristics/forestCharacteristicsView'
import ForestAreaChangeView from '../assessmentFra/forestAreaChange/forestAreaChangeView'

import GrowingStockView from '../assessmentFra/growingStock/growingStockView'
import SpecificForestCategoriesView from '../assessmentFra/specificForestCategories/specificForestCategoriesView'
import GrowingStockCompositionView from '../assessmentFra/growingStockComposition/growingStockCompositionView'
import designatedManagementObjectiveView
  from '../assessmentFra/designatedManagementObjective/designatedManagementObjectiveView'
import AreaAffecteByFireView from '../assessmentFra/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '../assessmentFra/degradedForest/degradedForestView'
import EmploymentView from '../assessmentFra/employment/employmentView'
import GraduationOfStudentsView from '../assessmentFra/graduationOfStudents/graduationOfStudentsView'
import NonWoodForestProductsRemovalsView
  from '../assessmentFra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'
import AnnualReforestationView from '../assessmentFra/annualReforestation/annualReforestationView'
import BiomassStockView from '../assessmentFra/biomassStock/biomassStockView'
import CarbonStockView from '../assessmentFra/carbonStock/carbonStockView'
import ForestOwnershipView from '../assessmentFra/forestOwnership/forestOwnershipView'
import ForestAreaWithinProtectedAreasView
  from '../assessmentFra/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'
import HolderOfManagementRightsView from '../assessmentFra/holderOfManagementRights/holderOfManagementRightsView'
import DisturbancesView from '../assessmentFra/disturbances/disturbancesView'
import AreaOfPermanentForestEstateView
  from '../assessmentFra/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'
import ForestPolicyView from '../assessmentFra/forestPolicy/forestPolicyView'
import OtherLandWithTreeCoverView from '../assessmentFra/otherLandWithTreeCover/otherLandWithTreeCoverView'
import SustainableDevelopmentView from '../assessmentFra/sustainableDevelopment/sustainableDevelopmentView'
const AssessmentFraPrintView = (props) => {
  console.log(props)
  return <div>

    <ExtentOfForestView {...props}/>
    <div className="page-break"/>
    <ForestCharacteristicsView {...props}/>
<div className="page-break"/>
    <ForestAreaChangeView {...props}/>

  </div>
}

export default AssessmentFraPrintView
