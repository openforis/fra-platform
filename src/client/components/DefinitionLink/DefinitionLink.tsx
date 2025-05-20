import './DefinitionLink.scss'
import React from 'react'

import classNames from 'classnames'

import useOpenDefinition from './hooks/useOpenDefinition'

type Props = {
  anchor: string
  className?: string
  document: string
  title: string
}

const DefinitionLink: React.FC<Props> = (props: Props) => {
  const { anchor, className, document, title } = props
  const openDefinition = useOpenDefinition({ anchor, document })

  return (
    <div aria-hidden="true" className={classNames(`definition-link`, className, `no-print`)} onClick={openDefinition}>
      {title}
    </div>
  )
}

export default DefinitionLink
