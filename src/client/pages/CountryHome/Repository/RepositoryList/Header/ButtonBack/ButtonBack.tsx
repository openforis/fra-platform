import './ButtonBack.scss'
import React from 'react'

import { Objects } from 'utils/objects'

import Icon from 'client/components/Icon'
import { useRepositoryListContext } from 'client/pages/CountryHome/Repository/RepositoryList/context'

const ButtonBack: React.FC = () => {
  const { folderPath, onNavigate } = useRepositoryListContext()
  const disabled = Objects.isEmpty(folderPath)

  return (
    <button className="repository-button-back" disabled={disabled} onClick={() => onNavigate(folderPath.at(-2)?.uuid)}>
      <Icon name="small-down" />
    </button>
  )
}

export default ButtonBack
