import { useCallback } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { RepositoryEdit } from 'client/pages/CountryHome/Repository/Panel/repositoryEdit'

type Returned = () => Promise<void>

export const useOnSaveFile = (file: RepositoryEdit | null, setOpenPanel: (open: boolean) => void): Returned => {
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
