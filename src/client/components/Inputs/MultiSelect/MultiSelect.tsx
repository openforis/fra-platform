import './MultiSelect.scss'
import React, { useMemo } from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'
import classNames from 'classnames'

import { TooltipId } from 'meta/tooltip/id'
import { UUIDs } from 'meta/uuid/uuids'
import { Objects } from 'utils/objects'

import Select, { SelectProps } from 'client/components/Inputs/Select'

import { useTooltipContent } from './hooks/useTooltipContent'

type Props = Omit<SelectProps, 'isMulti' | 'tooltip'> & {
  tooltipPlace?: PlacesType
}

const MultiSelect: React.FC<Props> = (props: Props) => {
  const { classNames: classes, multiLabelSummaryKey, options, tooltipPlace, value } = props

  const { hideTooltip, showTooltip, tooltipLabels } = useTooltipContent({ multiLabelSummaryKey, options, value })
  const tooltipId = useMemo<string>(() => `multiselect-tooltip-${UUIDs.getUuid()}`, [])
  const hasLabels = !Objects.isEmpty(tooltipLabels)

  return (
    <div className="multiselect__tooltip-trigger" data-tooltip-id={tooltipId}>
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
      />

      {hasLabels && (
        <div className="tooltip-container">
          <Tooltip
            className={TooltipId.info}
            classNameArrow={`${TooltipId.info}-arrow`}
            delayHide={100}
            id={tooltipId}
            place={tooltipPlace ?? 'bottom-start'}
          >
            <div className="multiselect__tooltip-values">
              {tooltipLabels.map((label) => (
                <span key={label} className="multiselect__tooltip-value">
                  {label}
                </span>
              ))}
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default MultiSelect
