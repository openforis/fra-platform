import React, { useState } from 'react'
import { CSVLink } from 'react-csv'

import classNames from 'classnames'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

import { useGetDownloadData } from './hooks/useGetDownloadData'

type Headers = {
  label: string
  key: string
}

type Props = {
  nationalClasses: Array<ODPNationalClass>
  year: number
}

const NationalClassesDownload: React.FC<Props> = (props: Props) => {
  const { nationalClasses, year } = props
  const { cycleName } = useCountryRouteParams()

  const [data, setData] = useState<Array<object>>([])
  const [headers, seHeaders] = useState<Array<Headers>>([])

  const getDownloadData = useGetDownloadData({ nationalClasses })

  return (
    <CSVLink
      asyncOnClick
      className={classNames('fra-table__btn-export', 'btn-xs', 'btn-primary', 'no-print', {
        disabled: year === -1,
      })}
      data={data}
      filename={`FRA${cycleName}-NDP${year}.csv`}
      headers={headers}
      onClick={(_, done) => {
        const { data, headers } = getDownloadData()
        setData(data)
        seHeaders(headers)
        done()
      }}
      target="_blank"
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

export default NationalClassesDownload
