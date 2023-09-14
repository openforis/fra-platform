import './OriginalDataPoint.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { AssessmentName, TableNames } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { ReviewActions } from 'client/store/ui/review'
import { useIsEditTableDataEnabled, useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import ButtonBar from './components/ButtonBar'
import Comments from './components/Comments'
import DataSources from './components/DataSources'
import NationalClasses from './components/NationalClasses'
import OriginalData from './components/OriginalData'
import YearSelection from './components/YearSelection'

const OriginalDataPoint: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const countryIso = useCountryIso()
  const user = useUser()
  const originalDataPoint = useOriginalDataPoint()
  const { assessmentName, cycleName, sectionName, year } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    sectionName: string
    year: string
  }>()

  const isEditTableDataEnabled = useIsEditTableDataEnabled(TableNames.extentOfForest)
  const canEditData = originalDataPoint.id && isEditTableDataEnabled

  useEffect(() => {
    dispatch(
      OriginalDataPointActions.getOriginalDataPointReservedYears({
        countryIso,
        assessmentName,
        cycleName,
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch, originalDataPoint?.year])

  useEffect(() => {
    if (year !== '-1') {
      dispatch(
        OriginalDataPointActions.getOriginalDataPoint({
          year,
          assessmentName,
          countryIso,
          cycleName,
        })
      )
    }
    return () => {
      dispatch(OriginalDataPointActions.reset())
    }
  }, [assessmentName, countryIso, cycleName, dispatch, year])

  useEffect(() => {
    if (user) {
      dispatch(
        ReviewActions.getReviewStatus({
          countryIso,
          assessmentName,
          cycleName,
          sectionName,
          odpId: originalDataPoint?.id,
        })
      )
    }
  }, [originalDataPoint?.id, countryIso, assessmentName, cycleName, user, dispatch, sectionName])

  if (originalDataPoint.countryIso !== countryIso) navigate('/')

  return (
    <div className="app-view__content">
      <div className="app-view__page-header">
        <h1 className="title align-left">{i18n.t<string>('nationalDataPoint.nationalDataPoint')}</h1>
        <ButtonBar canEditData={canEditData} />
      </div>

      <YearSelection canEditData={isEditTableDataEnabled} />
      <DataSources originalDataPoint={originalDataPoint} canEditData={canEditData} />
      <NationalClasses originalDataPoint={originalDataPoint} canEditData={canEditData} />
      <OriginalData originalDataPoint={originalDataPoint} canEditData={canEditData} />
      <Comments canEditData={canEditData} />

      <div className="odp__bottom-buttons">
        <ButtonBar canEditData={canEditData} />
      </div>
    </div>
  )
}

export default OriginalDataPoint
