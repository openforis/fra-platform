import './Flex.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'
import classNames from 'classnames'

type Alignment = 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'space-between' | 'space-around' | 'space-evenly'
type PropsDiv = Pick<HTMLAttributes<HTMLDivElement>, 'className'> & {
  alignContent?: Alignment
  alignItems?: Alignment
  justifyContent?: Alignment
  justifyItems?: Alignment
  gap?: '4' | '8' | '16' | '32'
}
type Props = PropsWithChildren<PropsDiv>

const defaults: Partial<PropsDiv> = {
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'start',
  justifyItems: 'start',
  gap: '4',
}

const Flex: React.FC<Props> = (props) => {
  const {
    alignContent = defaults.alignContent,
    alignItems = defaults.alignItems,
    children,
    className,
    gap = defaults.gap,
    justifyContent = defaults.justifyContent,
    justifyItems = defaults.justifyItems,
  } = props

  return (
    <div
      className={classNames(
        'flex',
        `align-items-${alignItems}`,
        `align-content-${alignContent}`,
        `justify-items-${justifyItems}`,
        `justify-content-${justifyContent}`,
        `gap-${gap}`,
        className
      )}
    >
      {React.Children.toArray(children)}
    </div>
  )
}

export default Flex
