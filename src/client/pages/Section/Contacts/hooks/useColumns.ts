import { useMemo } from 'react'

import { ContactField } from 'meta/cycleData/contact'
import { ColumnNodeExtType } from 'meta/nodeExt'

import { ColumnNodeExt } from 'client/components/TableNodeExt'

import { useOptionsAppellation } from './useOptionsAppellation'
import { useOptionsContributions } from './useOptionsContributions'
import { useOptionsRole } from './useOptionsRole'

type Returned = {
  columns: Record<ContactField, ColumnNodeExt>
  fields: Array<ContactField>
}

export const useColumns = (): Returned => {
  const optionsContributions = useOptionsContributions()
  const optionsRole = useOptionsRole()
  const optionsAppellation = useOptionsAppellation()

  return useMemo<Returned>(() => {
    const appellation: ColumnNodeExt = {
      props: { header: { label: { key: 'editUser.title' } }, options: optionsAppellation },
      type: ColumnNodeExtType.select,
    }
    const name: ColumnNodeExt = {
      props: { header: { label: { key: 'editUser.name' } } },
      type: ColumnNodeExtType.text,
    }
    const surname: ColumnNodeExt = {
      props: { header: { label: { key: 'editUser.surname' } } },
      type: ColumnNodeExtType.text,
    }
    const role: ColumnNodeExt = {
      props: { header: { label: { key: 'editUser.role' } }, options: optionsRole },
      type: ColumnNodeExtType.select,
    }
    const institution: ColumnNodeExt = {
      props: { header: { label: { key: 'editUser.institution' } } },
      type: ColumnNodeExtType.text,
    }
    const contributions: ColumnNodeExt = {
      props: { header: { label: { key: 'editUser.contributions' } }, options: optionsContributions },
      type: ColumnNodeExtType.multiselect,
    }

    const columns: Returned['columns'] = {
      [ContactField.appellation]: appellation,
      [ContactField.name]: name,
      [ContactField.surname]: surname,
      [ContactField.role]: role,
      [ContactField.institution]: institution,
      [ContactField.contributions]: contributions,
    }

    const fields: Returned['fields'] = [
      ContactField.appellation,
      ContactField.name,
      ContactField.surname,
      ContactField.role,
      ContactField.institution,
      ContactField.contributions,
    ]

    return { columns, fields }
  }, [optionsAppellation, optionsContributions, optionsRole])
}
