import React, { useCallback } from 'react'

import { ODPNationalClass, OriginalDataPoint } from 'meta/assessment'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import handlePaste from 'client/store/ui/originalDataPoint/actions/handlePaste'
import { readPasteClipboard } from 'client/utils/copyPasteUtil'

export type Columns = Array<{ name: keyof ODPNationalClass; type: string; precision?: number }>

type Props = {
  allowGrow?: boolean
  allowedClass?: (nc?: ODPNationalClass) => boolean
  columns: Columns
  index: number
}

type PropsCallback = {
  colIndex: number
  event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
}

export const useOnPaste = (props: Props): ((propsCallback: PropsCallback) => OriginalDataPoint) => {
  const { allowedClass = () => true, allowGrow = false, columns, index } = props
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

      return updatedOdp
    },
    [columns, allowedClass, originalDataPoint, allowGrow, index]
  )
}
