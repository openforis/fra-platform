import './ExportButton.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const ExportButton: React.FC = () => {
  const disabled = true
  const exportUrl = ''

  const className = useButtonClassName({ disabled, iconName: 'hit-down' })

  return (
    <div className="explorer-export-button">
      <Link className={className} target="_blank" to={exportUrl}>
        <Icon className="icon-sub icon-white" name="hit-down" />
        CSV
      </Link>
    </div>
  )
}

export default ExportButton
