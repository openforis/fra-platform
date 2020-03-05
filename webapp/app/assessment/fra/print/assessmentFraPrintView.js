import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import { fetchCountryOverviewStatus, getCountryName } from '@webapp/app/country/actions'

import ContactPersonsPrintView from '../sections/contactPersons/contactPersonsPrintView'
import IntroductionView from '../sections/contactPersons/contactPersonsView'

import ExtentOfForestView from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestView'
import ForestCharacteristicsView from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsView'
import ForestAreaChangeView from '@webapp/app/assessment/fra/sections/forestAreaChange/forestAreaChangeView'
import AnnualReforestationView from '@webapp/app/assessment/fra/sections/annualReforestation/annualReforestationView'
import SpecificForestCategoriesView
  from '@webapp/app/assessment/fra/sections/specificForestCategories/specificForestCategoriesView'
import OtherLandWithTreeCoverView
  from '@webapp/app/assessment/fra/sections/otherLandWithTreeCover/otherLandWithTreeCoverView'

import GrowingStockView from '@webapp/app/assessment/fra/sections/growingStock/growingStockView'
import GrowingStockCompositionView
  from '@webapp/app/assessment/fra/sections/growingStockComposition/growingStockCompositionView'
import BiomassStockView from '@webapp/app/assessment/fra/sections/biomassStock/biomassStockView'
import CarbonStockView from '@webapp/app/assessment/fra/sections/carbonStock/carbonStockView'

import DesignatedManagementObjectiveView
  from '@webapp/app/assessment/fra/sections/designatedManagementObjective/designatedManagementObjectiveView'
import ForestAreaWithinProtectedAreasView
  from '@webapp/app/assessment/fra/sections/forestAreaWithinProtectedAreas/forestAreaWithinprotectedAreasView'

import ForestOwnershipView from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipView'
import HolderOfManagementRightsView
  from '@webapp/app/assessment/fra/sections/holderOfManagementRights/holderOfManagementRightsView'

import DisturbancesPrintView from '@webapp/app/assessment/fra/sections/disturbances/disturbancesView'
import AreaAffectedByFirePrintView from '@webapp/app/assessment/fra/sections/areaAffectedByFire/areaAffectedByFireView'
import DegradedForestView from '@webapp/app/assessment/fra/sections/degradedForest/degradedForestView'

import ForestPolicyView from '@webapp/app/assessment/fra/sections/forestPolicy/forestPolicyView'
import AreaOfPermanentForestEstateView
  from '@webapp/app/assessment/fra/sections/areaOfPermanentForestEstate/areaOfPermanentForestEstateView'

import EmploymentPrintView from '@webapp/app/assessment/fra/sections/employment/employmentView'
import GraduationOfStudentsPrintView from '@webapp/app/assessment/fra/sections/graduationOfStudents/graduationOfStudentsView'
import NonWoodForestProductsRemovalsView
  from '@webapp/app/assessment/fra/sections/nonWoodForestProductsRemovals/nonWoodForestProductsRemovalsView'

import SustainableDevelopmentView
  from '@webapp/app/assessment/fra/sections/sustainableDevelopment/sustainableDevelopmentView'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/app/country/countryState'
import TableOfContent from '@webapp/app/assessment/fra/print/tableOfContent'

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

      {
        !isPrintingOnlyTables() &&
        <TableOfContent i18n={i18n} />
      }
      <hr/>

      <ContactPersonsPrintView {...props} />
      <IntroductionView {...props} />

      <div id="section1" className="page-break"/>
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

      <div id="section2" className="page-break"/>
      <GrowingStockView {...props} />
      <div className="page-break"/>
      <GrowingStockCompositionView {...props} />
      <div className="page-break"/>
      <BiomassStockView {...props} />
      <div className="page-break"/>
      <CarbonStockView {...props} />

      <div id="section3" className="page-break"/>
      <DesignatedManagementObjectiveView {...props} />
      <div className="page-break"/>
      <ForestAreaWithinProtectedAreasView {...props} />

      <div id="section4" className="page-break"/>
      <ForestOwnershipView {...props} />
      <div className="page-break"/>
      <HolderOfManagementRightsView {...props} />

      <div id="section5" className="page-break"/>
      <DisturbancesPrintView {...props} />
      <div className="page-break"/>
      <AreaAffectedByFirePrintView {...props} />
      <div className="page-break"/>
      <DegradedForestView {...props} />

      <div id="section6" className="page-break"/>
      <ForestPolicyView {...props} />
      <div className="page-break"/>
      <AreaOfPermanentForestEstateView {...props} />

      <div id="section7" className="page-break"/>
      <EmploymentPrintView {...props} />
      <div className="page-break"/>
      <GraduationOfStudentsPrintView {...props} />
      <div className="page-break"/>
      <NonWoodForestProductsRemovalsView {...props} />

      <div id="section8" className="page-break"/>
      <SustainableDevelopmentView {...props} />
    </div>
  )
}

const mapStateToProps = state => ({
  assessment: CountryState.getAssessmentFra2020(state),
})

export default connect(
  mapStateToProps,
  { getCountryName, fetchCountryOverviewStatus }
)(AssessmentFraPrintView)
