import './EditForm.scss'
import React from 'react'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import SlidingPanel from 'client/components/SlidingPanel'

import RepositoryItemForm from './RepositoryItemForm'

type Props = {
  onClose: () => void
  repositoryItem: Partial<RepositoryItem> | undefined
}

const EditForm: React.FC<Props> = (props) => {
  const { onClose, repositoryItem } = props
  const opened = !Objects.isEmpty(repositoryItem)

  return (
    <SlidingPanel closePanel={onClose} opened={opened} size={45}>
      <RepositoryItemForm onClose={onClose} repositoryItem={repositoryItem} />
    </SlidingPanel>
  )
}

export default EditForm
