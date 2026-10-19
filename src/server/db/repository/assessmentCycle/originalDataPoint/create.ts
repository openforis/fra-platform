import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB } from 'server/db/db'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'
import { getOne } from 'server/db/repository/assessmentCycle/originalDataPoint/getOne'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint } = props
  const { comments, countryIso, nationalClasses, values, year } = originalDataPoint

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest]
  const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]

  await client.query(
    `
        insert into ${schemaName}.original_data_point (
          country_iso,
          year,
          ${commentColumnExtent},
          ${commentColumnForestCharacteristics},
          national_classes,
          values
        ) values ($(countryIso), $(year), $(commentsExtentOfForest), $(commentsForestCharacteristics), $(nationalClasses)::jsonb, $(values)::jsonb);`,
    {
      countryIso,
      year,
      commentsExtentOfForest: comments?.[TableNames.extentOfForest] ?? '',
      commentsForestCharacteristics: comments?.[TableNames.forestCharacteristics] ?? '',
      nationalClasses: nationalClasses ? JSON.stringify(nationalClasses) : '[]',
      values: values ? JSON.stringify(values) : '{}',
    }
  )

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
