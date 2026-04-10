import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { Objects } from 'utils/objects'

import { useRepositoryItem } from 'client/store/repository/hooks/repository'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonType } from 'client/components/Buttons/Button'
import Form from 'client/components/Form'
import { Urls } from 'client/utils/urls'

import { useClosePanel } from '../../hooks/useClosePanel'
import { useFileMeta } from './hooks/useFileMeta'
import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnDelete } from './hooks/useOnDelete'
import { useOnSuccess } from './hooks/useOnSuccess'
import FileUsages from './FileUsages'

const RepositoryItemForm: React.FC = () => {
  const repositoryItem = useRepositoryItem()
  const closePanel = useClosePanel()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const { fileMeta, isLoading } = useFileMeta(repositoryItem)
  const formDefinition = useFormDefinition(repositoryItem, fileMeta, isLoading)
  const onSuccess = useOnSuccess()
  const onDelete = useOnDelete(repositoryItem)

  const isEditing = !Objects.isEmpty(repositoryItem?.uuid)
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
        onCancel={closePanel}
        onSuccess={onSuccess}
      />
      {isEditing && (
        <Button iconName="trash-simple" label={t('common.delete')} onClick={onDelete} type={ButtonType.danger} />
      )}
      <FileUsages fileMeta={fileMeta} />
    </div>
  )
}

export default RepositoryItemForm
