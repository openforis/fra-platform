import './OriginalDataPoint.scss'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BasePaths } from '@client/basePaths'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@client/store'
import { OriginalDataPointActions, useOriginalDataPoint } from '@client/store/pages/originalDataPoint'
import { useCanEditSection } from '@client/store/user'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useCountryIso } from '@client/hooks'
import NationalClasses from './components/NationalClasses'
import OriginalData from './components/OriginalData'
// import Comments from './components/Comments'
import DataSources from './components/DataSources'
import ButtonBar from './components/ButtonBar'
import YearSelection from './components/YearSelection'

const OriginalDataPoint: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const countryIso = useCountryIso()
  const originalDataPoint = useOriginalDataPoint()
  const { assessmentName, cycleName, odpId } = useParams<{ assessmentName: string; cycleName: string; odpId: string }>()

  const canEditData = useCanEditSection()

  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName,
        cycleName,
        section: 'extentOfForest',
        countryIso,
      })
    )
    dispatch(
      OriginalDataPointActions.getOriginalDataPoint({
        odpId,
        assessmentName,
        cycleName,
      })
    )
    return () => {
      dispatch(AssessmentSectionActions.reset())

      dispatch(OriginalDataPointActions.reset())
    }
  }, [])

  if (!originalDataPoint) return null

  if (originalDataPoint.countryIso !== countryIso) history.push(BasePaths.Root())

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
      {/* <Comments canEditData={canEditData} /> */}

      <div className="odp__bottom-buttons">
        <ButtonBar canEditData={canEditData} />
      </div>
    </div>
  )
}

export default OriginalDataPoint
