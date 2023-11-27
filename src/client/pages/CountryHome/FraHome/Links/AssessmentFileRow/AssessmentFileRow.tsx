import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentFiles } from 'meta/cycleData'
import { Authorizer, Users } from 'meta/user'

import { useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useDeleteAssessmentFile } from 'client/store/ui/assessmentFiles'
import { AssessmentFileLoading } from 'client/store/ui/assessmentFiles/stateType'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

import { useOnSelectChange } from './hooks/useOnSelectChange'

type Props = {
  withBorder: boolean
  assessmentFile: AssessmentFileLoading
}

const AssessmentFileRow: React.FC<Props> = (props: Props) => {
  const { withBorder, assessmentFile } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const cycle = useCycle()
  const country = useCountry(countryIso)

  const user = useUser()
  const isAdmin = Users.isAdministrator(user)

  const isCountryFile = !Objects.isEmpty(assessmentFile.countryIso)
  const canEditCountryFile = isCountryFile && Authorizer.canEditAssessmentFile({ user, country, cycle })
  const isAllowedToEdit = isAdmin || canEditCountryFile

  const deleteAssessmentFile = useDeleteAssessmentFile()

  const onSelectChange = useOnSelectChange(assessmentFile)

  return (
    <div key={assessmentFile.uuid} className={classNames('landing__activity-item', 'withPadding', { withBorder })}>
      <div className="landing__activity">
        <a
          className="link"
          href={AssessmentFiles.getHref({ assessmentName, cycleName, countryIso, uuid: assessmentFile.uuid })}
          target="_blank"
          rel="noreferrer"
        >
          {assessmentFile.fileName}
        </a>
      </div>
      {isAllowedToEdit && (
        <div className="landing__activity-item-controls">
          {/*          Show access editor if file is country file          */}
          {isCountryFile && (
            <>
              <select
                onChange={onSelectChange}
                value={assessmentFile.props.public ? 'public' : 'private'}
                className="select-s"
              >
                <option value="private">{t('common.private')}</option>
                <option value="public">{t('common.public')}</option>
              </select>
              <div className="toolbar__separator" />
            </>
          )}
          <button
            disabled={assessmentFile.loading}
            type="button"
            className="btn-xs"
            onClick={() =>
              window.confirm(t('landing.links.confirmDelete', { file: assessmentFile.fileName }))
                ? deleteAssessmentFile(assessmentFile.uuid, countryIso)
                : null
            }
          >
            <Icon className="icon-no-margin" name="trash-simple" />
          </button>
        </div>
      )}
    </div>
  )
}
export default AssessmentFileRow
