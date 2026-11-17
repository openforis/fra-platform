import { isNationalDataPointLocation } from 'meta/cycleData/links/isNationalDataPointLocation'
import { Link, LinkLocation } from 'meta/cycleData/links/link'
import { FocusedLinkQueryParams } from 'meta/routes/queryParams/focusedLink'
import { Objects } from 'utils/objects'

type Props = {
  link: Link['link']
  location: LinkLocation
}

export const getFocusedLinkQueryParams = (props: Props): FocusedLinkQueryParams => {
  const { link, location } = props

  const queryParams: FocusedLinkQueryParams = { focusedLink: link }

  if (isNationalDataPointLocation(location)) {
    queryParams.ndpSection = location.ndpSection
    if (!Objects.isEmpty(location.dataSourceUuid)) queryParams.dataSourceUuid = location.dataSourceUuid

    return queryParams
  }

  queryParams.descriptionName = location.descriptionName
  if (!Objects.isEmpty(location.uuid)) queryParams.dataSourceUuid = location.uuid

  return queryParams
}
