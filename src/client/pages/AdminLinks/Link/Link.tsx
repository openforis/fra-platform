import './Link.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Link as LinkType } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { LinksActions } from 'client/store/ui/links'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

type Props = {
  link: LinkType
}

const Link: React.FC<Props> = (props) => {
  const { link: linkInfo } = props
  const { link } = linkInfo
  const { assessmentName, cycleName } = useSectionRouteParams()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const approved = linkInfo.props?.approved
  const withApprovalBadge = approved ?? false

  const handleUpdateLink = async () => {
    const newApproved = Objects.isEmpty(approved) ? true : !approved
    const newProps = { ...linkInfo.props, approved: newApproved }
    const newLink = { ...linkInfo, props: newProps }
    dispatch(LinksActions.updateLink({ assessmentName, cycleName, link: newLink }))
  }

  return (
    <div className={classNames('link-cell', { withApprovalBadge })}>
      <a className="link-cell__anchor" href={link} rel="noreferrer" target="_blank">
        {link}
      </a>
      <div className="link-cell__badge-button-container">
        {withApprovalBadge && <div className="link-cell__badge">{t('common.approved')}</div>}
        <Button
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
