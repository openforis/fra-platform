import './YearForDataSource.scss'
import React from 'react'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import MultiSelect from 'client/components/Inputs/MultiSelect'

import { useYearOptions } from './hooks/useYearOptions'

const YearForDataSource: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, onChange: _onChange } = props

  const { onChange, onCreateOption, options, values } = useYearOptions({ dataSource, onChange: _onChange })

  return (
    <MultiSelect
      classNames={{ container: 'year-for-data-source' }}
      createOptionLabelKey="common.add"
      createOptionPosition="first"
      disabled={disabled}
      isCreatable
      onChange={onChange}
      onCreateOption={onCreateOption}
      options={options}
      value={values}
    />
  )
}

export default YearForDataSource
