import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItem } from 'meta/cycleData'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

type Props = {
  repositoryItem: RepositoryItem
}

const Actions: React.FC<Props> = (props) => {
  const { repositoryItem } = props

  const { t } = useTranslation()
  const openPanel = useOpenPanel({ repositoryItem })

  return (
    <div className="repository-actions">
      <Button iconName="pencil" inverse label={t('description.edit')} onClick={openPanel} size={ButtonSize.xs} />
    </div>
  )
}

export default Actions
