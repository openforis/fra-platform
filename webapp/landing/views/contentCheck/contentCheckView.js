import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import forestAreaWithinProtectedAreasTableSpec from '../../../assessmentFra/forestAreaWithinProtectedAreas/tableSpec'
import specificForestCategoriesTableSpec from '../../../assessmentFra/specificForestCategories/tableSpec'
import biomassStockTableSpec from '../../../assessmentFra/biomassStock/tableSpec'
import carbonStockTableSpec from '../../../assessmentFra/carbonStock/tableSpec'
import { primaryDesignatedManagementObjectiveTableSpec } from '../../../assessmentFra/designatedManagementObjective/tableSpecs'
import forestOwnershipTableSpec from '../../../assessmentFra/forestOwnership/tableSpec'
import holderOfManagementRightsTableSpec from '../../../assessmentFra/holderOfManagementRights/tableSpec'
import disturbancesTableSpec from '../../../assessmentFra/disturbances/tableSpec'
import areaAffectedByFireTableSpec from '../../../assessmentFra/areaAffectedByFire/tableSpec'

import { fetchTableData } from '../../../traditionalTable/actions'
import { fetchItem } from '../../../tableWithOdp/actions'
import { fetch } from '../../../assessmentFra/growingStock/actions'

class ContentCheckView extends React.Component {

  componentDidMount () {
    const {
      fetchTableData, fetchItem,
      countryIso, i18n,
      extentOfForest, forestCharacteristics, forestOwnership,
    } = this.props

    //1
    fetchItem('forestCharacteristics', countryIso)
    fetchTableData(countryIso, specificForestCategoriesTableSpec(i18n, extentOfForest, forestCharacteristics))
    //2
    fetch(countryIso)
    fetchTableData(countryIso, biomassStockTableSpec(i18n))
    fetchTableData(countryIso, carbonStockTableSpec(i18n))
    //3
    fetchTableData(countryIso, primaryDesignatedManagementObjectiveTableSpec(i18n, extentOfForest, countryIso))
    fetchTableData(countryIso, forestAreaWithinProtectedAreasTableSpec(i18n, extentOfForest))
    //4
    fetchTableData(countryIso, forestOwnershipTableSpec(i18n, extentOfForest, countryIso))
    fetchTableData(countryIso, holderOfManagementRightsTableSpec(i18n, forestOwnership, countryIso))
    //5
    fetchTableData(countryIso, disturbancesTableSpec(i18n, extentOfForest, countryIso))
    fetchTableData(countryIso, areaAffectedByFireTableSpec(i18n))

  }

  render () {

    // console.log('==== ', this.props)
    return (
      <div>
        fdsafads
      </div>
    )
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

  primaryDesignatedManagementObjective: R.path(['traditionalTable', 'primaryDesignatedManagementObjective'])(state),//3a
  forestAreaWithinProtectedAreas: R.path(['traditionalTable', 'forestAreaWithinProtectedAreas'])(state),//3b

  forestOwnership: R.path(['traditionalTable', 'forestOwnership'])(state),//4a
  holderOfManagementRights: R.path(['traditionalTable', 'holderOfManagementRights'])(state),//4b

  disturbances: R.path(['traditionalTable', 'disturbances'])(state),//5a
  areaAffectedByFire: R.path(['traditionalTable', 'areaAffectedByFire'])(state),//5b

  certifiedAreas: R.path(['country', 'config', 'certifiedAreas'])(state), //8a
})

export default connect(
  mapStateToProps,
  {fetchTableData, fetchItem, fetch}
)(ContentCheckView)
