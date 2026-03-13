import './Instructions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment/labels'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Flex from 'client/components/Layout/Flex'

const Instructions: React.FC = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const { sectionName } = useSectionRouteParams()
  const subSection = useSection(sectionName)
  const sectionLabel = Labels.getCycleLabel({ cycle, labels: subSection?.props.labels ?? {}, t })

  return (
    <Flex alignItems="start" className="explorer-result-grid__instructions" flexDirection="column" gap="4">
      <div>{t('explorer.selectDataInstruction', { sectionLabel })}</div>
      <div>{t('explorer.downloadWholeDatasetInstruction')}</div>
    </Flex>
  )
}

export default Instructions
