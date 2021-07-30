import './OriginalDataPoint.less'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { ODP } from '@core/odp'
import { batchActions } from '@webapp/main/reduxBatch'
import { useCountryIso, useI18n } from '@webapp/components/hooks'
import * as CountryState from '@webapp/app/country/countryState'
import * as FraState from '@webapp/app/assessment/fra/fraState'
import { fetchCountryOverviewStatus } from '@webapp/app/country/actions'
import * as OriginalDataPointState from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointState'
import { fetch, clearActive } from '@webapp/app/assessment/fra/sections/originalDataPoint/actions'
import { fetchExtentOfForest } from '@webapp/app/assessment/fra/sections/extentOfForest/actions'

import { ButtonBar } from '@webapp/components/OriginalDataPoint'
import YearSelection from '../../app/assessment/fra/sections/originalDataPoint/OriginalDataPoint/components/yearSelection'
import DataSources from '../../app/assessment/fra/sections/originalDataPoint/OriginalDataPoint/components/dataSources'
import NationalClasses from '../../app/assessment/fra/sections/originalDataPoint/OriginalDataPoint/components/nationalClasses'
import OriginalData from '../../app/assessment/fra/sections/originalDataPoint/OriginalDataPoint/components/originalData'
import Comments from '../../app/assessment/fra/sections/originalDataPoint/OriginalDataPoint/components/comments'

const OriginalDataPoint: React.FC = () => {
  const dispatch = useDispatch()
  const { odpId } = useParams<{ odpId: string }>()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const odp = useSelector(OriginalDataPointState.getActive) as ODP
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
        <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
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

export default OriginalDataPoint
