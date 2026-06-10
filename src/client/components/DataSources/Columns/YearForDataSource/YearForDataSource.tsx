import './YearForDataSource.scss'
import React from 'react'

import { DataSource } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import MultiSelect from 'client/components/Inputs/MultiSelect'

import { useYearOptions } from './hooks/useYearOptions'

type Props = {
  dataSource: DataSource
  disabled: boolean
  sectionName: SectionName
}

const YearForDataSource: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, sectionName } = props

  const { onChange, onCreateOption, options, values } = useYearOptions({ dataSource, sectionName })

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
