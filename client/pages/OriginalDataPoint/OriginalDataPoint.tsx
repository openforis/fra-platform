import './OriginalDataPoint.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useCountryIso } from '@client/hooks'
import NationalClasses from './components/NationalClasses'
import OriginalData from './components/OriginalData'
import Comments from './components/Comments'
import DataSources from './components/DataSources'
import ButtonBar from './components/ButtonBar'
import YearSelection from './components/YearSelection'

const OriginalDataPoint: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const originalDataPoint = useOriginalDataPoint()
  const { assessmentName, cycleName, odpId } = useParams<{ assessmentName: string; cycleName: string; odpId: string }>()
  // TODO: Handle canEditData
  const canEditData = false

  useEffect(() => {
    dispatch(
      OriginalDataPointActions.getOriginalDataPoint({
        odpId,
        assessmentName,
        cycleName,
      })
    )
    return () => {
      dispatch(OriginalDataPointActions.reset())
    }
  }, [])

  if (!originalDataPoint) {
    return null
  }

  if (originalDataPoint.countryIso !== countryIso) return null

  return (
    <div className="app-view__content">
      <div className="app-view__page-header">
        <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
        <ButtonBar canEditData={canEditData} />
      </div>

      <YearSelection canEditData={canEditData} />
      <DataSources canEditData={canEditData} />
      <NationalClasses canEditData={canEditData} />
      <OriginalData canEditData={canEditData} />
      <Comments canEditData={canEditData} />

      <div className="odp__bottom-buttons">
        <ButtonBar canEditData={canEditData} />
      </div>
    </div>
  )
}

export default OriginalDataPoint
