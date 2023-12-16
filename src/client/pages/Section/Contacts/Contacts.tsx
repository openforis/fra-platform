import React, { useMemo } from 'react'

import { useContacts } from 'client/store/data'
import TableNodeExt from 'client/components/TableNodeExt'

import { useColumns } from './hooks/useColumns'
import { useGetContacts } from './hooks/useGetContacts'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  disabled: boolean
}

const Contacts: React.FC<Props> = (props: Props) => {
  const { disabled } = props

  useGetContacts()
  const contacts = useContacts()

  const onChange = useOnChange()
  const columns = useColumns()
  const gridTemplateColumns = useMemo(() => `12ch repeat(${columns.length - 1}, 1fr)`, [columns.length])

  return (
    <TableNodeExt
      columns={columns}
      data={contacts}
      disabled={disabled}
      gridTemplateColumns={gridTemplateColumns}
      onChange={onChange}
    />
  )
}

export default Contacts
