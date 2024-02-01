import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { useIsRepositoryLoading, useRepositoryItem } from 'client/store/ui/repository/hooks'
import { useClosePanel } from 'client/pages/CountryHome/Repository/hooks/useClosePanel'
import { useUpsertRepositoryItem } from 'client/pages/CountryHome/Repository/Panel/Actions/hooks/useActions'

const Actions: React.FC = () => {
  const { t } = useTranslation()
  const repositoryItem = useRepositoryItem()

  const upsertRepositoryItem = useUpsertRepositoryItem()

  const closePanel = useClosePanel()
  const disabled = useIsRepositoryLoading()

  if (!repositoryItem) return null
  const showDelete = !Objects.isEmpty(repositoryItem.uuid)

  return (
    <div className="repository-form__actions">
      <button
        disabled={disabled}
        onClick={upsertRepositoryItem}
        className={classNames('btn btn-primary', { disabled })}
        type="button"
      >
        {t('common.done')}
      </button>
      {showDelete && (
        <button className="btn btn-destructive" type="button">
          {t('common.delete')}
        </button>
      )}
      <button className="btn btn-secondary" type="button" onClick={closePanel}>
        {t('common.cancel')}
      </button>
    </div>
  )
}

export default Actions
