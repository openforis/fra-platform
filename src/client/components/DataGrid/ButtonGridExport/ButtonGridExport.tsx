import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'

import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useIsPrintRoute } from 'client/hooks/routes'
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
  const { disabled, filename: _filename = 'tableData', gridRef, size } = props

  const [data, setData] = useState<Array<object>>([])
  const csvLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()

  const className = useButtonClassName({
    disabled: !isLocked || disabled,
    iconName: 'hit-down',
    label: 'CSV',
    size,
    className: 'btn-csv-download',
  })
  const filename = useFilename(_filename)

  const handleExport = (): void => {
    const exportData = getDataGridData(gridRef.current)
    setData(exportData)
  }

  useEffect(() => {
    if (data.length > 0 && csvLinkRef.current?.link) {
      csvLinkRef.current.link.click()
      setData([])

      // dispatch event to notify completed download
      if (buttonRef.current) {
        const event = new CustomEvent('csv-download-completed')
        buttonRef.current.dispatchEvent(event)
      }
    }
  }, [data])

  if (print) return null

  return (
    <>
      <button
        ref={buttonRef}
        className={className}
        disabled={!isLocked || disabled}
        onClick={handleExport}
        type="button"
      >
        <Icon className="icon-sub icon-white" name="hit-down" />
        CSV
      </button>
      <CSVLink ref={csvLinkRef} data={data} filename={filename} style={{ display: 'none' }} target="_blank" />
    </>
  )
}

export default ButtonGridExport
