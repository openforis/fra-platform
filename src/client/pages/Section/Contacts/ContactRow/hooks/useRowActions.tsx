import { useMemo } from 'react'

import { Contact, ContactField } from 'meta/cycleData'
import { Topics } from 'meta/messageCenter'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { Action } from 'client/components/DataGrid/DataRow/types'

import { useDeleteContact } from './useDeleteContact'

type Props = {
  canEdit: boolean
  contact: Contact
}

export type Returned = Array<Action> | undefined

export const useRowActions = (props: Props): Returned => {
  const { canEdit, contact } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)

  const deleteContact = useDeleteContact({ contact })

  return useMemo<Returned>(() => {
    const { readOnly } = contact.props
    const actions: Array<Action> = []

    if (!canEdit) {
      return actions
    }

    if (isAdmin && contact.props.userId) {
      actions.push({
        type: 'editLink',
        url: Routes.CountryUser.generatePath({
          assessmentName,
          cycleName,
          countryIso,
          id: contact.props.userId,
        }),
      })
    }

    if (!readOnly) {
      actions.push({
        type: 'delete',
        onDelete: deleteContact,
      })

      actions.push({
        type: 'review',
        title: `${contact[ContactField.name].value.raw} ${contact[ContactField.surname].value.raw}`,
        topicKey: Topics.getContactKey(contact),
      })
    }

    return actions
  }, [assessmentName, canEdit, contact, countryIso, cycleName, deleteContact, isAdmin])
}
