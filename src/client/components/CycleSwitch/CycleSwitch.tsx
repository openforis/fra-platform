import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {
  components: Record<string, React.FC<{ query?: string }>>
  defaultKey?: string
  query?: string
}

const Placeholder: React.FC<{ query?: string }> = () => {
  return <div />
}

const CycleSwitch: React.FC<Props> = (props) => {
  const { cycleName } = useParams()

  const { components, defaultKey, ...otherProps } = props
  const key = cycleName ?? defaultKey

  const Component = components[key] ?? Placeholder
  return React.createElement(Component, otherProps)
}

CycleSwitch.defaultProps = {
  defaultKey: '2020',
  query: null,
}

export default CycleSwitch
