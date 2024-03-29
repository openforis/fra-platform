import { useMemo } from 'react'

import { Contact, ContactField } from 'meta/cycleData'
import { Topics } from 'meta/messageCenter'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useIsEditTableDataEnabled, useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { useSectionContext } from 'client/pages/Section/context'

import { useDeleteContact } from './useDeleteContact'

type Props = {
  contact: Contact
}

export type Returned = Array<DataRowAction> | undefined

export const useRowActions = (props: Props): Returned => {
  const { contact } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const user = useUser()
  const deleteContact = useDeleteContact({ contact })
  const { sectionName } = useSectionContext()
  const editEnabled = useIsEditTableDataEnabled(sectionName)
  const isAdmin = Users.isAdministrator(user)

  return useMemo<Returned>(() => {
    const { readOnly } = contact.props
    const actions: Array<DataRowAction> = []

    if (!editEnabled) {
      return actions
    }

    if (isAdmin && contact.props.userId) {
      actions.push({
        type: DataRowActionType.EditLink,
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
        type: DataRowActionType.Delete,
        onClick: deleteContact,
      })

      actions.push({
        type: DataRowActionType.Review,
        title: `${contact[ContactField.name].value.raw} ${contact[ContactField.surname].value.raw}`,
        topicKey: Topics.getContactKey(contact),
      })
    }

    return actions
  }, [assessmentName, contact, countryIso, cycleName, deleteContact, editEnabled, isAdmin])
}
