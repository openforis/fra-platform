import React, { RefObject, useState } from 'react'
import { CSVLink } from 'react-csv'

import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useIsPrintRoute } from 'client/hooks/routes'
import Button, { ButtonProps, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { useFilename } from './hooks/useFilename'
import { useOnCsvClick } from './hooks/useOnCsvClick'
import { useOnExcelClick } from './hooks/useOnExcelClick'

type Props = Pick<ButtonProps, 'size'> & {
  disabled?: boolean
  filename?: string
  gridRef: RefObject<HTMLDivElement>
}

const ButtonGridExport: React.FC<Props> = (props) => {
  const { disabled, filename: _filename = 'tableData', gridRef, size } = props

  const [data, setData] = useState<Array<Array<string>>>([])

  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()
  const isDisabled = !isLocked || disabled

  const csvClassName = useButtonClassName({
    className: 'btn-csv-download',
    disabled: isDisabled,
    iconName: 'hit-down',
    label: 'CSV',
    size,
  })

  const csvFilename = useFilename({ extension: 'csv', filename: _filename })
  const excelFilename = useFilename({ extension: 'xlsx', filename: _filename })
  const onExcelClick = useOnExcelClick({ filename: excelFilename, gridRef })
  const onCsvClick = useOnCsvClick({ gridRef, setData })

  if (print) return null

  return (
    <>
      <Button disabled={isDisabled} iconName="hit-down" label="XLSX" onClick={onExcelClick} size={size} />
      <CSVLink
        asyncOnClick
        className={csvClassName}
        data={data}
        filename={csvFilename}
        onClick={onCsvClick}
        target="_blank"
      >
        <Icon name="hit-down" />
        CSV
      </CSVLink>
    </>
  )
}

export default ButtonGridExport
