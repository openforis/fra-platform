import './Repository.scss'
import React, { useCallback } from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useAppDispatch } from 'client/store/hooks'
import { RepositoryActions } from 'client/store/repository/actions'
import { useRepositoryItemChangeListener } from 'client/store/repository/hooks/useRepositoryItemChangeListener'
import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import Hr from 'client/components/Hr'
import RepositoryList from 'client/components/RepositoryList'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'

const Repository: React.FC = () => {
  const isPanEuropean = useIsPanEuropeanRoute()
  const dispatch = useAppDispatch()

  useRepositoryItemChangeListener()

  // TODO: replace with page-level context to remove dependency on repository Redux slice
  const onOpenPanel = useCallback(
    (item: Partial<RepositoryItemTree>) => dispatch(RepositoryActions.setRepositoryItem(item)),
    [dispatch]
  )

  return (
    <div className="repository">
      {!isPanEuropean && (
        <>
          <RepositoryList isGlobal onOpenPanel={onOpenPanel} />
          <Hr />
        </>
      )}

      <RepositoryList onOpenPanel={onOpenPanel} />

      <EditForm />
    </div>
  )
}

export default Repository
