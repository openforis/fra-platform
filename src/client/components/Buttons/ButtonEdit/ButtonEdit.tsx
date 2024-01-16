import React from 'react'
import { Link } from 'react-router-dom'

import Icon from 'client/components/Icon'

type Props = {
  url: string
}

const ButtonEdit: React.FC<Props> = (props) => {
  const { url } = props

  return (
    <Link target="_blank" to={url} type="button" className="btn-s btn-link">
      <Icon name="pencil" />
    </Link>
  )
}

export default ButtonEdit
