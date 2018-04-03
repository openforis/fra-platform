import React from 'react'

import ExtentOfForestView from '../assessmentFra/extentOfForest/extentOfForestView'
import ForestCharacteristicsView from '../assessmentFra/forestCharacteristics/forestCharacteristicsView'
import ForestAreaChangeView from '../assessmentFra/forestAreaChange/forestAreaChangeView'
import AnnualReforestationView from '../assessmentFra/annualReforestation/annualReforestationView'
import SpecificForestCategoriesView from '../assessmentFra/specificForestCategories/specificForestCategoriesView'
import OtherLandWithTreeCoverView from '../assessmentFra/otherLandWithTreeCover/otherLandWithTreeCoverView'

import GrowingStockView from '../assessmentFra/growingStock/growingStockView'
import GrowingStockCompositionView from '../assessmentFra/growingStockComposition/growingStockCompositionView'
import BiomassStockView from '../assessmentFra/biomassStock/biomassStockView'
import CarbonStockView from '../assessmentFra/carbonStock/carbonStockView'

import DesignatedManagementObjectiveView
  from '../assessmentFra/designatedManagementObjective/designatedManagementObjectiveView'
import ForestAreaWithinProtectedAreasView
  from '../assessmentFra/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'

import ForestOwnershipView from '../assessmentFra/forestOwnership/forestOwnershipView'
import HolderOfManagementRightsView from '../assessmentFra/holderOfManagementRights/holderOfManagementRightsView'

import DisturbancesView from '../assessmentFra/disturbances/disturbancesView'
import AreaAffecteByFireView from '../assessmentFra/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '../assessmentFra/degradedForest/degradedForestView'

import ForestPolicyView from '../assessmentFra/forestPolicy/forestPolicyView'
import AreaOfPermanentForestEstateView
  from '../assessmentFra/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'

import EmploymentView from '../assessmentFra/employment/employmentView'
import GraduationOfStudentsView from '../assessmentFra/graduationOfStudents/graduationOfStudentsView'
import NonWoodForestProductsRemovalsView
  from '../assessmentFra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'

import SustainableDevelopmentView from '../assessmentFra/sustainableDevelopment/sustainableDevelopmentView'

const AssessmentFraPrintView = (props) => {

  return <div>

    <ExtentOfForestView {...props}/>

    <div className="page-break"/>
    <ForestCharacteristicsView {...props}/>
    <div className="page-break"/>
    <ForestAreaChangeView {...props}/>
    <div className="page-break"/>
    <AnnualReforestationView {...props}/>
    <div className="page-break"/>
    <SpecificForestCategoriesView {...props}/>
    <div className="page-break"/>
    <OtherLandWithTreeCoverView {...props}/>

    <div className="page-break"/>
    <GrowingStockView {...props}/>
    <div className="page-break"/>
    <GrowingStockCompositionView {...props}/>
    <div className="page-break"/>
    <BiomassStockView {...props}/>
    <div className="page-break"/>
    <CarbonStockView {...props}/>

    <div className="page-break"/>
    <DesignatedManagementObjectiveView {...props}/>
    <div className="page-break"/>
    <ForestAreaWithinProtectedAreasView {...props}/>

    <div className="page-break"/>
    <ForestOwnershipView {...props}/>
    <div className="page-break"/>
    <HolderOfManagementRightsView {...props}/>

    <div className="page-break"/>
    <DisturbancesView {...props}/>
    <div className="page-break"/>
    <AreaAffecteByFireView {...props}/>
    <div className="page-break"/>
    <DegradedForestView {...props}/>

    <div className="page-break"/>
    <ForestPolicyView {...props}/>
    <div className="page-break"/>
    <AreaOfPermanentForestEstateView {...props}/>

    <div className="page-break"/>
    <EmploymentView {...props}/>
    <div className="page-break"/>
    <GraduationOfStudentsView {...props}/>
    <div className="page-break"/>
    <NonWoodForestProductsRemovalsView {...props}/>

    <div className="page-break"/>
    <SustainableDevelopmentView {...props}/>
  </div>
}

export default AssessmentFraPrintView
