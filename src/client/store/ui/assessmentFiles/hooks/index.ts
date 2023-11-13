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
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      AssessmentFilesActions.getFiles({
        assessmentName,
        cycleName,
        countryIso,
      })
    )
  }, [countryIso, dispatch, assessmentName, cycleName])
}

type UploadAssessmentFileProps = { fileCountryIso?: CountryIso; file: File }
type UseUploadAssessmentFile = (props: UploadAssessmentFileProps) => void
export const useUploadAssessmentFile = (): UseUploadAssessmentFile => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()
  const { t } = useTranslation()

  return useCallback<UseUploadAssessmentFile>(
    (props: UploadAssessmentFileProps) => {
      const { fileCountryIso, file } = props
      const uploadProps = { assessmentName, cycleName, countryIso, file, fileCountryIso }
      const callback = () => {
        toaster.success(t('landing.links.fileUploaded'))
      }
      dispatch(AssessmentFilesActions.upload(uploadProps)).then(callback)
    },
    [dispatch, assessmentName, cycleName, countryIso, toaster, t]
  )
}

type UseDeleteAssessmentFile = (uuid: string, fileCountryIso?: CountryIso) => void
export const useDeleteAssessmentFile = (): UseDeleteAssessmentFile => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()
  const { t } = useTranslation()

  return useCallback<UseDeleteAssessmentFile>(
    (uuid: string, fileCountryIso?: CountryIso) => {
      const deleteFileProps = { assessmentName, cycleName, countryIso, uuid, fileCountryIso }
      const callback = () => {
        toaster.success(t('landing.links.fileDeleted'))
      }
      dispatch(AssessmentFilesActions.deleteFile(deleteFileProps)).then(callback)
    },
    [dispatch, assessmentName, cycleName, countryIso, toaster, t]
  )
}
