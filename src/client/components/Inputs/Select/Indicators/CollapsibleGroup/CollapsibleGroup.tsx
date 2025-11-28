import './CollapsibleGroup.scss'
import React from 'react'
import { GroupProps } from 'react-select'
import classNames from 'classnames'

import Icon from 'client/components/Icon'
import { Option, OptionsGroup } from 'client/components/Inputs/Select/types'
import Flex from 'client/components/Layout/Flex'

import { useGroupSelection } from '../SelectableGroupHeading/hooks/useGroupSelection'
import { useExpandGroup } from './hooks/useExpandGroup'

export const CollapsibleGroup: React.FC<GroupProps<Option>> = (props: GroupProps<Option>) => {
  const { Heading, children, cx, getClassNames, getStyles, headingProps, selectProps, theme } = props
  const { inputValue, isMulti } = selectProps
  const { disabled } = headingProps.data as OptionsGroup

  const { expanded, toggleExpanded } = useExpandGroup({ inputValue })
  const { handleGroupSelectionToggle } = useGroupSelection({ data: headingProps.data, selectProps })

  const handleHeadingClick = (e: React.MouseEvent): void => {
    const target = e.target as HTMLElement
    if (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.tagName === 'INPUT' ||
      target.closest('input[type="checkbox"]')
    ) {
      return
    }

    toggleExpanded()
  }

  return (
    <div>
      {/* eslint-disable-next-line */}
      <div className="select__group-collapsible-heading" onClick={handleHeadingClick}>
        <Heading
          cx={cx}
          data={headingProps.data}
          getClassNames={getClassNames}
          getStyles={getStyles}
          id={headingProps.id}
          selectProps={selectProps}
          theme={theme}
        >
          <Flex justifyContent={'space-between'}>
            {isMulti && !disabled ? (
              <button
                className={classNames('select__group-label', 'select__group-label--clickable')}
                onClick={handleGroupSelectionToggle}
                type="button"
              >
                {headingProps.data.label}
              </button>
            ) : (
              <span className="select__group-label">{headingProps.data.label}</span>
            )}

            <button
              className={classNames('select__group-collapse-button', { expanded })}
              onClick={toggleExpanded}
              type="button"
            >
              <Icon name="small-down" />
            </button>
          </Flex>
        </Heading>
      </div>
      {expanded && children}
    </div>
  )
}

export default CollapsibleGroup
