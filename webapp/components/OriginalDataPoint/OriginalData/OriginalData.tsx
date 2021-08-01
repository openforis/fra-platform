import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

import { FRA } from '@core/assessment'
import { ODP } from '@core/odp'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import * as CountryState from '@webapp/app/country/countryState'

import ExtentOfForest from '../ExtentOfForest'
import ForestCharacteristics from '../ForestCharacteristics'

const extentOfForest = FRA.sections['1'].children.a
const forestCharacteristics = FRA.sections['1'].children.b

type Props = {
  canEditData: boolean
  odp: ODP
}

const OriginalData: React.FC<Props> = (props) => {
  const { canEditData, odp } = props

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const useOriginalDataPointsInFoc = useSelector(CountryState.getConfigUseOriginalDataPointsInFoc)
  const { odpId } = odp

  return (
    <div>
      <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>

      <div className="odp__tab-controller">
        <NavLink
          className="odp__tab-item"
          activeClassName="active"
          to={BasePaths.getOdpLink(countryIso, FRA.type, extentOfForest.name, odpId)}
        >
          {`${extentOfForest.anchor} ${i18n.t('nationalDataPoint.forestCategoriesLabel')}`}
        </NavLink>
        <NavLink
          className={`odp__tab-item${useOriginalDataPointsInFoc ? '' : ' disabled'}`}
          activeClassName="active"
          to={BasePaths.getOdpLink(countryIso, FRA.type, forestCharacteristics.name, odpId)}
        >
          {`${forestCharacteristics.anchor} ${i18n.t('nationalDataPoint.forestCharacteristics')}`}
        </NavLink>
      </div>

      <Switch>
        <Route
          path={BasePaths.getOdpLink(
            BasePaths.PARAMS.countryIso,
            BasePaths.PARAMS.assessmentType,
            extentOfForest.name,
            BasePaths.PARAMS.odpId
          )}
          exact
        >
          <ExtentOfForest canEditData={canEditData} odp={odp} />
        </Route>
        <Route
          path={BasePaths.getOdpLink(
            BasePaths.PARAMS.countryIso,
            BasePaths.PARAMS.assessmentType,
            forestCharacteristics.name,
            BasePaths.PARAMS.odpId
          )}
          exact
        >
          <ForestCharacteristics canEditData={canEditData} odp={odp} />
        </Route>
      </Switch>
    </div>
  )
}

export default OriginalData
