import { useMemo } from 'react'

import { ColumnNodeExtType } from 'meta/nodeExt'

import { ColumnNodeExt } from 'client/components/TableNodeExt/types'

import { useOptionsAppellation } from './useOptionsAppellation'
import { useOptionsContributions } from './useOptionsContributions'
import { useOptionsRole } from './useOptionsRole'

export const useColumns = (): Array<ColumnNodeExt> => {
  const optionsContributions = useOptionsContributions()
  const optionsRole = useOptionsRole()
  const optionsAppellation = useOptionsAppellation()

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
        props: {
          colName: 'contributions',
          header: { label: { key: 'editUser.contributions' } },
          options: optionsContributions,
        },
      },
    ],
    [optionsAppellation, optionsContributions, optionsRole]
  )
}
