import React, { useCallback } from 'react'

import { DataSource } from '@meta/assessment'
import { DataSourceDescription } from '@meta/assessment/description/nationalDataDataSourceDescription'

import { useTableSections } from '@client/store/ui/assessmentSection'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import Icon from '@client/components/Icon'
import ReviewIndicator from '@client/components/ReviewIndicator'
import ColumnComments from '@client/pages/AssessmentSection/Descriptions/CommentableDescription/Description/DataSources/DataSourceColumn/ColumnComments'
import ColumnReference from '@client/pages/AssessmentSection/Descriptions/CommentableDescription/Description/DataSources/DataSourceColumn/ColumnReference'
import ColumnTypeOfDataSource from '@client/pages/AssessmentSection/Descriptions/CommentableDescription/Description/DataSources/DataSourceColumn/ColumnTypeOfDataSource'
import ColumnVariables from '@client/pages/AssessmentSection/Descriptions/CommentableDescription/Description/DataSources/DataSourceColumn/ColumnVariables'
import ColumnYearForDataSource from '@client/pages/AssessmentSection/Descriptions/CommentableDescription/Description/DataSources/DataSourceColumn/ColumnYearForDataSource'

type Props = {
  dataSourceValue: DataSource
  dataSourceMetadata: DataSourceDescription
  disabled: boolean
  // dataSource: DataSource
  // sectionName: string
  placeholder: boolean
  // descriptionDataSource: NationalDataDataSourceDescription
  onChange: (dataSource: DataSource) => void
  onDelete: () => void
}

const DataSourceRow: React.FC<Props> = (props: Props) => {
  const { dataSourceValue, dataSourceMetadata, disabled, onChange, onDelete, placeholder } = props
  const isDataLocked = useIsDataLocked()

  const _onChange = useCallback(
    (field: string, value: string | Record<string, string>) => {
      if (dataSourceValue[field as keyof DataSource] === value) return
      onChange({
        ...dataSourceValue,
        [field]: value,
      })
    },
    [dataSourceValue, onChange]
  )

  /* TODO: is this needed? */

  const titleVariable = (dataSourceValue as any).variables.join(', ')
  const title = `${titleVariable} | ${dataSourceValue.year}`

  const tableSections = useTableSections({ sectionName: 'forestAreaChange' })

  // Remove relation to table
  const table = tableSections?.[0]?.tables?.[0]
  if (!table) return null

  /**/

  return (
    <>
      <div className="data-source__relative-cell">
        {!placeholder && !disabled && (
          <button type="button" onClick={onDelete} className="data-source__delete-button">
            <Icon className="delete" name="trash-simple" />
          </button>
        )}
      </div>

      <ColumnReference
        dataSourceValue={dataSourceValue}
        onChange={_onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      <ColumnTypeOfDataSource
        dataSourceMetadata={dataSourceMetadata}
        dataSourceValue={dataSourceValue}
        onChange={_onChange}
        disabled={disabled}
      />
      <ColumnVariables
        dataSourceValue={dataSourceValue}
        dataSourceMetadata={dataSourceMetadata}
        onChange={_onChange}
        disabled={disabled}
      />
      <ColumnYearForDataSource disabled={disabled} dataSourceValue={dataSourceValue} onChange={_onChange} />
      <ColumnComments disabled={disabled} dataSourceValue={dataSourceValue} onChange={_onChange} />

      <div className="data-source__relative-cell">
        {!isDataLocked && dataSourceValue.uuid && <ReviewIndicator title={title} topicKey={dataSourceValue.uuid} />}
      </div>
    </>
  )

  // const { disabled, dataSource, descriptionDataSource, sectionName, placeholder, onChange, onDelete } = props
  // const isDataLocked = useIsDataLocked()
  // const tableSections = useTableSections({ sectionName })
  //
  // const table = tableSections?.[0]?.tables?.[0]
  // if (!table) return null
  //
  // const titleVariable = dataSource.fraVariables ? dataSource.fraVariables.join(', ') : dataSource.variable
  // const title = `${titleVariable} | ${dataSource.year}`
  // return (
  //   <>
  //     <div className="data-source__relative-cell">
  //       {!placeholder && !disabled && (
  //         <button type="button" onClick={onDelete} className="data-source__delete-button">
  //           <Icon className="delete" name="trash-simple" />
  //         </button>
  //       )}
  //     </div>
  //
  //     {descriptionDataSource.table.columns.map((column) => (
  //       <DataSourceColumn
  //         key={column}
  //         dataSource={dataSource}
  //         table={table}
  //         onChange={onChange}
  //         column={column}
  //         disabled={disabled}
  //         placeholder={placeholder}
  //         dataSourceVariables={descriptionDataSource?.table?.dataSourceVariables}
  //       />
  //     ))}
  //
  //     <div className="data-source__relative-cell">
  //       {!isDataLocked && dataSource.uuid && <ReviewIndicator title={title} topicKey={dataSource.uuid} />}
  //     </div>
  //   </>
  // )
}

export default DataSourceRow
