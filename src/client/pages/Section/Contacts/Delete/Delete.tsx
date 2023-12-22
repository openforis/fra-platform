import './Delete.scss'
import React from 'react'

import { Contact } from 'meta/cycleData'

import { DataCell } from 'client/components/DataGrid'
import Icon from 'client/components/Icon'

import { useOnClick } from './hooks/useOnClick'

type Props = {
  contact: Contact
}

const Delete: React.FC<Props> = (props: Props) => {
  const { contact } = props
  const onClick = useOnClick(contact)

  if (contact.props.readOnly) return <div />

  return (
    <DataCell className="contacts__grid__cell-delete" review>
      <button className="btn-s btn-link-destructive" onClick={onClick} type="button">
        <Icon className="icon-no-margin" name="trash-simple" />
      </button>
    </DataCell>
  )
}

export default Delete
