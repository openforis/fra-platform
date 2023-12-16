import { useMemo } from 'react'

import { Label } from 'meta/assessment'
import { ColumnNodeExtType } from 'meta/nodeExt'
import { RoleName, Users, UserTitle } from 'meta/user'

import { Option } from 'client/components/Inputs/Select'
import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]
const appellations = Object.values(UserTitle)

type Options = Array<{
  label: Label
  value: Option['value']
}>

export const useColumns = (): Array<ColumnNodeExt> => {
  const optionsRole = useMemo<Options>(() => {
    return allowedRoles.map((role) => {
      const label = { key: Users.getI18nRoleLabelKey(role) }
      const value = role
      return { label, value }
    })
  }, [])

  const optionsAppellation = useMemo<Options>(() => {
    return appellations.map((appellation) => {
      const label = { key: `editUser.${appellation}` }
      const value = appellation
      return { label, value }
    })
  }, [])

  return useMemo<Array<ColumnNodeExt>>(
    () => [
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
    ],
    [optionsAppellation, optionsRole]
  )
}
