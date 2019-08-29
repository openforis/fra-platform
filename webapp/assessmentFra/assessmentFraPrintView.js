import React from 'react'
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

class AssessmentFraPrintView extends React.Component {

  getCountryIso () {
    const { match } = this.props
    const { countryIso } = match.params
    return countryIso
  }

  componentDidMount () {
    const { fetchCountryOverviewStatus } = this.props
    fetchCountryOverviewStatus(this.getCountryIso())
  }

  render () {

    const { i18n, getCountryName, assessment } = this.props

    const country = getCountryName(this.getCountryIso(), i18n.language)
    return (
      <div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1>{i18n.t('fraReportPrint.title', { country })}</h1>
          {
            R.propEq('deskStudy', true, assessment) &&
            <h2 style={{ marginLeft: '15px' }} className="desk-study">({i18n.t('assessment.deskStudy')})</h2>
          }
        </div>
        <hr/>

        <ContactPersonsPrintView {...this.props}/>
        <IntroductionView {...this.props}/>

        <div className="page-break"/>
        <ExtentOfForestView {...this.props}/>
        <div className="page-break"/>
        <ForestCharacteristicsView {...this.props}/>
        <div className="page-break"/>
        <ForestAreaChangeView {...this.props}/>
        <div className="page-break"/>
        <AnnualReforestationView {...this.props}/>
        <div className="page-break"/>
        <SpecificForestCategoriesView {...this.props}/>
        <div className="page-break"/>
        <OtherLandWithTreeCoverView {...this.props}/>

        <div className="page-break"/>
        <GrowingStockView {...this.props}/>
        <div className="page-break"/>
        <GrowingStockCompositionView {...this.props}/>
        <div className="page-break"/>
        <BiomassStockView {...this.props}/>
        <div className="page-break"/>
        <CarbonStockView {...this.props}/>

        <div className="page-break"/>
        <DesignatedManagementObjectiveView {...this.props}/>
        <div className="page-break"/>
        <ForestAreaWithinProtectedAreasView {...this.props}/>

        <div className="page-break"/>
        <ForestOwnershipView {...this.props}/>
        <div className="page-break"/>
        <HolderOfManagementRightsView {...this.props}/>

        <div className="page-break"/>
        <DisturbancesPrintView {...this.props}/>
        <div className="page-break"/>
        <AreaAffectedByFirePrintView {...this.props}/>
        <div className="page-break"/>
        <DegradedForestView {...this.props}/>

        <div className="page-break"/>
        <ForestPolicyView {...this.props}/>
        <div className="page-break"/>
        <AreaOfPermanentForestEstateView {...this.props}/>

        <div className="page-break"/>
        <EmploymentPrintView {...this.props}/>
        <div className="page-break"/>
        <GraduationOfStudentsPrintView {...this.props}/>
        <div className="page-break"/>
        <NonWoodForestProductsRemovalsView {...this.props}/>

        <div className="page-break"/>
        <SustainableDevelopmentView {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  assessment: R.path(['country', 'status', 'assessments', 'fra2020'], state)
})

export default connect(
  mapStateToProps,
  { getCountryName, fetchCountryOverviewStatus }
)(AssessmentFraPrintView)
