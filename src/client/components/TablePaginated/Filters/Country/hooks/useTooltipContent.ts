import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'

type Props = {
  fieldName: string
  path: string
}

type Returned = {
  hideTooltip: () => void
  showTooltip: () => void
  tooltipContent: string | null
}

export const useTooltipContent = (props: Props): Returned => {
  const { fieldName, path } = props
  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)
  const [canDisplayTooltip, setCanDisplayTooltip] = useState(true)
  const { t } = useTranslation()

  const tooltipContent = useMemo<string | null>(() => {
    if (Objects.isEmpty(filterValue)) return null
    if (!canDisplayTooltip) return null
    const MAX_VISIBLE_COUNTRY_LABELS = 50

    const selectedCountryLabels = filterValue
      .map((countryIso) => {
        return t(`area.${countryIso}.listName`)
      })
      .sort((a, b) => a.localeCompare(b))
      .slice(0, MAX_VISIBLE_COUNTRY_LABELS)

    if (filterValue.length > MAX_VISIBLE_COUNTRY_LABELS) {
      selectedCountryLabels.push('...')
    }

    return selectedCountryLabels.join(', ')
  }, [canDisplayTooltip, filterValue, t])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  return {
    hideTooltip,
    showTooltip,
    tooltipContent,
  }
}
