import { CommentableDescription, CommentableDescriptionName, DataSource } from 'meta/assessment/descriptionValue'
import {
  DataSourceValidation,
  DataSourceValidationField,
  RecordDescriptionValidations,
} from 'meta/assessment/validation/description'
import { Objects } from 'utils/objects'

type Props = {
  descriptions: Array<CommentableDescription>
}

const fields: Array<DataSourceValidationField> = ['reference', 'type', 'variables', 'year']

const _getRowValidations = (dataSource: DataSource): DataSourceValidation => {
  return fields.reduce<DataSourceValidation>((acc, field) => {
    if (Objects.isEmpty(dataSource[field])) {
      acc[field] = {
        messages: [{ key: 'generalValidation.notEmpty' }],
        valid: false,
      }
    }

    return acc
  }, {})
}

const _getDataSourceValidations = (dataSources: Array<DataSource>): Record<string, DataSourceValidation> => {
  return dataSources.reduce<Record<string, DataSourceValidation>>((acc, dataSource) => {
    const { placeholder } = dataSource
    const uuid = dataSource.uuid as string
    if (placeholder) return acc

    const rowValidations = _getRowValidations(dataSource)
    if (!Objects.isEmpty(rowValidations)) {
      acc[uuid] = rowValidations
    }

    return acc
  }, {})
}

export const buildDataSourcesValidations = (props: Props): RecordDescriptionValidations => {
  const { descriptions } = props

  return descriptions.reduce<RecordDescriptionValidations>((acc, description) => {
    const { name, sectionName, value } = description
    if (name !== CommentableDescriptionName.dataSources) return acc
    if (!Array.isArray(value.dataSources)) return acc

    const { dataSources } = value

    const dataSourceValidations = _getDataSourceValidations(dataSources)

    acc[sectionName] = { dataSources: dataSourceValidations }
    return acc
  }, {})
}
