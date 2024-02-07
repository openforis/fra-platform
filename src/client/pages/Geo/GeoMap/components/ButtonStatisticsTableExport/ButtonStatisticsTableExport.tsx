import './ButtonStatisticsTableExport.scss'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'

import Icon from 'client/components/Icon'

import { CustomCsvDownload } from './types'
import * as Utils from './utils'

type Props = {
  customCsvDownload?: CustomCsvDownload
  tableRef: MutableRefObject<HTMLTableElement>
  filename?: string
}

const ButtonTableExport: React.FC<Props> = (props) => {
  const { tableRef, filename, customCsvDownload } = props
  const csvLink = useRef(null)
  const [tableData, setTableData] = useState('')

  useEffect(() => {
    setTableData(Utils.getData(tableRef.current))
  }, [tableRef])

  const exportTableToCSV = () => {
    csvLink.current.link.click()
  }

  return (
    <div>
      <button onClick={exportTableToCSV} type="button" className="btn btn-primary geo-map-menu-statistics-btn-download">
        <span>Download</span>
        <span>&nbsp;</span>
        <Icon className="icon-sub icon-white" name="hit-down" />
      </button>
      {customCsvDownload !== undefined ? (
        <CSVLink
          className="hidden"
          ref={csvLink}
          target="_blank"
          filename={filename}
          data={customCsvDownload.data}
          headers={customCsvDownload.headers}
        />
      ) : (
        <CSVLink className="hidden" ref={csvLink} target="_blank" filename={`${filename}.csv`} data={tableData} />
      )}
    </div>
  )
}

ButtonTableExport.defaultProps = {
  filename: 'tableData',
  customCsvDownload: undefined,
}

export default ButtonTableExport
