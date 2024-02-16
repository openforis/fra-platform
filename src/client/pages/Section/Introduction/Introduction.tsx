import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCountry } from 'client/store/area'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Contacts from 'client/pages/Section/Contacts'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  canEditData: boolean
  sectionName: SectionName
}

const Introduction: React.FC<Props> = (props) => {
  const { canEditData, sectionName } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)

  const { deskStudy } = country.props

  return (
    <>
      <CommentableDescription
        sectionName={sectionName}
        title={t('contactPersons.introductoryText')}
        name={CommentableDescriptionName.introductoryText}
        template={{ text: t('contactPersons.introductoryTextSupport') }}
      />
      {!deskStudy && <Contacts canEdit={canEditData} />}
    </>
  )
}

export default Introduction
