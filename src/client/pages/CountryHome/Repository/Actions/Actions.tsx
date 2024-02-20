import './Actions.scss'
import React from 'react'

import { RepositoryItem, RepositoryItems } from 'meta/cycleData'
import { Users } from 'meta/user'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useUser } from 'client/store/user'
import ButtonEdit from 'client/components/Buttons/ButtonEdit'
import { useOpenPanel } from 'client/pages/CountryHome/Repository/hooks/useOpenPanel'

type Props = {
  repositoryItem: RepositoryItem
}

const Actions: React.FC<Props> = (props) => {
  const { repositoryItem } = props
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)
  const openPanel = useOpenPanel({ repositoryItem })
  const locked = useIsDataLocked()

  const isGlobalRepositoryItem = RepositoryItems.isGlobal({ repositoryItem })

  if (locked || (isGlobalRepositoryItem && !isAdmin)) {
    return null
  }

  return (
    <div className="repository-actions">
      <ButtonEdit onClick={openPanel} />
    </div>
  )
}

export default Actions
