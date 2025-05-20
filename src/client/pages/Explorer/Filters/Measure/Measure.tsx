import './Measure.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycle } from 'client/store/assessment'
import { useSection } from 'client/store/metadata'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import useOpenDefinition from 'client/components/DefinitionLink/hooks/useOpenDefinition'
import Icon from 'client/components/Icon'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'

const Measure: React.FC = () => {
  const { t } = useTranslation()

  const { sectionName } = useSectionRouteParams()
  const cycle = useCycle()
  const subSection = useSection(sectionName)
  const anchor = subSection?.props.anchors[cycle.uuid]
  const document = 'tad'
  const openDefinition = useOpenDefinition({ anchor, document })

  const handleChange = (value: Array<string>) => {
    return value
  }

  return (
    <div className="measure-filter-container">
      <MultiSelect onChange={handleChange} options={[]} placeholder={t('common.variable')} />
      <button className="btn-definitions-info" onClick={openDefinition} type="button">
        <Icon name="round-e-info" />
      </button>
    </div>
  )
}

export default Measure
