import { useCallback } from 'react'

import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { NewFile } from 'client/pages/CountryHome/Repository/CreateFile/Panel/newFile'

type Returned = () => Promise<void>

export const useOnSaveFile = (file: NewFile | null): Returned => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  return useCallback<Returned>(async () => {
    const formData = new FormData()
    formData.append('name', file?.name || '')
    formData.append('link', file?.link || '')

    if (file?.file) {
      formData.append('file', file.file)
    }

    await axios.post(ApiEndPoint.CycleData.Repository.one(), formData, {
      params: {
        countryIso,
        assessmentName,
        cycleName,
      },
    })
  }, [file, assessmentName, cycleName, countryIso])
}
