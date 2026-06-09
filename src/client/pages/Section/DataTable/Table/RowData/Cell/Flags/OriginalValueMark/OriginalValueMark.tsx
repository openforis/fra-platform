import './OriginalValueMark.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'

import Flag from '../Flag'

const OriginalValueMark: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flag tooltip={{ content: t('common.tooltip.originalValueEntered') }}>
      <div className="table-grid__data-cell-flag-original-value">
        <Icon name="circle" />
      </div>
    </Flag>
  )
}

export default OriginalValueMark
