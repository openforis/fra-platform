import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { Objects } from 'utils/objects'

import { useRepositoryItem } from 'client/store/repository/hooks/repository'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Form from 'client/components/Form'
import { Urls } from 'client/utils/urls'

import { useClosePanel } from '../../hooks/useClosePanel'
import { useFormDefinition } from './hooks/useFormDefinition'
import { useOnSuccess } from './hooks/useOnSuccess'

const RepositoryItemForm: React.FC = () => {
  const repositoryItem = useRepositoryItem()
  const closePanel = useClosePanel()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const formDefinition = useFormDefinition(repositoryItem)
  const onSuccess = useOnSuccess()

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
    </div>
  )
}

export default RepositoryItemForm
