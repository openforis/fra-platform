import './OriginalDataPoint.less'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { batchActions } from '@webapp/store'
import { useCountryIso, useI18n } from '@webapp/hooks'
import * as CountryState from '@webapp/app/country/countryState'
import * as FraState from '@webapp/app/assessment/fra/fraState'
import { fetchExtentOfForest } from '@webapp/sectionSpec/fra/extentOfForest/actions'
import { OriginalDataPointActions, useODP } from '@webapp/store/page/originalDataPoint'

import ButtonBar from '@webapp/components/OriginalDataPoint/ButtonBar'
import YearSelection from '@webapp/components/OriginalDataPoint/YearSelection'
import DataSources from '@webapp/components/OriginalDataPoint/DataSources'
import NationalClasses from '@webapp/components/OriginalDataPoint/NationalClasses'
import OriginalData from '@webapp/components/OriginalDataPoint/OriginalData'
import Comments from '@webapp/components/OriginalDataPoint/Comments'
import { CountryActions } from '@webapp/store/country'

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
      // TODO: why OriginalDataPointActions.updateODP isn't recognized?
      // @ts-ignore
      dispatch(
        batchActions([CountryActions.fetchCountryStatus(countryIso), OriginalDataPointActions.updateODP({ odp: null })])
      )
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
