import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'

import { TableRedisRepository } from 'server/cache/repository/table'
import { ValidationRedisRepository } from 'server/cache/repository/validation'
import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'

import { validateTables } from './validateTables'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
}

export const validateCountryTables = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessmentName, countryIso, cycleName } = props

  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName, metaCache: true },
    client
  )
  const [country, tables] = await Promise.all([
    AreaController.getCountry({ assessment, countryIso, cycle }, client),
    TableRedisRepository.getManyRecord({ assessment, cycle }),
  ])
  const tableNames = Object.keys(tables) as Array<TableName>
  const tableValidations = await validateTables({ assessment, country, cycle, tables })

  await ValidationRedisRepository.setTableValidations({
    assessment,
    countryIso: country.countryIso,
    cycle,
    tableNames,
    tableValidations,
  })
}
