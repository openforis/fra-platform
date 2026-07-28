import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Users } from 'meta/user/users'

import { useUser } from 'client/store/user/hooks/user'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import ButtonCheckbox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'
import Flex from 'client/components/Layout/Flex'

import { useBulkDownloadProps } from './hooks/useBulkDownloadProps'

const LinkBulkDownload: React.FC = () => {
  const { t } = useTranslation()
  const user = useUser()
  const linkRef = useRef<HTMLAnchorElement>(undefined)
  const administrator = Users.isAdministrator(user)
  const [includeClimaticDomain, setIncludeClimaticDomain] = useState<boolean>(administrator)
  const [includeVoluntaryUpdates, setIncludeVoluntaryUpdates] = useState<boolean>(true)

  const { downloading, onClick } = useBulkDownloadProps({ includeClimaticDomain, includeVoluntaryUpdates, linkRef })
  const className = useButtonClassName({ disabled: downloading, size: ButtonSize.m })

  return (
    <Flex gap={'32'}>
      {administrator && (
        <ButtonCheckbox
          checked={includeClimaticDomain}
          label={t('bulkDownload.includeClimaticDomain')}
          onClick={() => setIncludeClimaticDomain((prevState) => !prevState)}
          variant={ButtonCheckboxVariant.checkbox}
        />
      )}
      <ButtonCheckbox
        checked={includeVoluntaryUpdates}
        label={t('bulkDownload.includeVoluntaryUpdates')}
        onClick={() => setIncludeVoluntaryUpdates((prevState) => !prevState)}
        variant={ButtonCheckboxVariant.checkbox}
      />
      <a className={className} href={ApiEndPoint.File.bulkDownload()} onClick={onClick}>
        <Icon name="hit-down" />
        ZIP
      </a>
      {/* Hidden download anchor */}
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */}
      <a ref={linkRef} rel="noopener" style={{ display: 'none' }} />
    </Flex>
  )
}

export default LinkBulkDownload
