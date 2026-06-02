import './Measures.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'
import Flex from 'client/components/Layout/Flex'
import useOpenDefinition from 'client/components/Links/DefinitionLink/hooks/useOpenDefinition'
import { useTooltipContent } from 'client/pages/Explorer/Filters/hooks/useTooltipContent'

import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'

const Measures: React.FC = () => {
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
  const { hideTooltip, showTooltip, tooltipContent } = useTooltipContent({
    options: options ?? [],
    value: explorerMeasures,
  })

  return (
    <Flex className="measure-filter-container" gap="0">
      <div data-tooltip-content={tooltipContent} data-tooltip-id={TooltipId.info} data-tooltip-place="bottom">
        <MultiSelect
          classNames={{ container: 'explorer-filters__multiselect' }}
          disabled={Objects.isNil(options)}
          multiLabelSummaryKey="common.variable"
          onChange={onChange}
          onMenuClose={showTooltip}
          onMenuOpen={hideTooltip}
          options={options ?? []}
          placeholder={t('common.variable')}
          toggleAll
          value={explorerMeasures}
        />
      </div>
      <Button
        dataTooltipContent={t('definition.definitionLabel')}
        dataTooltipId={TooltipId.info}
        iconName="round-e-info"
        inverse
        noBorder
        onClick={openDefinition}
        size={ButtonSize.m}
      />
    </Flex>
  )
}

export default Measures
