import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import Contacts from 'client/pages/Section/Contacts'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  canEditData: boolean
  canEditDescriptions: boolean
  sectionName: SectionName
}

const Introduction: React.FC<Props> = (props) => {
  const { canEditData, canEditDescriptions, sectionName } = props

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()

  return (
    <>
      {print && <Contacts canEdit={canEditData} />}
      <CommentableDescription
        sectionName={sectionName}
        title={t('contactPersons.introductoryText')}
        name={CommentableDescriptionName.introductoryText}
        template={{ text: t('contactPersons.introductoryTextSupport') }}
        disabled={!canEditDescriptions}
      />
      {!print && <Contacts canEdit={canEditData} />}
    </>
  )
}

export default Introduction
