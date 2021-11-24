import { ODP, ODPNationalClass } from '@core/odp'
import { OriginalDataPointActions } from '../../../../store/page/originalDataPoint'
import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { readPasteClipboard } from '../../../../utils/copyPasteUtil'
import handlePaste from '../../../../store/page/originalDataPoint/actions/handlePaste'

export const pasteNationalClass = createAsyncThunk<
  void,
  {
    odp: ODP
    event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
    colIndex: number
    rowIndex: number
    columns: Array<{ name: string; type: string }>
    allowedClass?: (nc?: ODPNationalClass) => boolean
    allowGrow?: boolean
  }
>(
  'originalDataPoint/pasteNationalClass',
  async ({ odp, rowIndex, event, colIndex, columns, allowedClass = () => true, allowGrow = false }, { dispatch }) => {
    const rawPastedData = readPasteClipboard(event, 'string')
    const { updatedOdp } = handlePaste(columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex)
    dispatch(OriginalDataPointActions.updateODP({ odp: updatedOdp }))
  }
)
