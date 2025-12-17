import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { FormDefinition, FormFieldType } from 'client/components/Form/types'
import Flex from 'client/components/Layout/Flex'

interface Props {
  formDefinition: FormDefinition
}

const FormSkeleton: React.FC<Props> = (props) => {
  const { formDefinition } = props

  const visibleFields = formDefinition.fields.filter((field) => field.type !== FormFieldType.hidden)

  return (
    <div className="data-grid form-grid">
      {visibleFields.map((field) => (
        <Skeleton key={field.name} borderRadius="4px" height="48px" width="100%" />
      ))}
      <Flex gap="16" justifyContent="center">
        <Skeleton borderRadius="20px" height="48px" width="190px" />
        <Skeleton borderRadius="20px" height="48px" width="190px" />
      </Flex>
    </div>
  )
}

export default FormSkeleton
