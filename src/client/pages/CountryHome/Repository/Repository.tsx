import './Repository.scss'
import React from 'react'

import { useRepositoryItemChangeListener } from 'client/store/repository/hooks/useRepositoryItemChangeListener'

import EditForm from './EditForm'
import GlobalRepository from './GlobalRepository'

const CountryRepository = (): Element => <div />

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
