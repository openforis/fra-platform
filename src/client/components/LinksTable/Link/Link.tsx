import './Link.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { CountryIso } from 'meta/area/countryIso'
import { Link as LinkType, LinkValidationStatusCode } from 'meta/cycleData/links/link'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { LinksActions } from 'client/store/links/actions'
import { useIsVerificationInProgress } from 'client/store/links/hooks/verification'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import LinkCommon from 'client/components/Links/Link'

type Props = {
  countryIso?: CountryIso
  link: LinkType
}

const Link: React.FC<Props> = (props) => {
  const { countryIso, link: linkInfo } = props
  const { link } = linkInfo
  const { assessmentName, cycleName } = useSectionRouteParams()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName, countryIso)

  const approved = linkInfo.props?.approved
  const withApprovalBadge = approved ?? false
  const valid = linkInfo.visits?.at(-1)?.code === LinkValidationStatusCode.success
  const withButton = !valid || withApprovalBadge

  const handleUpdateLink = async (): Promise<void> => {
    const newApproved = Objects.isEmpty(approved) ? true : !approved
    const newProps = { ...linkInfo.props, approved: newApproved }
    const newLink = { ...linkInfo, props: newProps }
    dispatch(LinksActions.updateLink({ assessmentName, cycleName, countryIso, link: newLink }))
  }

  return (
    <div className={classNames('link-cell', { withApprovalBadge })}>
      <LinkCommon oneLine rel="noreferrer" target="_blank" to={link}>
        {link}
      </LinkCommon>
      <div className="link-cell__badge-button-container">
        {withApprovalBadge && <div className="link-cell__badge">{t('common.approved')}</div>}
        {withButton && (
          <Button
            disabled={verifyLinksInProgress ?? true}
            inverse
            label={withApprovalBadge ? t('common.disapprove') : t('common.approve')}
            onClick={handleUpdateLink}
            size={ButtonSize.xs}
            type={ButtonType.primary}
          />
        )}
      </div>
    </div>
  )
}

export default Link
