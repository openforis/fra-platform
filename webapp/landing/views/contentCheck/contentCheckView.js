import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Extent from './extent'
import PeriodicChangeRate from './periodicChangeRate'
import ForestGSBiomassCarbon from './forestGSBiomassCarbon'
import PrimaryDesignatedManagementObjectiveView from './primaryDesignatedManagementObjective'
import TotalAreaDesignatedManagementObjectiveView from './totalAreaDesignatedManagementObjective'
import ForestOwnership from './forestOwnership'
import ManagementRightsOfPublicForests from './managementRightsOfPublicForests'
import Disturbances from './disturbances'

import forestAreaWithinProtectedAreasTableSpec from '../../../assessmentFra/forestAreaWithinProtectedAreas/tableSpec'
import specificForestCategoriesTableSpec from '../../../assessmentFra/specificForestCategories/tableSpec'
import biomassStockTableSpec from '../../../assessmentFra/biomassStock/tableSpec'
import carbonStockTableSpec from '../../../assessmentFra/carbonStock/tableSpec'
import forestOwnershipTableSpec from '../../../assessmentFra/forestOwnership/tableSpec'
// import holderOfManagementRightsTableSpec from '../../../assessmentFra/holderOfManagementRights/tableSpec'
import disturbancesTableSpec from '../../../assessmentFra/disturbances/tableSpec'
import areaAffectedByFireTableSpec from '../../../assessmentFra/areaAffectedByFire/tableSpec'

import { fetchTableData } from '../../../traditionalTable/actions'
import { fetch } from '../../../assessmentFra/growingStock/actions'

import defaultYears from '../../../../server/eof/defaultYears'

class ContentCheckView extends React.Component {

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { countryIso } = this.props
    const { countryIso: countryIsoPrev } = prevProps
    if (countryIso !== countryIsoPrev)
      this.fetchData()
  }

  fetchData () {
    const {
      fetchTableData,
      countryIso, i18n,
      extentOfForest, forestCharacteristics,
    } = this.props

    //1
    fetchTableData(countryIso, specificForestCategoriesTableSpec(i18n, extentOfForest, forestCharacteristics))
    //2
    fetch(countryIso)
    fetchTableData(countryIso, biomassStockTableSpec(i18n))
    fetchTableData(countryIso, carbonStockTableSpec(i18n))
    //3
    fetchTableData(countryIso, forestAreaWithinProtectedAreasTableSpec(i18n, extentOfForest))
    //4
    fetchTableData(countryIso, forestOwnershipTableSpec(i18n, extentOfForest, countryIso))
    // fetchTableData(countryIso, holderOfManagementRightsTableSpec(i18n, forestOwnership, countryIso))
    //5
    fetchTableData(countryIso, disturbancesTableSpec(i18n, extentOfForest, countryIso))
    fetchTableData(countryIso, areaAffectedByFireTableSpec(i18n))
  }

  render () {
    const {
      countryIso, i18n,
      //1
      extentOfForest, forestCharacteristics, specificForestCategories,
      //2
      growingStock, biomassStock, carbonStock,
      //3
      forestAreaWithinProtectedAreas,
      //4
      forestOwnership,
      //5
      disturbances, areaAffectedByFire,
      //8
      certifiedAreas
    } = this.props

    const getFraValue = (variable, year, source = extentOfForest) => R.pipe(
      R.prop('fra'),
      R.find(R.propEq('year', year)),
      R.prop(variable),
    )(source)

    const tableData5YearsMapping = { 1990: 1, 2000: 2, 2010: 3, 2015: 4, 2020: 5 }

    return forestCharacteristics && specificForestCategories &&
    growingStock && biomassStock && carbonStock &&
    forestAreaWithinProtectedAreas &&
    forestOwnership &&
    disturbances && areaAffectedByFire
      ? (
        <div>

          <Extent i18n={i18n} years={defaultYears}
                  getFraValue={getFraValue} tableData5YearsMapping={tableData5YearsMapping}
                  extentOfForest={extentOfForest}
                  specificForestCategories={specificForestCategories}
                  forestAreaWithinProtectedAreas={forestAreaWithinProtectedAreas}
                  certifiedAreas={certifiedAreas}/>


          <PeriodicChangeRate i18n={i18n} years={defaultYears}
                              getFraValue={getFraValue} tableData5YearsMapping={tableData5YearsMapping}
                              extentOfForest={extentOfForest} forestCharacteristics={forestCharacteristics}
                              specificForestCategories={specificForestCategories}/>

          <ForestGSBiomassCarbon i18n={i18n} years={defaultYears}
                                 biomassStock={biomassStock}
                                 growingStock={growingStock}
                                 carbonStock={carbonStock}/>

          <PrimaryDesignatedManagementObjectiveView i18n={i18n} countryIso={countryIso}
                                                    years={defaultYears}
                                                    extentOfForest={extentOfForest}/>

          <TotalAreaDesignatedManagementObjectiveView i18n={i18n} countryIso={countryIso}
                                                      years={defaultYears}/>

          <ForestOwnership i18n={i18n} countryIso={countryIso}
                           years={defaultYears}
                           extentOfForest={extentOfForest}
                           forestOwnership={forestOwnership}/>

          <ManagementRightsOfPublicForests i18n={i18n} countryIso={countryIso}
                                           years={defaultYears}
                                           forestOwnership={forestOwnership}/>

          <Disturbances i18n={i18n} countryIso={countryIso}
                        disturbances={disturbances} areaAffectedByFire={areaAffectedByFire}/>

        </div>
      )
      : null
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  countryIso: R.path(['router', 'country'])(state),

  extentOfForest: R.prop('extentOfForest')(state), //1a
  forestCharacteristics: R.prop('forestCharacteristics')(state), //1b
  specificForestCategories: R.path(['traditionalTable', 'specificForestCategories'])(state),//1e

  growingStock: R.prop('growingStock')(state), //2a
  biomassStock: R.path(['traditionalTable', 'biomassStock'])(state),//2c
  carbonStock: R.path(['traditionalTable', 'carbonStock'])(state),//2d

  forestAreaWithinProtectedAreas: R.path(['traditionalTable', 'forestAreaWithinProtectedAreas'])(state),//3b

  forestOwnership: R.path(['traditionalTable', 'forestOwnership'])(state),//4a
  // holderOfManagementRights: R.path(['traditionalTable', 'holderOfManagementRights'])(state),//4b

  disturbances: R.path(['traditionalTable', 'disturbances'])(state),//5a
  areaAffectedByFire: R.path(['traditionalTable', 'areaAffectedByFire'])(state),//5b

  certifiedAreas: R.path(['country', 'config', 'certifiedAreas'])(state), //8a
})

export default connect(
  mapStateToProps,
  { fetchTableData, fetch }
)(ContentCheckView)
