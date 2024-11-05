import './CollapsibleGroup.scss'
import React from 'react'
import { GroupProps } from 'react-select'

import classNames from 'classnames'

import Icon from 'client/components/Icon'
import { Option } from 'client/components/Inputs/Select/types'

import { useExpandGroup } from './hooks/useExpandGroup'

export const CollapsibleGroup: React.FC<GroupProps<Option>> = (props: GroupProps<Option>) => {
  const { children, cx, getClassNames, getStyles, Heading, headingProps, selectProps, theme } = props
  const { inputValue } = selectProps

  const { expanded, toggleExpanded } = useExpandGroup({ inputValue })

  return (
    <div>
      <div className="select__group-collapsible-heading">
        <Heading
          cx={cx}
          data={headingProps.data}
          getClassNames={getClassNames}
          getStyles={getStyles}
          id={headingProps.id}
          selectProps={selectProps}
          theme={theme}
        >
          {headingProps.data.label}
          <button
            className={classNames('select__group-collapse-button', { expanded })}
            onClick={toggleExpanded}
            type="button"
          >
            <Icon name="small-down" />
          </button>
        </Heading>
      </div>
      {expanded && children}
    </div>
  )
}

export default CollapsibleGroup
