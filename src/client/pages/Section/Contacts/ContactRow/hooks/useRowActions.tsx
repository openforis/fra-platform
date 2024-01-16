import React, { useMemo } from 'react'

import { Contact, ContactField } from 'meta/cycleData'
import { Topics } from 'meta/messageCenter'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataRowActions } from 'client/components/DataGrid'

import { useDeleteContact } from './useDeleteContact'

type Props = {
  canEdit: boolean
  contact: Contact
}

type Returned = DataRowActions | undefined

export const useRowActions = (props: Props): Returned => {
  const { canEdit, contact } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)

  const deleteContact = useDeleteContact({ contact })

  return useMemo<Returned>(() => {
    const { readOnly } = contact.props

    if (canEdit) {
      const actions: DataRowActions = {
        editLink: {
          placeholder: isAdmin && contact.props.userId ? undefined : <div />,
          url: contact.props.userId
            ? Routes.CountryUser.generatePath({
                assessmentName,
                cycleName,
                countryIso,
                id: contact.props.userId,
              })
            : '',
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
  }, [assessmentName, canEdit, contact, countryIso, cycleName, deleteContact, isAdmin])
}
