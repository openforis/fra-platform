import './ButtonBack.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import Icon from 'client/components/Icon'
import { useRepositoryListContext } from 'client/components/RepositoryList/context'

const ButtonBack: React.FC = () => {
  const { folderPath, onNavigate } = useRepositoryListContext()
  const { t } = useTranslation()

  const disabled = Objects.isEmpty(folderPath)

  return (
    <button
      className="repository-button-back"
      data-tooltip-content={disabled ? undefined : t('common.back')}
      data-tooltip-id={disabled ? undefined : TooltipId.info}
      disabled={disabled}
      onClick={() => onNavigate(folderPath.at(-2)?.uuid)}
    >
      <Icon name="small-down" />
    </button>
  )
}

export default ButtonBack
