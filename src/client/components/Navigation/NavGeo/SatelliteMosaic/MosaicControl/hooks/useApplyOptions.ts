import { useCallback, useMemo } from 'react'

import { Objects } from 'utils/objects'

import { LayerFetchStatus } from 'client/store/geo/layers/state'
import { MosaicActions } from 'client/store/geo/mosaic/actions'
import {
  useMosaicOptions,
  useMosaicSelected,
  useMosaicStatus,
  useMosaicUrlTemplateData,
} from 'client/store/geo/mosaic/hooks/mosaic'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'

type Returned = {
  applyOptions: () => void
  disabled: boolean
}

const useApplyOptions = (): Returned => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const selected = useMosaicSelected()
  const urlTemplateData = useMosaicUrlTemplateData()
  const mosaicOptions = useMosaicOptions()
  const status = useMosaicStatus()

  const applyOptions = useCallback<Returned['applyOptions']>(() => {
    if (!selected) return
    dispatch(MosaicActions.getUrlTemplate({ countryIso }))
  }, [countryIso, dispatch, selected])

  const optionsHaveChanged = useMemo<boolean>(() => {
    const { requestOptions } = urlTemplateData ?? {}
    return !Objects.isEqual(mosaicOptions, requestOptions)
  }, [mosaicOptions, urlTemplateData])

  const disabled = useMemo<boolean>(() => {
    return !optionsHaveChanged || Objects.isEmpty(status) || status === LayerFetchStatus.Loading
  }, [optionsHaveChanged, status])

  return { applyOptions, disabled }
}

export default useApplyOptions
