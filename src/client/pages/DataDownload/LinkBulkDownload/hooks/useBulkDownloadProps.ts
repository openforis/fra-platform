import { MouseEvent, RefObject, useState } from 'react'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  includeClimaticDomain: boolean
  linkRef: RefObject<HTMLAnchorElement>
}

type Returned = {
  downloading: boolean
  onClick: (event: MouseEvent<HTMLAnchorElement>) => Promise<void>
}

export const useBulkDownloadProps = (props: Props): Returned => {
  const { includeClimaticDomain, linkRef } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const lang = useLanguage()
  const [downloading, setDownloading] = useState<boolean>()

  const fileLinkParams = new URLSearchParams({
    assessmentName,
    countryIso,
    cycleName,
    includeClimaticDomain: String(includeClimaticDomain),
    lang,
  })

  const fileLink = `${ApiEndPoint.File.bulkDownload()}?${fileLinkParams.toString()}`
  const fileName = `bulk-download_${assessmentName}_${cycleName}.zip`
  let url: string

  const onClick: Returned['onClick'] = async (event) => {
    event.preventDefault()

    if (downloading) return

    setDownloading(true)

    try {
      const response = await axios.get(fileLink, { responseType: 'blob' })
      const blob = new Blob([response.data], { type: 'application/zip' })
      url = URL.createObjectURL(blob)

      const a = linkRef.current
      if (a) {
        a.href = url
        a.download = fileName
        a.click()
      }
    } finally {
      setTimeout(() => {
        setDownloading(false)
        if (url) {
          URL.revokeObjectURL(url)
        }
      }, 1000)
    }
  }

  return { downloading, onClick }
}
