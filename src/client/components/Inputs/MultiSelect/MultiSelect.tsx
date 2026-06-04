import './MultiSelect.scss'
import React from 'react'
import { PlacesType } from 'react-tooltip'
import classNames from 'classnames'

import { TooltipId } from 'meta/tooltip/id'

import Select, { SelectProps } from 'client/components/Inputs/Select'

import { useTooltipContent } from './hooks/useTooltipContent'

type Props = Omit<SelectProps, 'isMulti' | 'tooltip'> & {
  tooltipPlace?: PlacesType
}

const MultiSelect: React.FC<Props> = (props: Props) => {
  const { classNames: classes, multiLabelSummaryKey, options, tooltipPlace, value } = props

  const { hideTooltip, showTooltip, tooltipContent } = useTooltipContent({ multiLabelSummaryKey, options, value })

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      classNames={{
        container: classNames(
          'multiselect__container',
          {
            active: value?.length > 0,
          },
          classes?.container
        ),
      }}
      isMulti
      onMenuClose={showTooltip}
      onMenuOpen={hideTooltip}
      tooltip={{ id: TooltipId.info, content: tooltipContent, place: tooltipPlace }}
    />
  )
}

export default MultiSelect
