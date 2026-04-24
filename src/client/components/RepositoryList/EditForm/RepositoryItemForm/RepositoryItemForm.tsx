import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'react-tooltip'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonType } from 'client/components/Buttons/Button'
import Form from 'client/components/Form'
import { Urls } from 'client/utils/urls'

import { useFileMeta } from './hooks/useFileMeta'
import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnDelete } from './hooks/useOnDelete'
import { useOnSuccess } from './hooks/useOnSuccess'
import FileUsages from './FileUsages'

type Props = {
  onClose: () => void
  repositoryItem: Partial<RepositoryItem> | undefined
}

const RepositoryItemForm: React.FC<Props> = (props) => {
  const { onClose, repositoryItem } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const { fileMeta, isLoading } = useFileMeta(repositoryItem)
  const formDefinition = useFormDefinition(repositoryItem, fileMeta, isLoading)
  const onSuccess = useOnSuccess(onClose)
  const onDelete = useOnDelete(onClose, repositoryItem)

  const isEditing = !Objects.isEmpty(repositoryItem?.uuid)
  const isUsed = !Objects.isEmpty(fileMeta?.usages)
  const isNonEmptyFolder =
    !Objects.isNil(repositoryItem) &&
    RepositoryItems.isFolder(repositoryItem) &&
    !Objects.isEmpty((repositoryItem as RepositoryItemTree).children)
  const method = isEditing ? 'put' : 'post'
  const action = Urls.withSearchParams(ApiEndPoint.CycleData.Repository.one(), {
    assessmentName,
    countryIso,
    cycleName,
  })

  return (
    <div className="repository-item-form">
      <Form
        action={action}
        formDefinition={formDefinition}
        isDirtyOverride={isEditing || undefined}
        method={method}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
      {isEditing && (
        <div className="repository-item-form__delete">
          <div data-tooltip-id="repository-item-form__delete-btn">
            <Button
              disabled={isLoading || isUsed || isNonEmptyFolder}
              iconName="trash-simple"
              label={t('common.delete')}
              onClick={onDelete}
              type={ButtonType.danger}
            />
            {isNonEmptyFolder && (
              // Workaround to get around z-index issue with panel
              <div className="tooltip-container">
                <Tooltip
                  className={TooltipId.error}
                  classNameArrow={`${TooltipId.error}-arrow`}
                  id="repository-item-form__delete-btn"
                  place="top"
                >
                  {t('landing.links.folderNotEmpty')}
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      )}
      <FileUsages fileMeta={fileMeta} />
    </div>
  )
}

export default RepositoryItemForm
