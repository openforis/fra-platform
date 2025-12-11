import { useCallback, useEffect, useState, useTransition } from 'react'

import { ExplorerCountryOptions } from 'meta/explorer/selection'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerCountryOptions } from 'client/store/explorer/selection/hooks/options'
import { useAppDispatch } from 'client/store/hooks'
import { useCycleRouteParams } from 'client/hooks/routeParams'

type Returned = {
  applyOptions: () => void
  options: ExplorerCountryOptions
  resetOptions: () => void
  toggleOption: (key: keyof ExplorerCountryOptions) => void
}

export const useCountryOptionsSelection = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const [, startTransition] = useTransition()

  const storeOptions = useExplorerCountryOptions()
  const [options, setOptions] = useState<ExplorerCountryOptions>(storeOptions)

  useEffect(() => {
    setOptions(storeOptions)
  }, [storeOptions])

  const toggleOption = useCallback<Returned['toggleOption']>((key) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }, [])

  const resetOptions = useCallback<Returned['resetOptions']>(() => {
    setOptions(storeOptions)
  }, [storeOptions])

  const applyOptions = useCallback<Returned['applyOptions']>(() => {
    startTransition(() => {
      dispatch(
        ExplorerSelectionActions.setCountryOptions({
          assessmentName,
          cycleName,
          options,
        })
      )
    })
  }, [assessmentName, cycleName, dispatch, options])

  return { applyOptions, options, resetOptions, toggleOption }
}
