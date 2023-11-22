import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store/store'
import { AssessmentFilesActions } from 'client/store/ui/assessmentFiles/slice'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

type UseDeleteAssessmentFile = (uuid: string, fileCountryIso?: CountryIso) => void
export const useDeleteAssessmentFile = (): UseDeleteAssessmentFile => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()
  const { t } = useTranslation()

  return useCallback<UseDeleteAssessmentFile>(
    (uuid: string, fileCountryIso?: CountryIso) => {
      const deleteFileProps = { assessmentName, cycleName, countryIso, uuid, fileCountryIso }
      dispatch(AssessmentFilesActions.deleteFile(deleteFileProps)).then((action) => {
        if (action.type.includes('fulfilled')) {
          toaster.success(t('landing.links.fileDeleted'))
        }
      })
    },
    [dispatch, assessmentName, cycleName, countryIso, toaster, t]
  )
}
