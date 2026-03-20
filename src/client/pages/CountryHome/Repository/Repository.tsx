import './Repository.scss'
import React from 'react'

import { useRepositoryItemChangeListener } from 'client/store/repository/hooks/useRepositoryItemChangeListener'

import CountryRepository from './CountryRepository'
import EditForm from './EditForm'
import GlobalRepository from './GlobalRepository'

const Repository: React.FC = () => {
  useRepositoryItemChangeListener()

  return (
    <div className="repository">
      <GlobalRepository />
      <CountryRepository />
      <EditForm />
    </div>
  )
}

export default Repository
