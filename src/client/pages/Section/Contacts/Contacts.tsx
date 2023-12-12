import React, { useMemo } from 'react'

import { ColumnNodeExtType } from 'meta/nodeExt'
import { RoleName, Users, UserTitle } from 'meta/user'

import { useContacts } from 'client/store/data'
import TableNodeExt from 'client/components/TableNodeExt'
import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

import { useGetContacts } from './hooks/useGetContacts'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  disabled: boolean
}

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]
const appellations = Object.values(UserTitle)

const Contacts: React.FC<Props> = (props: Props) => {
  const { disabled } = props
  useGetContacts()
  const contacts = useContacts()

  const onChange = useOnChange()

  const optionsRole = useMemo(() => {
    return allowedRoles.map((role) => {
      const label = { key: Users.getI18nRoleLabelKey(role) }
      const value = role
      return { label, value }
    })
  }, [])

  const optionsAppellation = useMemo(() => {
    return appellations.map((appellation) => {
      const label = { key: `editUser.${appellation}` }
      const value = appellation
      return { label, value }
    })
  }, [])

  const columns: Array<ColumnNodeExt> = [
    {
      type: ColumnNodeExtType.select,
      props: { colName: 'appellation', header: { label: { key: 'editUser.title' } }, options: optionsAppellation },
    },
    { type: ColumnNodeExtType.text, props: { colName: 'name', header: { label: { key: 'editUser.name' } } } },
    { type: ColumnNodeExtType.text, props: { colName: 'surname', header: { label: { key: 'editUser.surname' } } } },
    {
      type: ColumnNodeExtType.select,
      props: { colName: 'role', header: { label: { key: 'editUser.role' } }, options: optionsRole },
    },
    {
      type: ColumnNodeExtType.text,
      props: { colName: 'institution', header: { label: { key: 'editUser.institution' } } },
    },
    {
      type: ColumnNodeExtType.multiselect,
      props: { colName: 'contributions', header: { label: { key: 'editUser.contributions' } } },
    },
  ]

  const gridTemplateColumns = `12ch repeat(${columns.length - 1}, 1fr)`

  return (
    <>
      <TableNodeExt
        gridTemplateColumns={gridTemplateColumns}
        disabled
        onChange={onChange}
        columns={columns}
        data={contacts.prefilled}
      />
      <TableNodeExt
        gridTemplateColumns={gridTemplateColumns}
        header={false}
        disabled={disabled}
        onChange={onChange}
        columns={columns}
        data={contacts.contacts}
      />
    </>
  )
}

export default Contacts
