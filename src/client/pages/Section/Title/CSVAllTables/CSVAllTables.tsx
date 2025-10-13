import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Promises } from 'utils/promises'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

type Props = {
  disabled?: boolean
}

const CSVAllTables: React.FC<Props> = (props) => {
  const { disabled } = props

  const [isDownloading, setIsDownloading] = useState(false)
  const { t } = useTranslation()
  const { print } = useIsPrintRoute()

  const className = useButtonClassName({
    disabled: disabled || isDownloading,
    iconName: 'hit-down',
    label: isDownloading ? t('common.downloading') : t('common.csvAll'),
    size: ButtonSize.s,
    className: 'btn-csv-download-all',
  })

  const handleClick = async (): Promise<void> => {
    setIsDownloading(true)

    try {
      const delay = (ms: number): Promise<void> =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, ms)
        })

      const csvButtons = Array.from(document.querySelectorAll('.btn-csv-download'))
      await Promises.each(csvButtons, async (button) => {
        if (button instanceof HTMLElement) {
          button.click()

          // NOTE: Delay is required to avoid malformed data
          await delay(500)
        }
      })
    } finally {
      setIsDownloading(false)
    }
  }

  if (print) return null

  return (
    <button className={className} onClick={handleClick} type="button">
      <Icon className="icon-sub icon-white" name="hit-down" />
      {isDownloading ? t('common.downloading') : t('common.csvAll')}
    </button>
  )
}

export default CSVAllTables
