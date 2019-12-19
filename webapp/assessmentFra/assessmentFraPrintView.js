import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { getCountryName, fetchCountryOverviewStatus } from '../country/actions'

import ContactPersonsPrintView from './contactPersons/contactPersonsPrintView'
import IntroductionView from './contactPersons/contactPersonsView'

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

import DisturbancesPrintView from '../assessmentFra/disturbances/disturbancesView'
import AreaAffectedByFirePrintView from '../assessmentFra/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '../assessmentFra/degradedForest/degradedForestView'

import ForestPolicyView from '../assessmentFra/forestPolicy/forestPolicyView'
import AreaOfPermanentForestEstateView
  from '../assessmentFra/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'

import EmploymentPrintView from '../assessmentFra/employment/employmentView'
import GraduationOfStudentsPrintView from '../assessmentFra/graduationOfStudents/graduationOfStudentsView'
import NonWoodForestProductsRemovalsView
  from '../assessmentFra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'

import SustainableDevelopmentView from '../assessmentFra/sustainableDevelopment/sustainableDevelopmentView'
import { isPrintingOnlyTables } from '../printAssessment/printAssessment'

const AssessmentFraPrintView = props => {
  const { i18n, getCountryName, assessment, fetchCountryOverviewStatus } = props
  const { countryIso } = useParams()
  const country = getCountryName(countryIso, i18n.language)

  useEffect(() => {
    fetchCountryOverviewStatus(countryIso)
  }, [])

  return (
    <div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1>{country}</h1>
          {
            R.propEq('deskStudy', true, assessment) &&
            <h2 style={{ marginLeft: '10px' }} className="desk-study">({i18n.t('assessment.deskStudy')})</h2>
          }
        </div>
        <div style={{ marginTop: '10px' }}>
          <h1>{i18n.t(`fraReportPrint.${isPrintingOnlyTables() ? 'titleTables' : 'title'}`)}</h1>
        </div>
      </div>
      <hr />

      <ContactPersonsPrintView {...props} />
      <IntroductionView {...props} />

      <div className="page-break" />
      <ExtentOfForestView {...props} />
      <div className="page-break" />
      <ForestCharacteristicsView {...props} />
      <div className="page-break" />
      <ForestAreaChangeView {...props} />
      <div className="page-break" />
      <AnnualReforestationView {...props} />
      <div className="page-break" />
      <SpecificForestCategoriesView {...props} />
      <div className="page-break" />
      <OtherLandWithTreeCoverView {...props} />

      <div className="page-break" />
      <GrowingStockView {...props} />
      <div className="page-break" />
      <GrowingStockCompositionView {...props} />
      <div className="page-break" />
      <BiomassStockView {...props} />
      <div className="page-break" />
      <CarbonStockView {...props} />

      <div className="page-break" />
      <DesignatedManagementObjectiveView {...props} />
      <div className="page-break" />
      <ForestAreaWithinProtectedAreasView {...props} />

      <div className="page-break" />
      <ForestOwnershipView {...props} />
      <div className="page-break" />
      <HolderOfManagementRightsView {...props} />

      <div className="page-break" />
      <DisturbancesPrintView {...props} />
      <div className="page-break" />
      <AreaAffectedByFirePrintView {...props} />
      <div className="page-break" />
      <DegradedForestView {...props} />

      <div className="page-break" />
      <ForestPolicyView {...props} />
      <div className="page-break" />
      <AreaOfPermanentForestEstateView {...props} />

      <div className="page-break" />
      <EmploymentPrintView {...props} />
      <div className="page-break" />
      <GraduationOfStudentsPrintView {...props} />
      <div className="page-break" />
      <NonWoodForestProductsRemovalsView {...props} />

      <div className="page-break" />
      <SustainableDevelopmentView {...props} />
    </div>
  )
}


const mapStateToProps = state => ({
  assessment: R.path(['country', 'status', 'assessments', 'fra2020'], state)
})

export default connect(
  mapStateToProps,
  { getCountryName, fetchCountryOverviewStatus }
)(AssessmentFraPrintView)
