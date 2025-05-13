import './ButtonEdit.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import Icon from 'client/components/Icon'

type LinkProps = {
  url: string
}

type ButtonProps = {
  onClick: () => void
}

type Props = LinkProps | ButtonProps

const ButtonEdit: React.FC<Props> = (props) => {
  if ('url' in props) {
    const { url } = props
    return (
      <Link className="btn-s btn-link btn-edit" to={url} type="button">
        <Icon name="pencil" />
      </Link>
    )
  }

  const { onClick } = props
  return (
    <button className="btn-s btn-link btn-edit" onClick={onClick} type="button">
      <Icon name="pencil" />
    </button>
  )
}

export default ButtonEdit
