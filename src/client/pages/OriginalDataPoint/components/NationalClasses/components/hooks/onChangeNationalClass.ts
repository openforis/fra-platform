import React, { useCallback } from 'react'

import { ODPNationalClass, ODPs } from 'meta/assessment'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { Columns, useOnPaste } from 'client/pages/OriginalDataPoint/components/hooks/useOnPaste'
import { useUpdateNationalClasses } from 'client/pages/OriginalDataPoint/components/NationalClasses/components/hooks/useUpdateNationalClasses'

const columns: Columns = [
  { name: 'name', type: 'text' },
  { name: 'definition', type: 'text' },
]

type Props = {
  index: number
}

export const useOnChangeNationalClass = (props: Props) => {
  const { index } = props
  const originalDataPoint = useOriginalDataPoint()
  const updateNationalClasses = useUpdateNationalClasses()

  const onChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const field = 'name' as keyof ODPNationalClass
      const updateProps = { odp: originalDataPoint, index, field, value }
      const originalDataPointUpdate = ODPs.updateNationalClass(updateProps)
      updateNationalClasses(originalDataPointUpdate)
    },
    [originalDataPoint, index, updateNationalClasses]
  )

  const onChangeDefinition = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const caret = event.target.selectionStart
      const element = event.target
      window.requestAnimationFrame(() => {
        element.selectionStart = caret
        element.selectionEnd = caret
      })
      const { value } = event.target
      const field = 'definition' as keyof ODPNationalClass
      const updateProps = { odp: originalDataPoint, index, field, value }
      const originalDataPointUpdate = ODPs.updateNationalClass(updateProps)
      updateNationalClasses(originalDataPointUpdate)
    },
    [originalDataPoint, index, updateNationalClasses]
  )

  const _onPaste = useOnPaste({
    columns,
    index,
    allowGrow: true,
  })

  const onPasteName = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement> | React.ClipboardEvent<HTMLTextAreaElement>) => {
      const odp = _onPaste({ colIndex: 0, event })
      updateNationalClasses(odp)
    },
    [_onPaste, updateNationalClasses]
  )

  const onPasteDefinition = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement> | React.ClipboardEvent<HTMLTextAreaElement>) => {
      const odp = _onPaste({ colIndex: 1, event })
      updateNationalClasses(odp)
    },
    [_onPaste, updateNationalClasses]
  )

  return {
    onChangeName,
    onPasteName,
    onChangeDefinition,
    onPasteDefinition,
  }
}
