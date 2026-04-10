import './EditForm.scss'
import React from 'react'

import { Objects } from 'utils/objects'

import { useRepositoryItem } from 'client/store/repository/hooks/repository'
import SlidingPanel from 'client/components/SlidingPanel'

import { useClosePanel } from '../hooks/useClosePanel'
import RepositoryItemForm from './RepositoryItemForm'

const EditForm: React.FC = () => {
  const repositoryItem = useRepositoryItem()
  const closePanel = useClosePanel()

  const opened = !Objects.isEmpty(repositoryItem)

  return (
    <SlidingPanel closePanel={closePanel} opened={opened} size={45}>
      <RepositoryItemForm />
    </SlidingPanel>
  )
}

export default EditForm
