import React from 'react'
import { ODPNationalClass } from '@core/odp'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { readPasteClipboard } from '@client/utils/copyPasteUtil'
import { OriginalDataPoint } from '@meta/assessment'
import handlePaste from './handlePaste'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'

export const pasteNationalClass = createAsyncThunk<
  void,
  {
    odp: OriginalDataPoint
    event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
    colIndex: number
    rowIndex: number
    columns: Array<{ name: string; type: string }>
    allowedClass?: (nc?: ODPNationalClass) => boolean
    allowGrow?: boolean
    assessmentName: string
    cycleName: string
  }
>(
  'originalDataPoint/pasteNationalClass',
  async (
    {
      odp,
      rowIndex,
      event,
      colIndex,
      columns,
      allowedClass = () => true,
      allowGrow = false,
      assessmentName,
      cycleName,
    },
    { dispatch }
  ) => {
    const rawPastedData = readPasteClipboard(event, 'string')
    const { updatedOdp } = handlePaste(columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex)
    dispatch(
      updateOriginalDataPoint({
        assessmentName,
        cycleName,
        odpId: String(updatedOdp.id),
        originalDataPoint: updatedOdp,
      })
    )
  }
)
