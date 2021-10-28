import { ODP, ODPNationalClass } from '@core/odp'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import React from 'react'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import handlePaste from '@webapp/sectionSpec/fra/originalDataPoint/paste'

import { createAsyncThunk } from '@reduxjs/toolkit'

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
