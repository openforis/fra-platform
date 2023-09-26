import React, { useCallback } from 'react'

import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import handlePaste from 'client/store/ui/originalDataPoint/actions/handlePaste'
import { readPasteClipboard } from 'client/utils/copyPasteUtil'

export type Columns = Array<{ name: string; type: string }>

type Props = {
  allowGrow?: boolean
  allowedClass?: (nc?: ODPNationalClass) => boolean
  callback: (originalDataPoint: OriginalDataPoint) => void
  columns: Columns
  index: number
}

type PropsCallback = {
  colIndex: number
  event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
}

export const useOnPaste = (props: Props) => {
  const { allowedClass = () => true, allowGrow = false, callback, columns, index } = props
  const originalDataPoint = useOriginalDataPoint()

  return useCallback(
    (propsCallback: PropsCallback) => {
      const { colIndex, event } = propsCallback

      const rawPastedData = readPasteClipboard(event, 'string')
      const { updatedOdp } = handlePaste(
        columns,
        allowedClass,
        originalDataPoint,
        allowGrow,
        rawPastedData,
        index,
        colIndex
      )

      callback(updatedOdp)
    },
    [columns, allowedClass, originalDataPoint, allowGrow, index, callback]
  )
}
