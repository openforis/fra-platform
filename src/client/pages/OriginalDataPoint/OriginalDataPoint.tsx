import './OriginalDataPoint.scss'
import './OriginalDataPointSection.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { TableNames } from 'meta/assessment/table'

import { useOriginalDataPoint } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { OriginalDataPointSlice } from 'client/store/data/originalDataPoint/slice'
import { injectDataSlice } from 'client/store/data/reducer'
import { useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useCountryIso } from 'client/hooks/country'
import { useOnMount } from 'client/hooks/onMount'

import ButtonBar from './components/ButtonBar'
import DataSources from './components/DataSources'
import NationalClasses from './components/NationalClasses'
import OriginalData from './components/OriginalData'
import YearSelection from './components/YearSelection'
import { useGetOriginalDataPoint } from './hooks/useGetOriginalDataPoint'
import { useGetOriginalDataPointHistory } from './hooks/useGetOriginalDataPointHistory'
import { useGetReviewStatus } from './hooks/useGetReviewStatus'
import { useReservedYears } from './hooks/useReservedYears'

const OriginalDataPoint: React.FC = () => {
  useOnMount(() => {
    injectDataSlice(OriginalDataPointSlice)
  })

  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const countryIso = useCountryIso()
  const originalDataPoint = useOriginalDataPoint()

  const isEditTableDataEnabled = useIsEditTableDataEnabled(TableNames.extentOfForest)
  const canEditData = originalDataPoint.id && isEditTableDataEnabled

  useReservedYears()
  useGetOriginalDataPoint()
  useGetOriginalDataPointHistory()
  useGetReviewStatus()

  if (originalDataPoint.countryIso !== countryIso) navigate('/')

  return (
    <div className="app-view__content">
      <div className="odp__page-header">
        <h1 className="title">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
        <ButtonBar />
      </div>

      <YearSelection />
      <DataSources originalDataPoint={originalDataPoint} />
      <NationalClasses canEditData={canEditData} originalDataPoint={originalDataPoint} />
      <OriginalData canEditData={canEditData} originalDataPoint={originalDataPoint} />

      <div className="odp__bottom-buttons">
        <ButtonBar />
      </div>
    </div>
  )
}

export default OriginalDataPoint
