import { ODP, ODPNationalClass } from '@core/odp'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import { AppDispatch } from '@webapp/store'
import React from 'react'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import handlePaste from '@webapp/sectionSpec/fra/originalDataPoint/paste'

export const pasteNationalClass = (
  props: {
    odp: ODP
    event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
    colIndex: number
    rowIndex: number
    columns: Array<{ name: string; type: string }>
    allowedClass?: (nc?: ODPNationalClass) => boolean
    allowGrow?: boolean
  },
  dispatch: AppDispatch
) => {
  const { odp, rowIndex, event, colIndex, columns, allowedClass = () => true, allowGrow = false } = props

  const rawPastedData = readPasteClipboard(event, 'string')
  const { updatedOdp } = handlePaste(columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex)
  dispatch(OriginalDataPointActions.updateODP({ odp: updatedOdp }))
}
