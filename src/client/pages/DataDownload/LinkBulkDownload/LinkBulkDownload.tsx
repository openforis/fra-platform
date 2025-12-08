import React, { useRef } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { useBulkDownloadProps } from './hooks/useBulkDownloadProps'

const LinkBulkDownload: React.FC = () => {
  const linkRef = useRef<HTMLAnchorElement>(undefined)
  const { downloading, onClick } = useBulkDownloadProps({ linkRef })
  const className = useButtonClassName({ disabled: downloading, size: ButtonSize.m })

  return (
    <>
      <a className={className} href={ApiEndPoint.File.bulkDownload()} onClick={onClick}>
        <Icon name="hit-down" />
        ZIP
      </a>
      {/* Hidden download anchor */}
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
      <a ref={linkRef} rel="noopener" style={{ display: 'none' }} />
    </>
  )
}

export default LinkBulkDownload
