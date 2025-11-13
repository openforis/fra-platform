import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { NodeValue } from 'meta/assessment/node'
import { Contact } from 'meta/cycleData/contact/contact'
import { ContactField } from 'meta/cycleData/contact/field'

import { ContactsActions } from 'client/store/data/contacts/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

type PropsOnChange = {
  contact: Contact
  field: ContactField
  raw: NodeValue['raw']
}

type Returned = (props: PropsOnChange) => void

export const useOnChange = (): Returned => {
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(
    (props) => {
      const { contact, field, raw } = props

      const upsertProps = { assessmentName, cycleName, countryIso, sectionName, contact, field, raw }
      dispatch(ContactsActions.updateContact(upsertProps))
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName]
  )
}
