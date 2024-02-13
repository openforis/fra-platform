import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { FileUploadActions } from 'client/store/ui/fileUpload/actions'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOnDrop = (): ((files: Array<File>) => void) => {
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(
    async (files: Array<File>) => {
      dispatch(FileUploadActions.uploadFiles({ assessmentName, cycleName, countryIso, files }))
    },
    [assessmentName, countryIso, cycleName, dispatch]
  )
}
