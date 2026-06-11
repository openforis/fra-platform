import React from 'react'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import TextArea from 'client/components/Inputs/TextArea'

const Comments: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, onChange } = props

  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) =>
    onChange(dataSource, 'comments', event.target.value)

  return <TextArea disabled={disabled} onChange={_onChange} value={dataSource.comments} />
}

export default Comments
