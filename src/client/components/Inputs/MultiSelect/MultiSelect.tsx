import './MultiSelect.scss'
import React from 'react'

import classNames from 'classnames'

import Select, { SelectProps } from 'client/components/Inputs/Select'

type Props = Omit<SelectProps, 'isMulti'>

const MultiSelect: React.FC<Props> = (props: Props) => {
  const { classNames: classes, value } = props

  return (
    <Select
      classNames={{
        container: classNames(
          'multiselect__container',
          {
            active: value?.length > 0,
          },
          classes?.container
        ),
      }}
      isMulti
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default MultiSelect
