import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Contacts from 'client/pages/Section/Contacts'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

const Introduction: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)

  const { deskStudy } = country.props

  return (
    <>
      <CommentableDescription
        name={CommentableDescriptionName.introductoryText}
        template={{ text: t('contactPersons.introductoryTextSupport') }}
        title={t('contactPersons.introductoryText')}
      />
      {!deskStudy && <Contacts />}
    </>
  )
}

export default Introduction
