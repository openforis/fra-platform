import React, { MutableRefObject, useState } from 'react'
import { CSVLink } from 'react-csv'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { ButtonProps, useButtonClassName } from 'client/components/Buttons/Button'
import { getDataGridData } from 'client/components/DataGrid/utils'
import Icon from 'client/components/Icon'

import { useFilename } from './hooks/useFilename'

type Props = Pick<ButtonProps, 'size'> & {
  disabled?: boolean
  filename?: string
  gridRef: MutableRefObject<HTMLDivElement>
}

const ButtonGridExport: React.FC<Props> = (props) => {
  const { disabled, filename: filenameProp, gridRef, size } = props

  const [data, setData] = useState<Array<object>>([])

  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()

  const className = useButtonClassName({ disabled: !isLocked || disabled, iconName: 'hit-down', label: 'CSV', size })
  const filename = useFilename(filenameProp)

  if (print) return null

  return (
    <CSVLink
      asyncOnClick
      className={className}
      data={data}
      filename={`${filename}.csv`}
      onClick={(_, done) => {
        setData(getDataGridData(gridRef.current))
        done()
      }}
      target="_blank"
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

ButtonGridExport.defaultProps = {
  disabled: false,
  filename: 'tableData',
}

export default ButtonGridExport
