import './ButtonDelete.scss'
import React from 'react'

import Icon from 'client/components/Icon'

type Props = {
  onClick: () => void
}

const ButtonDelete: React.FC<Props> = (props) => {
  const { onClick } = props

  return (
    <button className="btn-s btn-link-destructive btn-delete" onClick={onClick} type="button">
      <Icon className="icon-no-margin" name="trash-simple" />
    </button>
  )
}

export default ButtonDelete
