import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import * as CountryState from '@webapp/app/country/countryState'
import ExtentOfForest from './extentOfForest'
import ForestCharacteristics from './forestCharacteristics'

const extentOfForest = FRA.sections['1'].children.a
const forestCharacteristics = FRA.sections['1'].children.b
type Props = {
  canEditData: boolean
  odp: any
}
const OriginalData = (props: Props) => {
  const { canEditData, odp } = props
  const { odpId } = odp
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const useOriginalDataPointsInFoc = useSelector(CountryState.getConfigUseOriginalDataPointsInFoc)
  return (
    <div>
      <h2 className="headline">{(i18n as any).t('nationalDataPoint.reclassificationLabel')}</h2>

      <div className="odp__tab-controller">
        <NavLink
          className="odp__tab-item"
          activeClassName="active"
          to={BasePaths.getOdpLink(countryIso, FRA.type, extentOfForest.name, odpId)}
        >
          {`${extentOfForest.anchor} ${(i18n as any).t('nationalDataPoint.forestCategoriesLabel')}`}
        </NavLink>
        <NavLink
          className={`odp__tab-item${useOriginalDataPointsInFoc ? '' : ' disabled'}`}
          activeClassName="active"
          to={BasePaths.getOdpLink(countryIso, FRA.type, forestCharacteristics.name, odpId)}
        >
          {`${forestCharacteristics.anchor} ${(i18n as any).t('nationalDataPoint.forestCharacteristics')}`}
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
