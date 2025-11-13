import { Promises } from 'utils/promises'

import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { AssessmentNames } from 'meta/assessment/assessment'
import { TableNames } from 'meta/assessment/table'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'
import { Schemas } from 'server/db/schemas'

const TABLE = 'original_data_point'

type ColumnExistsProps = {
  client: BaseProtocol
  columnName: string
  schemaName: string
}

const _columnExists = async (props: ColumnExistsProps): Promise<boolean> => {
  const { client, columnName, schemaName } = props

  const query = `
    select column_name
    from information_schema.columns
    where table_schema = $1
      and table_name = $2
      and column_name = $3
  `

  const record = await client.oneOrNone<{ column_name: string }>(query, [schemaName, TABLE, columnName])

  return Boolean(record)
}

type UpdateTableProps = {
  client: BaseProtocol
  schemaName: string
}

const _updateOriginalDataPointTable = async (props: UpdateTableProps): Promise<void> => {
  const { client, schemaName } = props
  const tableName = `${schemaName}.${TABLE}`
  const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest]
  const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]

  const hasDescription = await _columnExists({ client, columnName: 'description', schemaName })
  if (hasDescription) {
    await DB.none(`
      alter table ${tableName} rename column description to ${commentColumnExtent};
      alter table ${tableName}
        alter column ${commentColumnExtent} type text using coalesce(${commentColumnExtent}, ''),
        alter column ${commentColumnExtent} set default '',
        alter column ${commentColumnExtent} set not null;`)
  }

  const hasExtentOfForestComments = await _columnExists({
    client,
    columnName: commentColumnExtent,
    schemaName,
  })

  if (!hasExtentOfForestComments) {
    throw new Error(`Column ${commentColumnExtent} not found in ${tableName}`)
  }

  const hasForestCharacteristicsComments = await _columnExists({
    client,
    columnName: commentColumnForestCharacteristics,
    schemaName,
  })

  if (!hasForestCharacteristicsComments) {
    await DB.none(`alter table ${tableName} add column ${commentColumnForestCharacteristics} text default '' not null`)
    await client.none(`update ${tableName} set ${commentColumnForestCharacteristics} = ${commentColumnExtent}`)
  }
}

const _truncateAdminLinks = async (props: UpdateTableProps): Promise<void> => {
  const { client, schemaName } = props
  await client.none(`truncate table ${schemaName}.link`)
}

type UpdateActivityLogProps = {
  client: BaseProtocol
}

const _updateActivityLog = async (props: UpdateActivityLogProps): Promise<void> => {
  const { client } = props

  const odpActivityMessagesSql = [
    ActivityLogMessage.originalDataPointCreate,
    ActivityLogMessage.originalDataPointRemove,
    ActivityLogMessage.originalDataPointUpdate,
    ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest,
    ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics,
    ActivityLogMessage.originalDataPointUpdateDataSources,
    ActivityLogMessage.originalDataPointUpdateNationalClasses,
    ActivityLogMessage.originalDataPointUpdateOriginalData,
    ActivityLogMessage.originalDataPointUpdateYear,
    'originalDataPointUpdateDescription',
  ]
    .map((message) => `'${message}'`)
    .join(',')

  await client.none(`
    update public.activity_log al
    set message = '${ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest}'
    where al.message = 'originalDataPointUpdateDescription'
  `)

  await client.none(`
    update public.activity_log al
    set target = jsonb_set(
                  jsonb_set(
                    coalesce(al.target, '{}'::jsonb) - 'description',
                    '{comments,${TableNames.extentOfForest}}',
                    to_jsonb(coalesce(coalesce(al.target, '{}'::jsonb) ->> 'description', '')),
                    true
                  ),
                  '{comments,${TableNames.forestCharacteristics}}',
                  to_jsonb(coalesce(coalesce(al.target, '{}'::jsonb) ->> 'description', '')),
                  true
                )
    where coalesce(al.target, '{}'::jsonb) ? 'description'
      and al.message in (${odpActivityMessagesSql})
  `)
}

export default async (client: BaseProtocol): Promise<void> => {
  await _updateActivityLog({ client })

  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    if (assessment.props.name === AssessmentNames.panEuropean) return
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)
      await _updateOriginalDataPointTable({ client, schemaName })
      await _truncateAdminLinks({ client, schemaName })

      // Update activity log materialized views to include new odp comment columns logs
      const countries = await AreaController.getCountries({ assessment, cycle }, client)
      await Promises.each(countries, async ({ countryIso }) => {
        await CountryActivityLogRepository.dropMaterializedView({ assessment, cycle, countryIso }, client)
        await CountryActivityLogRepository.createMaterializedView({ assessment, cycle, countryIso }, client)
      })
    })
  })
}
