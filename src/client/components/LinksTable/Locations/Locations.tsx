import './Locations.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Link as LinkType, LinkLocation } from 'meta/cycleData/links/link'
import { Links } from 'meta/cycleData/links/links'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import Link, { LinkColor } from 'client/components/Links/Link'
import { useGetLocationLabel } from 'client/components/LinksTable/Locations/hooks/useGetLocationLabel'
import { Urls } from 'client/utils/urls'

type Props = {
  includeCountryIso?: boolean
  link: LinkType
}

const Locations: React.FC<Props> = (props) => {
  const { includeCountryIso, link } = props
  const { t } = useTranslation()

  const { locations } = link
  const getLabel = useGetLocationLabel({ includeCountryIso })
  const [showLocations, setShowLocations] = useState(false)

  const onClick = useCallback<() => void>(() => {
    setShowLocations((currentValue) => !currentValue)
  }, [])

  const getUrl = useCallback<(location: LinkLocation) => string>(
    (location) => {
      const queryParams = Links.getFocusedLinkQueryParams({ link: link.link, location })
      return Urls.withSearchParams(String(location.url), queryParams)
    },
    [link.link]
  )

  return (
    <>
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
        <ol className="locations">
          {locations?.map((location, idx) => (
            <li key={`${String(idx)}-${location.url}`}>
              <Link color={LinkColor.body} rel="noreferrer" target="_blank" to={getUrl(location)}>
                {getLabel({ countryIso: link.countryIso, location })}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  )
}

export default Locations
