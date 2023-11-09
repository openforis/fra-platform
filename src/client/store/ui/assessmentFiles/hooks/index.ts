import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useAppDispatch, useAppSelector } from 'client/store'
import { AssessmentFilesActions } from 'client/store/ui/assessmentFiles/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

import { AssessmentFilesState } from '../stateType'

export const useAssessmentFiles = (): AssessmentFilesState => useAppSelector((state) => state.ui.assessmentFiles)

export const useGetAssessmentFiles = (): void => {
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      AssessmentFilesActions.getFiles({
        assessmentName,
        cycleName,
        countryIso,
      })
    )
  }, [dispatch, assessmentName, cycleName, countryIso])
}

export const useUpdateAssessmentFiles = () => {
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()

  const { t } = useTranslation()

  return useCallback(
    (props: { fileCountryIso?: CountryIso; file: File }) => {
      const { fileCountryIso, file } = props
      dispatch(
        AssessmentFilesActions.upload({
          assessmentName,
          cycleName,
          countryIso,
          file,
          fileCountryIso,
        })
      ).then(() => {
        toaster.success(t('landing.links.fileUploaded'))
      })
    },
    [dispatch, assessmentName, cycleName, countryIso, toaster, t]
  )
}

export const useDeleteAssessmentFile = () => {
  const { assessmentName, cycleName, countryIso: _countryIso } = useCountryRouteParams()
  const countryIso = _countryIso as CountryIso
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()

  const { t } = useTranslation()

  return useCallback(
    (uuid: string, fileCountryIso?: CountryIso) => {
      dispatch(
        AssessmentFilesActions.deleteFile({
          assessmentName,
          cycleName,
          countryIso,
          uuid,
          fileCountryIso,
        })
      ).then(() => {
        toaster.success(t('landing.links.fileDeleted'))
      })
    },
    [dispatch, assessmentName, cycleName, countryIso, toaster, t]
  )
}
