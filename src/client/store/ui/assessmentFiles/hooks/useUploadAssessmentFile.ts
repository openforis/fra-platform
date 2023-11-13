import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store/store'
import { AssessmentFilesActions } from 'client/store/ui/assessmentFiles/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

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
