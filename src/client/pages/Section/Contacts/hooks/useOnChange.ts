import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { NodeValue } from 'meta/assessment'
import { Contact, ContactField } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type PropsOnChange = {
  contact: Contact
  field: ContactField
  raw: NodeValue['raw']
}

type Returned = (props: PropsOnChange) => void

export const useOnChange = (): Returned => {
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(
    (props) => {
      const { contact, field, raw } = props

      const upsertProps = { assessmentName, cycleName, countryIso, sectionName, contact, field, raw }
      dispatch(DataActions.upsertContact(upsertProps))
    },
    [assessmentName, countryIso, cycleName, dispatch, sectionName]
  )
}
