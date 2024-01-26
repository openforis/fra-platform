import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { NewFile } from 'client/pages/CountryHome/Repository/CreateFile/Panel/newFile'

type Returned = () => Promise<void>

export const useOnSaveFile = (file: NewFile | null, setOpenPanel: (open: boolean) => void): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<Returned>(async () => {
    const saveParams = { assessmentName, cycleName, countryIso, file }
    dispatch(RepositoryActions.save(saveParams))
      .unwrap()
      .then(() => {
        setOpenPanel(false)
      })
  }, [assessmentName, cycleName, countryIso, file, dispatch, setOpenPanel])
}
