import './YearForDataSource.scss'
import React, { useState } from 'react'

import { DataSource } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import MultiSelect from 'client/components/Inputs/MultiSelect'
import { Option } from 'client/components/Inputs/Select'

import { useOnChange } from '../hook/useOnChange'
import { useCreateOption } from './hooks/useCreateOption'
import { useInitialOptions } from './hooks/useInitialOptions'

type Props = {
  dataSource: DataSource
  disabled: boolean
  sectionName: SectionName
}

const YearForDataSource: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, sectionName } = props

  const initialOptions = useInitialOptions({ dataSource })

  const [options, setOptions] = useState<Array<Option>>(initialOptions)
  const [values, setValues] = useState<Array<string>>(dataSource.year)

  const onChange = useOnChange({ sectionName, dataSource })
  const onCreateOption = useCreateOption({ options, setOptions, values, setValues })

  return (
    <MultiSelect
      classNames={{ container: 'year-for-data-source' }}
      createOptionLabelKey="common.add"
      createOptionPosition="first"
      disabled={disabled}
      isCreatable
      onBlur={() => onChange('year', values)}
      onChange={(values: Array<string>) => setValues(values)}
      onCreateOption={onCreateOption}
      options={options}
      value={values}
    />
  )
}

export default YearForDataSource
