import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Col as TypeCol, Cols, Row as TypeRow, RowType, Table } from '@meta/assessment'
import { RecordAssessmentData } from '@meta/data'

import { useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useOriginalDataPointYears } from '@client/store/data'
import { useShowOriginalDatapoints } from '@client/store/ui/assessmentSection'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import Tooltip from '@client/components/Tooltip'
import { getODPColSpan } from '@client/pages/AssessmentSection/DataTable/Table/utils/getODPColSpan'

type Props = {
  headers: string[]
  table: Table
  assessmentName: string
  data: RecordAssessmentData
}

const TableHead: React.FC<Props> = (props) => {
  const { headers, table, assessmentName, data } = props

  const { t } = useTranslation()
  const { print } = useIsPrint()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const country = useAssessmentCountry()
  const odpYears = useOriginalDataPointYears()

  const showODP = useShowOriginalDatapoints()

  const { odp } = table.props
  const rowsHeader = table.rows.filter((row) => row.props.type === RowType.header)

  return (
    <thead>
      {rowsHeader.map((row: TypeRow, rowIndex: number) => (
        <tr key={row.uuid}>
          {row.cols.map((col: TypeCol, colIndex: number) => {
            const { index } = col.props
            const { colSpan, rowSpan } = Cols.getStyle({ cycle, col })
            const columnName = headers[colIndex]

            let isOdpHeader = showODP && table.props.odp && !col.props.labels && odpYears?.includes(columnName)

            if (table.props.name === 'forestCharacteristics')
              isOdpHeader = isOdpHeader && country.props.forestCharacteristics.useOriginalDataPoint

            const getColumnName = () => {
              const label = isOdpHeader ? columnName : Cols.getLabel({ cycle, col, t })

              if (isOdpHeader && !print) {
                return (
                  <Tooltip text={t('nationalDataPoint.clickOnNDP')}>
                    <Link
                      className="link"
                      to={ClientRoutes.Assessment.Cycle.Country.OriginalDataPoint.Section.getLink({
                        countryIso,
                        assessmentName,
                        cycleName: cycle.name,
                        year: columnName,
                        sectionName: table.props.name,
                      })}
                    >
                      {label}
                    </Link>
                  </Tooltip>
                )
              }

              return label
            }

            const headerLeft = (index === 0 && rowIndex === 0) || row.props?.readonly
            let className = `fra-table__header-cell${headerLeft ? '-left' : ''}`
            if (isOdpHeader && !print && rowIndex > 0) className = 'odp-header-cell'

            return (
              <th
                key={col.uuid}
                className={className}
                colSpan={
                  odp && !colSpan
                    ? getODPColSpan({ assessmentName, cycleName: cycle.name, headers, table, data })
                    : colSpan
                }
                rowSpan={rowSpan}
              >
                {getColumnName()}
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}

export default TableHead
