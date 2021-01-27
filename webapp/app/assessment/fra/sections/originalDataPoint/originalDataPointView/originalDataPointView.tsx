import './originalDataPointView.less'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { batchActions } from '@webapp/main/reduxBatch'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import * as CountryState from '@webapp/app/country/countryState'
import * as FraState from '@webapp/app/assessment/fra/fraState'
import { fetchCountryOverviewStatus } from '@webapp/app/country/actions'
import ButtonBar from './components/buttonBar'
import YearSelection from './components/yearSelection'
import DataSources from './components/dataSources'
import NationalClasses from './components/nationalClasses'
import OriginalData from './components/originalData'
import Comments from './components/comments'
import * as OriginalDataPointState from '../originalDataPointState'
import { fetch, clearActive } from '../actions'
import { fetchExtentOfForest } from '../../extentOfForest/actions'

const OriginalDataPointView = () => {
  const dispatch = useDispatch()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'odpId' does not exist on type '{}'.
  const { odpId } = useParams()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const odp = useSelector(OriginalDataPointState.getActive)
  const canEditData = useSelector((state) => CountryState.getCanEditData(state) && !FraState.isLocked(state))
  useEffect(() => {
    dispatch(batchActions([fetch(odpId, countryIso), fetchExtentOfForest()]))
    return () => {
      dispatch(batchActions([fetchCountryOverviewStatus(countryIso), clearActive()]))
    }
  }, [])
  if (!odp) {
    return null
  }
  return (
    <div className="app-view__content">
      <div className="app-view__page-header">
        <h1 className="title align-left">{(i18n as any).t('nationalDataPoint.nationalDataPoint')}</h1>
        <ButtonBar canEditData={canEditData} odp={odp} />
      </div>

      <YearSelection canEditData={canEditData} odp={odp} />
      <DataSources canEditData={canEditData} odp={odp} />
      <NationalClasses canEditData={canEditData} odp={odp} />
      <OriginalData canEditData={canEditData} odp={odp} />
      <Comments canEditData={canEditData} odp={odp} />

      <div className="odp__bottom-buttons">
        <ButtonBar canEditData={canEditData} odp={odp} />
      </div>
    </div>
  )
}
export default OriginalDataPointView
