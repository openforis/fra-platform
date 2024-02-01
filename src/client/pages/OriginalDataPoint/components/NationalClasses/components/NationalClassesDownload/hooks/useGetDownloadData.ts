import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  nationalClasses: Array<ODPNationalClass>
}

type Returned = () => {
  data: Array<{ definition: string; nationalClass: string }>
  headers: Array<{ label: string; key: string }>
}

export const useGetDownloadData = (props: Props): Returned => {
  const { t } = useTranslation()
  const { cycleName } = useCountryRouteParams()
  const { nationalClasses } = props

  return useCallback<Returned>(() => {
    if (!nationalClasses) {
      return {
        data: [],
        headers: [],
      }
    }

    const headers = [
      {
        label: t(`nationalDataPoint.${cycleName === '2025' ? 'nationalClassifications' : 'nationalClass'}`),
        key: 'nationalClass',
      },
      { label: t('nationalDataPoint.definition'), key: 'definition' },
    ]

    const data = nationalClasses.map((nationalClass) => {
      const { name, definition } = nationalClass
      return {
        nationalClass: name ?? '',
        definition: definition ?? '',
      }
    })

    return { data, headers }
  }, [cycleName, nationalClasses, t])
}
