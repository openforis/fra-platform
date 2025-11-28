import React from 'react'
import classNames from 'classnames'

import { useLinkClassName } from 'client/components/Links/Link'

import useOpenDefinition from './hooks/useOpenDefinition'

type Props = {
  anchor: string
  document: string
  title: string
}

const DefinitionLink: React.FC<Props> = (props: Props) => {
  const { anchor, document, title } = props

  const className = useLinkClassName()
  const openDefinition = useOpenDefinition({ anchor, document })

  return (
    <div aria-hidden="true" className={classNames(className, `no-print`)} onClick={openDefinition}>
      {title}
    </div>
  )
}

export default DefinitionLink
