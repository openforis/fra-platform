import React from 'react'

import { DataSource, SectionName } from 'meta/assessment'

import TextArea from 'client/components/Inputs/TextArea'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  disabled: boolean
  sectionName: SectionName
}

const Comments: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })
  const _onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => onChange('comments', event.target.value)

  return <TextArea disabled={disabled} onChange={_onChange} value={dataSource.comments} />
}

export default Comments
