import './FileUsages.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { FileUsage } from 'meta/file/meta'

import { useUsages } from 'client/components/RepositoryList/hooks/useUsages'

type Props = {
  usages: Array<FileUsage> | undefined
}

const FileUsages: React.FC<Props> = (props) => {
  const { usages } = props
  const { t } = useTranslation()
  const usageItems = useUsages(usages)

  if (!usageItems.length) return null

  return (
    <div className="repository-form__usages">
      {t('validation.repositoryItem.optionsDisabled')}
      {usageItems.map((usage, index) => (
        <div key={`usage_${String(index)}`} className="repository-form__usage">
          {usage.section} ({usage.locations.join(', ')})
        </div>
      ))}
    </div>
  )
}

export default FileUsages
