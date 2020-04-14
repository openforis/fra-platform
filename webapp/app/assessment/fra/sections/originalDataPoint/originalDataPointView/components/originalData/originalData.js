import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

import * as FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/components/hooks'

import * as CountryState from '@webapp/app/country/countryState'

import ExtentOfForest from './extentOfForest'
import ForestCharacteristics from './forestCharacteristics'

const extentOfForest = FRA.sections['1'].children.a
const forestCharacteristics = FRA.sections['1'].children.b

const OriginalData = (props) => {
  const { canEditData, odp } = props
  const { odpId } = odp
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const useOriginalDataPointsInFoc = useSelector(CountryState.getConfigUseOriginalDataPointsInFoc)

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>

      <div className="odp__tab-controller">
        <NavLink
          className="odp__tab-item"
          activeClassName="active"
          to={BasePaths.getOdpLink(countryIso, extentOfForest.name, odpId)}
        >
          {`${extentOfForest.anchor} ${i18n.t('nationalDataPoint.forestCategoriesLabel')}`}
        </NavLink>
        <NavLink
          className={`odp__tab-item${useOriginalDataPointsInFoc ? '' : ' disabled'}`}
          activeClassName="active"
          to={BasePaths.getOdpLink(countryIso, forestCharacteristics.name, odpId)}
        >
          {`${forestCharacteristics.anchor} ${i18n.t('nationalDataPoint.forestCharacteristics')}`}
        </NavLink>
      </div>

      <Switch>
        <Route path={BasePaths.getOdpLink(':countryIso', extentOfForest.name, ':odpId')} exact>
          <ExtentOfForest canEditData={canEditData} odp={odp} />
        </Route>
        <Route path={BasePaths.getOdpLink(':countryIso', forestCharacteristics.name, ':odpId')} exact>
          <ForestCharacteristics canEditData={canEditData} odp={odp} />
        </Route>
      </Switch>
    </div>
  )
}

OriginalData.propTypes = {
  canEditData: PropTypes.bool.isRequired,
  odp: PropTypes.object.isRequired,
}

export default OriginalData
