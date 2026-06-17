import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescription } from 'meta/assessment/descriptionValue'
import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { Validation } from 'meta/assessment/validation/validation'
import { Sockets } from 'meta/socket/sockets'
import { Objects } from 'utils/objects'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<Omit<CommentableDescription, 'id'>>
  notifyClients?: boolean
}

// Reference (empty check + link verification) is validated by the description link flow.
const requiredFields: Array<keyof Pick<DataSource, 'type' | 'variables' | 'year'>> = ['type', 'variables', 'year']

const _getRequiredValidation = (value: DataSource[keyof DataSource]): Validation => {
  if (Objects.isEmpty(value)) return { valid: false, messages: [{ key: 'generalValidation.notEmpty' }] }
  return { valid: true }
}

// Validates the required data source fields (type, variables, year) when the data sources are saved.
export const updateDataSourceFieldValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions, notifyClients = true } = props
  const { countryIso } = country

  const dataSourceDescriptions = descriptions.filter(({ value }) => value.dataSources !== undefined)
  if (Objects.isEmpty(dataSourceDescriptions)) return

  const descriptionValidations = dataSourceDescriptions.reduce<RecordDescriptionValidations>((acc, description) => {
    const { sectionName, value } = description
    const sectionValidation = (acc[sectionName] ??= {})
    const dataSources = (sectionValidation.dataSources ??= {})

    value.dataSources?.forEach((dataSource) => {
      const { placeholder, uuid } = dataSource
      if (placeholder || Objects.isEmpty(uuid)) return

      const dataSourceValidation = (dataSources[uuid] ??= {})
      requiredFields.forEach((field) => {
        dataSourceValidation[field] = _getRequiredValidation(dataSource[field])
      })
    })

    return acc
  }, {})

  await DescriptionValidationRedisRepository.setDescriptionValidations({
    assessment,
    countryIso,
    cycle,
    descriptionValidations,
  })

  if (notifyClients) {
    const sectionNames = Array.from(new Set(dataSourceDescriptions.map(({ sectionName }) => sectionName)))
    const eventName = Sockets.getDescriptionValidationsUpdateEvent({
      assessmentName: assessment.props.name,
      countryIso,
      cycleName: cycle.name,
    })
    SocketServer.emit(eventName, { descriptionValidations, sectionNames })
  }
}
