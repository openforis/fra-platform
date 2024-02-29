import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Contact, ContactField, Contacts } from 'meta/cycleData'
import { RoleName } from 'meta/user'

import { useContacts } from 'client/store/data'
import { useIsEditTableDataEnabled } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useSectionContext } from 'client/pages/Section/context'

type Returned = Array<Contact>

const compareContacts = (contactA: Contact, contactB: Contact): number => {
  const roleA = contactA[ContactField.role].value.raw as RoleName
  const roleB = contactB[ContactField.role].value.raw as RoleName
  if (roleA === roleB) {
    const nameA = `${contactA[ContactField.surname].value.raw} ${contactA[ContactField.name].value.raw}`
    const nameB = `${contactB[ContactField.surname].value.raw} ${contactA[ContactField.name].value.raw}`
    return nameA.localeCompare(nameB)
  }
  if (roleA === RoleName.NATIONAL_CORRESPONDENT) return -1
  if (roleB === RoleName.NATIONAL_CORRESPONDENT) return 1
  if (roleA === RoleName.ALTERNATE_NATIONAL_CORRESPONDENT) return -1
  if (roleB === RoleName.ALTERNATE_NATIONAL_CORRESPONDENT) return 1

  return 0
}

export const useContactsData = (): Returned => {
  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const contacts = useContacts()
  const { sectionName } = useSectionContext()
  const editEnabled = useIsEditTableDataEnabled(sectionName)

  return useMemo<Returned>(() => {
    const contactsReturn = [...contacts]

    if (!editEnabled) {
      contactsReturn.sort(compareContacts)
    }

    // in print view -> merges name with `appellation name surname`
    if (print) {
      return contactsReturn.map((contact) => {
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

    return contactsReturn
  }, [contacts, editEnabled, print, t])
}
