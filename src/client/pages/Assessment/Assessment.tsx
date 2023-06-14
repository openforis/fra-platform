import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useParams } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { AssessmentName, AssessmentNames } from 'meta/assessment'
import { Lang } from 'meta/lang'

import { useAppDispatch } from 'client/store'
import { AssessmentActions, useAssessment } from 'client/store/assessment'
import { useOnUpdate } from 'client/hooks'
import { updateLanguage } from 'client/utils/updateLanguage'

import Cycle from '../Cycle'

const Assessment: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const { i18n } = useTranslation()

  const { assessmentName } = useParams<{ assessmentName: AssessmentName }>()

  useEffect(() => {
    if (!assessment) {
      dispatch(AssessmentActions.getAssessment({ assessmentName }))
    }
  }, [assessment, assessmentName, dispatch])

  useOnUpdate(() => {
    if (assessment && assessment.props.name !== assessmentName) {
      dispatch(AssessmentActions.getAssessment({ assessmentName }))

      return () => {
        dispatch(AssessmentActions.reset())
      }
    }
    return undefined
  }, [assessment, assessmentName, dispatch])

  // If the assessment is panEuropean, we use the english language,
  useEffect(() => {
    if (assessment?.props.name === AssessmentNames.panEuropean) {
      ;(async () => {
        await i18n.changeLanguage(Lang.en)
      })()
    } else {
      ;(async () => {
        const _lang = await localStorage.getItem('i18n/lang')
        if (_lang) {
          await updateLanguage(_lang as Lang, i18n)
        }
      })()
    }
  }, [assessment?.props.name, i18n])

  if (!assessment) return null

  return (
    <Routes>
      <Route path={`${ClientRoutes.Assessment.Cycle.Landing.path.relative}/*`} element={<Cycle />} />
    </Routes>
  )
}

export default Assessment
