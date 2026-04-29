import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleName } from 'meta/assessment/cycle'

import { TableRedisRepository } from 'server/cache/repository/table'
import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { updateValidations } from 'server/controller/cycleData/validations/updateValidations'
import { BaseProtocol, DB } from 'server/db/db'

import { buildTablesNodeUpdates } from './buildTablesNodeUpdates'

type Props = {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
}

export const validateCountryTables = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessmentName, countryIso, cycleName } = props

  const assessment = await AssessmentController.getOne({ assessmentName, metaCache: true }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })

  const [country, tables] = await Promise.all([
    AreaController.getCountry({ assessment, countryIso, cycle }, client),
    TableRedisRepository.getManyRecord({ assessment, cycle }),
  ])
  const nodeUpdates = buildTablesNodeUpdates({ assessment, country, cycle, tables })

  await updateValidations({
    assessment,
    country,
    cycle,
    nodeUpdates,
    notifyClients: false,
  })
}
