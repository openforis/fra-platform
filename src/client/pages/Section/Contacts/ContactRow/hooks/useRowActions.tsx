import React, { useMemo } from 'react'

import { Contact, ContactField } from 'meta/cycleData'
import { Topics } from 'meta/messageCenter'
import { Users } from 'meta/user'

import { useUser } from 'client/store/user'
import { DataRowActions } from 'client/components/DataGrid'

import { useDeleteContact } from './useDeleteContact'

type Props = {
  canEdit: boolean
  contact: Contact
}

type Returned = DataRowActions | undefined

export const useRowActions = (props: Props): Returned => {
  const { canEdit, contact } = props
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)

  const deleteContact = useDeleteContact({ contact })

  return useMemo<Returned>(() => {
    const { readOnly } = contact.props

    if (canEdit) {
      const actions: DataRowActions = {
        userLink: {
          placeholder: isAdmin && contact.props.userId ? undefined : <div />,
          userId: contact.props.userId,
        },
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

      return actions
    }

    return undefined
  }, [canEdit, contact, deleteContact, isAdmin])
}
