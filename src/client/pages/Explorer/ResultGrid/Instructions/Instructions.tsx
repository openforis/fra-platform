import './Instructions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Flex from 'client/components/Layout/Flex'

const Instructions: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex alignItems="start" className="explorer-result-grid__instructions" flexDirection="column" gap="4">
      <p>{t('explorer.selectDataInstruction')}</p>
      <p>{t('explorer.downloadWholeDatasetInstruction')}</p>
    </Flex>
  )
}

export default Instructions
