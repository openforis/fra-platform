import './FileUsages.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { FileMeta } from 'meta/file/meta'

import { useUsages } from './hooks/useUsages'

type Props = {
  fileMeta: FileMeta | undefined
}

const FileUsages: React.FC<Props> = (props) => {
  const { fileMeta } = props
  const { t } = useTranslation()
  const usages = useUsages(fileMeta)

  if (!usages.length) return null

  return (
    <div className="repository-form__usages">
      {t('validation.repositoryItem.optionsDisabled')}
      {usages.map((usage, index) => (
        <div key={`usage_${String(index)}`} className="repository-form__usage">
          {usage.section} ({usage.locations.join(', ')})
        </div>
      ))}
    </div>
  )
}

export default FileUsages
