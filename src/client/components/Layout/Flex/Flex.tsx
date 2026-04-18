import './Flex.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'
import classNames from 'classnames'

type Alignment = 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'space-between' | 'space-around' | 'space-evenly'
type Display = 'flex' | 'inline-flex'
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type PropsDiv = Pick<HTMLAttributes<HTMLDivElement>, 'className'> & {
  alignContent?: Alignment
  alignItems?: Alignment
  display?: Display
  flexDirection?: FlexDirection
  gap?: '0' | '4' | '8' | '16' | '32'
  justifyContent?: Alignment
  justifyItems?: Alignment
}
type Props = PropsWithChildren<PropsDiv>

const defaults: Partial<PropsDiv> = {
  alignContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: '4',
  justifyContent: 'start',
  justifyItems: 'start',
}

const Flex: React.FC<Props> = (props) => {
  const {
    alignContent = defaults.alignContent,
    alignItems = defaults.alignItems,
    children,
    className,
    display = defaults.display,
    flexDirection = defaults.flexDirection,
    gap = defaults.gap,
    justifyContent = defaults.justifyContent,
    justifyItems = defaults.justifyItems,
  } = props

  return (
    <div
      className={classNames(
        'flex',
        `align-content-${alignContent}`,
        `align-items-${alignItems}`,
        `display-${display}`,
        `flex-direction-${flexDirection}`,
        `gap-${gap}`,
        `justify-content-${justifyContent}`,
        `justify-items-${justifyItems}`,
        className
      )}
    >
      {React.Children.toArray(children)}
    </div>
  )
}

export default Flex
