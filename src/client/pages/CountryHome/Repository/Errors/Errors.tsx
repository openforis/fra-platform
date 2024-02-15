import React from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItemValidator } from 'meta/cycleData'

import { useRepositoryItem } from 'client/store/ui/repository'

const Errors: React.FC = () => {
  const { t } = useTranslation()
  const repositoryItem = useRepositoryItem()
  const validation = RepositoryItemValidator.validate(repositoryItem)

  const errors = Array.from(new Set(Object.values(validation || {})))

  return (
    <div>
      {errors.map((error, index) => (
        <div key={String(index) + error}>{t(error)}</div>
      ))}
    </div>
  )
}

export default Errors
