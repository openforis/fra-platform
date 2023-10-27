import React, { useMemo } from 'react'

import { RoleName, Users, UserTitles } from 'meta/user'

import { useContacts } from 'client/store/data'
import TableNodeExt from 'client/components/TableNodeExt'
import { ColumnNodeExt, ColumnNodeExtType } from 'client/components/TableNodeExt/types'

import { useGetContacts } from './hooks/useGetContacts'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  disabled: boolean
}

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]
const appellations = Object.values(UserTitles)

const Contacts: React.FC<Props> = (props: Props) => {
  const { disabled } = props
  useGetContacts()
  const contacts = useContacts()

  const onChange = useOnChange()

  const itemsRole = useMemo(() => {
    return allowedRoles.map((role) => {
      const label = Users.getI18nRoleLabelKey(role)
      const value = role
      return { label, value }
    })
  }, [])

  const itemsAppellation = useMemo(() => {
    return appellations.map((appellation) => {
      const label = `editUser.${appellation}`
      const value = appellation
      return { label, value }
    })
  }, [])

  const columns: Array<ColumnNodeExt> = [
    { type: ColumnNodeExtType.select, colName: 'appellation', header: 'editUser.title', items: itemsAppellation },
    { type: ColumnNodeExtType.text, colName: 'name', header: 'editUser.name' },
    { type: ColumnNodeExtType.text, colName: 'surname', header: 'editUser.surname' },
    { type: ColumnNodeExtType.select, colName: 'role', header: 'editUser.role', items: itemsRole },
    { type: ColumnNodeExtType.text, colName: 'institution', header: 'editUser.institution' },
    { type: ColumnNodeExtType.multiselect, colName: 'contributions', header: 'editUser.contributions' },
  ]

  return <TableNodeExt disabled={disabled} onChange={onChange} columns={columns} data={contacts} />
}

export default Contacts
