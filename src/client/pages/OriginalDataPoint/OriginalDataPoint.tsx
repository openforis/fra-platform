import './OriginalDataPoint.scss'
import './OriginalDataPointSection.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { TableNames } from 'meta/assessment'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useIsEditTableDataEnabled } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import ButtonBar from './components/ButtonBar'
import Comments from './components/Comments'
import DataSources from './components/DataSources'
import NationalClasses from './components/NationalClasses'
import OriginalData from './components/OriginalData'
import YearSelection from './components/YearSelection'
import { useGetOriginalDataPoint } from './hooks/useGetOriginalDataPoint'
import { useGetReviewStatus } from './hooks/useGetReviewStatus'
import { useReservedYears } from './hooks/useReservedYears'

const OriginalDataPoint: React.FC = () => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const countryIso = useCountryIso()
  const originalDataPoint = useOriginalDataPoint()

  const isEditTableDataEnabled = useIsEditTableDataEnabled(TableNames.extentOfForest)
  const canEditData = originalDataPoint.id && isEditTableDataEnabled

  useReservedYears()
  useGetOriginalDataPoint()
  useGetReviewStatus()

  if (originalDataPoint.countryIso !== countryIso) navigate('/')

  return (
    <div className="app-view__content">
      <div className="app-view__page-header">
        <h1 className="title align-left">{i18n.t<string>('nationalDataPoint.nationalDataPoint')}</h1>
        <ButtonBar />
      </div>

      <YearSelection />
      <DataSources originalDataPoint={originalDataPoint} />
      <NationalClasses canEditData={canEditData} originalDataPoint={originalDataPoint} />
      <OriginalData canEditData={canEditData} originalDataPoint={originalDataPoint} />
      <Comments canEditData={canEditData} />

      <div className="odp__bottom-buttons">
        <ButtonBar />
      </div>
    </div>
  )
}

export default OriginalDataPoint
