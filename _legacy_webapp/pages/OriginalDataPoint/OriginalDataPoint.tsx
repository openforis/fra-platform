import './OriginalDataPoint.less'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { batchActions } from '../../store'
import { useCountryIso, useI18n } from '../../hooks'
import * as CountryState from '../../app/country/countryState'
import * as FraState from '../../app/assessment/fra/fraState'
import { fetchExtentOfForest } from '../../sectionSpec/fra/extentOfForest/actions'
import { OriginalDataPointActions, useODP } from '../../store/page/originalDataPoint'

import ButtonBar from '../../components/OriginalDataPoint/ButtonBar'
import YearSelection from '../../components/OriginalDataPoint/YearSelection'
import DataSources from '../../components/OriginalDataPoint/DataSources'
import NationalClasses from '../../components/OriginalDataPoint/NationalClasses'
import OriginalData from '../../components/OriginalDataPoint/OriginalData'
import Comments from '../../components/OriginalDataPoint/Comments'
import { CountryActions } from '../../store/country'

const OriginalDataPoint: React.FC = () => {
  const dispatch = useDispatch()
  const { odpId } = useParams<{ odpId: string }>()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const odp = useODP()
  const canEditData = useSelector((state) => CountryState.getCanEditData(state) && !FraState.isLocked(state))

  useEffect(() => {
    dispatch(batchActions([OriginalDataPointActions.fetchODP({ id: odpId }), fetchExtentOfForest()]))

    return () => {
      dispatch(batchActions([CountryActions.fetchCountryStatus(countryIso), OriginalDataPointActions.setODP(null)]))
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
