import React, { useMemo } from 'react'

import { Contact, ContactField } from 'meta/cycleData'
import { Topics } from 'meta/messageCenter'

import { DataRowActions } from 'client/components/DataGrid'

import { useDeleteContact } from './useDeleteContact'

type Props = {
  canEdit: boolean
  contact: Contact
}

type Returned = DataRowActions | undefined

export const useRowActions = (props: Props): Returned => {
  const { canEdit, contact } = props

  const deleteContact = useDeleteContact({ contact })

  return useMemo<Returned>(() => {
    const { readOnly } = contact.props

    if (canEdit) {
      return {
        delete: {
          onDelete: deleteContact,
          placeholder: readOnly ? <div /> : undefined,
        },
        review: {
          placeholder: readOnly ? <div /> : undefined,
          title: `${contact[ContactField.name].value.raw} ${contact[ContactField.surname].value.raw}`,
          topicKey: Topics.getContactKey(contact),
        },
      }
    }

    return undefined
  }, [canEdit, contact, deleteContact])
}
