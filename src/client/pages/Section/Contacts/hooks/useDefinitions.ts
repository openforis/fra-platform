import { useMemo } from 'react'

import { ContactField, contactFields } from 'meta/cycleData'
import { NodeExtCellType } from 'meta/nodeExt'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useOptionsAppellation } from 'client/hooks/useOptionsAppellation'
import { NodeExtCell, NodeExtCellSelect } from 'client/components/TableNodeExt/types'
import { Columns, Fields } from 'client/pages/Section/Contacts/types'

import { useOptionsContributions } from './useOptionsContributions'
import { useOptionsRole } from './useOptionsRole'

export const useColumns = (): Columns => {
  const optionsContributions = useOptionsContributions()
  const optionsRole = useOptionsRole()
  const optionsAppellation = useOptionsAppellation()

  return useMemo<Columns>(() => {
    const appellation: NodeExtCellSelect = {
      props: { header: { label: { key: 'editUser.title' } }, options: optionsAppellation },
      type: NodeExtCellType.select,
    }
    const name: NodeExtCell<NodeExtCellType.text> = {
      props: { header: { label: { key: 'editUser.name' } } },
      type: NodeExtCellType.text,
    }
    const surname: NodeExtCell<NodeExtCellType.text> = {
      props: { header: { label: { key: 'editUser.surname' } } },
      type: NodeExtCellType.text,
    }
    const role: NodeExtCellSelect = {
      props: { header: { label: { key: 'editUser.role' } }, options: optionsRole },
      type: NodeExtCellType.select,
    }
    const institution: NodeExtCell<NodeExtCellType.link> = {
      props: { header: { label: { key: 'editUser.organization' } } },
      type: NodeExtCellType.link,
    }
    const contributions: NodeExtCellSelect = {
      props: { header: { label: { key: 'editUser.contributions' } }, options: optionsContributions },
      type: NodeExtCellType.multiselect,
    }

    return {
      [ContactField.appellation]: appellation,
      [ContactField.name]: name,
      [ContactField.surname]: surname,
      [ContactField.role]: role,
      [ContactField.institution]: institution,
      [ContactField.contributions]: contributions,
    }
  }, [optionsAppellation, optionsContributions, optionsRole])
}

export const useFields = (): Fields => {
  const { print } = useIsPrintRoute()

  return useMemo<Fields>(() => {
    return contactFields.map((field) => ({
      field,
      hidden: print && [ContactField.appellation, ContactField.surname].includes(field),
    }))
  }, [print])
}
