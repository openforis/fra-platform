import React from 'react'

import { NodeExtCellType } from 'meta/nodeExt/cellType'

import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import { useLinkValidationErrors } from 'client/components/EditorWYSIWYG/hooks/useLinkValidationErrors'
import { NodeExtCell } from 'client/components/TableNodeExt/types'

import { CellProps } from '../CellProps'

const CellLink: React.FC<CellProps<NodeExtCell<NodeExtCellType.text>>> = (props) => {
  const { disabled, nodeExt, onChange } = props

  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const value = nodeExt?.value?.raw ?? ''
  const validationErrors = useLinkValidationErrors({ enabled: canEditCycleData && !print, value })

  return (
    <EditorWYSIWYGLinks disabled={disabled} onChange={onChange} validationErrors={validationErrors} value={value} />
  )
}

export default CellLink
