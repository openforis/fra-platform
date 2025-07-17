import './Measure.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { TooltipId } from 'meta/tooltip'

import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import useOpenDefinition from 'client/components/DefinitionLink/hooks/useOpenDefinition'
import Icon from 'client/components/Icon'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'

import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'

const Measure: React.FC = () => {
  const { t } = useTranslation()

  const { sectionName } = useSectionRouteParams()
  const cycle = useCycle()
  const subSection = useSection(sectionName)
  const anchor = subSection?.props.anchors[cycle.uuid]
  const document = 'tad'
  const openDefinition = useOpenDefinition({ anchor, document })

  const options = useOptions()
  const explorerMeasures = useExplorerMeasures()

  const onChange = useOnChange({ options })

  return (
    <div className="measure-filter-container">
      <MultiSelect
        classNames={{ container: 'explorer-filters__multiselect' }}
        disabled={Objects.isNil(options)}
        multiLabelSummaryKey="common.variable"
        onChange={onChange}
        options={options ?? []}
        placeholder={t('common.variable')}
        toggleAll
        value={explorerMeasures}
      />
      <button
        className="btn-definitions-info"
        data-tooltip-content={t('definition.definitionLabel')}
        data-tooltip-delay-show={80}
        data-tooltip-id={TooltipId.info}
        data-tooltip-place="bottom"
        onClick={openDefinition}
        type="button"
      >
        <Icon name="round-e-info" />
      </button>
    </div>
  )
}

export default Measure
