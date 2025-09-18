import './Locations.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Link as LinkType } from 'meta/cycleData'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

type Props = {
  link: LinkType
}

const Locations: React.FC<Props> = (props) => {
  const { link } = props
  const { t } = useTranslation()

  const { locations } = link

  const [showLocations, setShowLocations] = useState(false)

  const onClick = useCallback<() => void>(() => {
    setShowLocations((currentValue) => !currentValue)
  }, [])

  return (
    <div>
      <div className="locations-count">
        <span>{locations?.length}</span>
        <Button
          className="no-print"
          inverse={!showLocations}
          label={t(showLocations ? `common.hide` : `common.show`)}
          onClick={onClick}
          size={ButtonSize.xs}
        />
      </div>

      {showLocations && (
        <div className="locations">
          {locations?.map(({ id, url }, idx) => (
            <Link
              key={`${String(idx)}-${id}`}
              className="locations-link"
              rel="noreferrer"
              target="_blank"
              to={String(url)}
            >
              {`${t('common.link')} ${idx + 1}`}
              <Icon name="external-link" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Locations
