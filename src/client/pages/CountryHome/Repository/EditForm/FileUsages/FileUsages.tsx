import './FileUsages.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useUsages } from './hooks/useUsages'

const FileUsages: React.FC = () => {
  const { t } = useTranslation()
  const usages = useUsages()

  if (!usages.length) {
    return null
  }

  return (
    <div className="repository-form__usages">
      {t('validation.repositoryItem.optionsDisabled')}
      {usages.map((usage, index) => {
        return (
          <div key={`usage_${String(index)}`} className="repository-form__usage">
            {usage.section} ({usage.locations.join(', ')})
          </div>
        )
      })}
    </div>
  )
}

export default FileUsages
