import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import { fetchCountryOverviewStatus, getCountryName } from '@webapp/country/actions'

import ContactPersonsPrintView from '../contactPersons/contactPersonsPrintView'
import IntroductionView from '../contactPersons/contactPersonsView'

import ExtentOfForestView from '@webapp/loggedin/assessmentFra/extentOfForest/extentOfForestView'
import ForestCharacteristicsView from '@webapp/loggedin/assessmentFra/forestCharacteristics/forestCharacteristicsView'
import ForestAreaChangeView from '@webapp/loggedin/assessmentFra/forestAreaChange/forestAreaChangeView'
import AnnualReforestationView from '@webapp/loggedin/assessmentFra/annualReforestation/annualReforestationView'
import SpecificForestCategoriesView from '@webapp/loggedin/assessmentFra/specificForestCategories/specificForestCategoriesView'
import OtherLandWithTreeCoverView from '@webapp/loggedin/assessmentFra/otherLandWithTreeCover/otherLandWithTreeCoverView'

import GrowingStockView from '@webapp/loggedin/assessmentFra/growingStock/growingStockView'
import GrowingStockCompositionView from '@webapp/loggedin/assessmentFra/growingStockComposition/growingStockCompositionView'
import BiomassStockView from '@webapp/loggedin/assessmentFra/biomassStock/biomassStockView'
import CarbonStockView from '@webapp/loggedin/assessmentFra/carbonStock/carbonStockView'

import DesignatedManagementObjectiveView
  from '@webapp/loggedin/assessmentFra/designatedManagementObjective/designatedManagementObjectiveView'
import ForestAreaWithinProtectedAreasView
  from '@webapp/loggedin/assessmentFra/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'

import ForestOwnershipView from '@webapp/loggedin/assessmentFra/forestOwnership/forestOwnershipView'
import HolderOfManagementRightsView from '@webapp/loggedin/assessmentFra/holderOfManagementRights/holderOfManagementRightsView'

import DisturbancesPrintView from '@webapp/loggedin/assessmentFra/disturbances/disturbancesView'
import AreaAffectedByFirePrintView from '@webapp/loggedin/assessmentFra/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '@webapp/loggedin/assessmentFra/degradedForest/degradedForestView'

import ForestPolicyView from '@webapp/loggedin/assessmentFra/forestPolicy/forestPolicyView'
import AreaOfPermanentForestEstateView
  from '@webapp/loggedin/assessmentFra/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'

import EmploymentPrintView from '@webapp/loggedin/assessmentFra/employment/employmentView'
import GraduationOfStudentsPrintView from '@webapp/loggedin/assessmentFra/graduationOfStudents/graduationOfStudentsView'
import NonWoodForestProductsRemovalsView
  from '@webapp/loggedin/assessmentFra/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'

import SustainableDevelopmentView from '@webapp/loggedin/assessmentFra/sustainableDevelopment/sustainableDevelopmentView'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/country/countryState'

const AssessmentFraPrintView = props => {
  const { i18n, getCountryName, assessment, fetchCountryOverviewStatus } = props
  const countryIso = useSelector(AppState.getCountryIso)
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
      <hr/>

      <ContactPersonsPrintView {...props} />
      <IntroductionView {...props} />

      <div className="page-break"/>
      <ExtentOfForestView {...props} />
      <div className="page-break"/>
      <ForestCharacteristicsView {...props} />
      <div className="page-break"/>
      <ForestAreaChangeView {...props} />
      <div className="page-break"/>
      <AnnualReforestationView {...props} />
      <div className="page-break"/>
      <SpecificForestCategoriesView {...props} />
      <div className="page-break"/>
      <OtherLandWithTreeCoverView {...props} />

      <div className="page-break"/>
      <GrowingStockView {...props} />
      <div className="page-break"/>
      <GrowingStockCompositionView {...props} />
      <div className="page-break"/>
      <BiomassStockView {...props} />
      <div className="page-break"/>
      <CarbonStockView {...props} />

      <div className="page-break"/>
      <DesignatedManagementObjectiveView {...props} />
      <div className="page-break"/>
      <ForestAreaWithinProtectedAreasView {...props} />

      <div className="page-break"/>
      <ForestOwnershipView {...props} />
      <div className="page-break"/>
      <HolderOfManagementRightsView {...props} />

      <div className="page-break"/>
      <DisturbancesPrintView {...props} />
      <div className="page-break"/>
      <AreaAffectedByFirePrintView {...props} />
      <div className="page-break"/>
      <DegradedForestView {...props} />

      <div className="page-break"/>
      <ForestPolicyView {...props} />
      <div className="page-break"/>
      <AreaOfPermanentForestEstateView {...props} />

      <div className="page-break"/>
      <EmploymentPrintView {...props} />
      <div className="page-break"/>
      <GraduationOfStudentsPrintView {...props} />
      <div className="page-break"/>
      <NonWoodForestProductsRemovalsView {...props} />

      <div className="page-break"/>
      <SustainableDevelopmentView {...props} />
    </div>
  )
}

const mapStateToProps = state => ({
  assessment: CountryState.getStatusAssessmentFra2020(state),
})

export default connect(
  mapStateToProps,
  { getCountryName, fetchCountryOverviewStatus }
)(AssessmentFraPrintView)
