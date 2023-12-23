import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Contact, ContactField, Contacts } from 'meta/cycleData'

import { useContacts } from 'client/store/data'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'

type Props = {
  canEdit: boolean
}

type Returned = Array<Contact>

export const useContactsData = (props: Props): Returned => {
  const { canEdit } = props

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const contacts = useContacts({ canEdit })

  return useMemo<Returned>(() => {
    // in print view -> merges name with `appellation name surname`
    if (print) {
      return contacts.map((contact) => {
        const appellation = Contacts.getFieldValue({ contact, field: ContactField.appellation })
        const title = Objects.isEmpty(appellation) ? '' : t(`editUser.${appellation}`)
        const name = Contacts.getFieldValue({ contact, field: ContactField.name })
        const surname = Contacts.getFieldValue({ contact, field: ContactField.surname })

        return {
          ...contact,
          [ContactField.name]: {
            ...contact[ContactField.name],
            value: { raw: `${title} ${name} ${surname}` },
          },
        }
      })
    }

    return contacts
  }, [contacts, print, t])
}
