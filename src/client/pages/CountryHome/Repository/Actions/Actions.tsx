import './Actions.scss'
import React from 'react'

import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import ButtonEdit from 'client/components/Buttons/ButtonEdit'

type Props = {
  repositoryItem: RepositoryItem
}

const Actions: React.FC<Props> = (props) => {
  const { repositoryItem } = props
  const dispatch = useAppDispatch()

  return (
    <div className="repository-actions">
      <ButtonEdit
        onClick={() => {
          dispatch(RepositoryActions.setRepositoryItem(repositoryItem))
        }}
      />
    </div>
  )
}

export default Actions
