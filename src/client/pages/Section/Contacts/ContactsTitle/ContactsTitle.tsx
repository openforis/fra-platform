import 'client/pages/Section/Contacts/ContactsTitle/ContactsTitle.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso, CountryProps } from 'meta/area'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { AreaActions, useCountry } from 'client/store/area'
import { useUser } from 'client/store/user'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import Button from 'client/components/Buttons/Button'

const ContactsTitle: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const country = useCountry(countryIso)
  const user = useUser()

  const { hideContactsTable } = country.props

  const onClick = useCallback(() => {
    const countryProp: Partial<CountryProps> = { hideContactsTable: !hideContactsTable }
    dispatch(AreaActions.updateCountryProp({ assessmentName, cycleName, countryIso, sectionName, countryProp }))
  }, [assessmentName, countryIso, cycleName, dispatch, hideContactsTable, sectionName])

  return (
    <div className="contacts__title">
      <h2 className="headline">{t('contactPersons.reportPreparationAndContactPersons')}</h2>

      {Users.isAdministrator(user) && (
        <Button
          className="no-print"
          inverse={!hideContactsTable}
          label={t(hideContactsTable ? `common.show` : `common.hide`)}
          onClick={onClick}
        />
      )}
    </div>
  )
}

export default ContactsTitle
