import React from 'react'

import { RepositoryItems } from 'meta/cycleData/repository'

import { useRepositoryItem } from 'client/store/ui/repository'

const Errors: React.FC = () => {
  const repositoryItem = useRepositoryItem()
  const validation = RepositoryItems.validate(repositoryItem)

  const errors = Array.from(new Set(Object.values(validation || {})))

  return (
    <div>
      {errors.map((error, index) => (
        <div key={String(index) + error}>{error}</div>
      ))}
    </div>
  )
}

export default Errors
