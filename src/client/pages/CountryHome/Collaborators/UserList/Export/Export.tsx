import React from 'react'
import { CSVLink } from 'react-csv'

import Icon from 'client/components/Icon'

import { useData } from './hooks/useData'
import { useHeaders } from './hooks/useHeaders'

const FILENAME = 'FRA-Users.csv'

const Export: React.FC = () => {
  const csvHeaders = useHeaders()
  const data = useData()

  return (
    <CSVLink
      className="btn-s btn-primary btn-export"
      data={data}
      filename={FILENAME}
      headers={csvHeaders}
      target="_blank"
    >
      <Icon className="icon-sub icon-white" name="hit-down" /> CSV
    </CSVLink>
  )
}

export default Export
