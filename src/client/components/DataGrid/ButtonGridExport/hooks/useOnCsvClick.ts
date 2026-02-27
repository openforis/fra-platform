import { RefObject, useCallback } from 'react'
import type { AsyncClickHandler } from 'react-csv/components/CommonPropTypes'
import { flushSync } from 'react-dom'

import { useGetExportData } from './useGetExportData'

type Props = {
  gridRef: RefObject<HTMLDivElement>
  setData: (data: Array<Array<string>>) => void
}

export const useOnCsvClick = (props: Props): AsyncClickHandler => {
  const { gridRef, setData } = props

  const getExportData = useGetExportData({ gridRef })

  return useCallback(
    (_, done): void => {
      flushSync(() => {
        const { data } = getExportData()
        setData(data)
      })
      done()
    },
    [getExportData, setData]
  )
}
