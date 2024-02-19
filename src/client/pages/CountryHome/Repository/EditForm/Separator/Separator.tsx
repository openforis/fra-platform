import './Separator.scss'
import React from 'react'

import { DataCell } from 'client/components/DataGrid'

const Separator = () => {
  return (
    <DataCell className="repository-form__separator" noBorder>
      <hr className="repository-form__separator-line" />
      <span className="repository-form__separator-text">or</span>
      <hr className="repository-form__separator-line" />
    </DataCell>
  )
}

export default Separator
