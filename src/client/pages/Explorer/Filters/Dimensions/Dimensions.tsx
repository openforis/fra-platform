import React from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'
import { useTooltipContent } from 'client/pages/Explorer/Filters/hooks/useTooltipContent'

import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'

const Dimensions: React.FC = () => {
  const { t } = useTranslation()

  const options = useOptions()
  const explorerDimensions = useExplorerDimensions()
  const onChange = useOnChange({ options })
  const { hideTooltip, showTooltip, tooltipContent } = useTooltipContent({
    options: options ?? [],
    value: explorerDimensions,
  })

  return (
    <div data-tooltip-content={tooltipContent} data-tooltip-id={TooltipId.info} data-tooltip-place="bottom">
      <MultiSelect
        classNames={{ container: 'explorer-filters__multiselect' }}
        disabled={Objects.isNil(options)}
        multiLabelSummaryKey="common.column"
        onChange={onChange}
        onMenuClose={showTooltip}
        onMenuOpen={hideTooltip}
        options={options ?? []}
        placeholder={t('common.column')}
        toggleAll
        value={explorerDimensions}
      />
    </div>
  )
}

export default Dimensions
