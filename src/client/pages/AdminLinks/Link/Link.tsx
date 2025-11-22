import './Link.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Link as LinkType } from 'meta/cycleData/links/link'

import { LinksActions } from 'client/store/admin/links/actions'
import { useIsVerificationInProgress } from 'client/store/admin/links/hooks/verification'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import LinkCommon from 'client/components/Links/Link'

type Props = {
  link: LinkType
}

const Link: React.FC<Props> = (props) => {
  const { link: linkInfo } = props
  const { link } = linkInfo
  const { assessmentName, cycleName } = useSectionRouteParams()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName)

  const approved = linkInfo.props?.approved
  const withApprovalBadge = approved ?? false

  const handleUpdateLink = async (): Promise<void> => {
    const newApproved = Objects.isEmpty(approved) ? true : !approved
    const newProps = { ...linkInfo.props, approved: newApproved }
    const newLink = { ...linkInfo, props: newProps }
    dispatch(LinksActions.updateLink({ assessmentName, cycleName, link: newLink }))
  }

  return (
    <div className={classNames('link-cell', { withApprovalBadge })}>
      <LinkCommon oneLine rel="noreferrer" target="_blank" to={link}>
        {link}
      </LinkCommon>
      <div className="link-cell__badge-button-container">
        {withApprovalBadge && <div className="link-cell__badge">{t('common.approved')}</div>}
        <Button
          disabled={verifyLinksInProgress ?? true}
          inverse
          label={withApprovalBadge ? t('common.disapprove') : t('common.approve')}
          onClick={handleUpdateLink}
          size={ButtonSize.xs}
          type={ButtonType.primary}
        />
      </div>
    </div>
  )
}

export default Link
