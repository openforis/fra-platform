import './Actions.scss'
import React from 'react'

import { RepositoryItem, RepositoryItems } from 'meta/cycleData'

import { useIsCountryRepositoryEditable, useIsGlobalRepositoryEditable } from 'client/store/user'
import ButtonEdit from 'client/components/Buttons/ButtonEdit'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

type Props = {
  repositoryItem: RepositoryItem
}

const Actions: React.FC<Props> = (props) => {
  const { repositoryItem } = props
  const openPanel = useOpenPanel({ repositoryItem })

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem })
  const isCountryRepositoryEditable = useIsCountryRepositoryEditable()
  const isGlobalRepositoryEditable = useIsGlobalRepositoryEditable()

  if (!isCountryRepositoryEditable || (isGlobalRepositoryItem && !isGlobalRepositoryEditable)) {
    return null
  }

  return (
    <div className="repository-actions">
      <ButtonEdit onClick={openPanel} />
    </div>
  )
}

export default Actions
