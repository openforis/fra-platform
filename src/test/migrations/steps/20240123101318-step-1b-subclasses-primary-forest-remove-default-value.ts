import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const tableName = 'primaryForestByClimaticDomain'

const variableNames = [
  'primaryForestBoreal',
  'primaryForestSubTropical',
  'primaryForestTemperate',
  'primaryForestTropical',
]

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra', metaCache: true }, client)

  const schemaName = Schemas.getName(assessment)

  await client.query(
    `
        update ${schemaName}.row
        set props = props - 'calculateFn' - 'calculateIf'
        where id in (select r.id
                     from ${schemaName}.table t
                              left join ${schemaName}.row r on t.id = r.table_id
                     where t.props ->> 'name' = $1
          and r.props ->> 'variableName' in ($2:list))
          `,
    [tableName, variableNames]
  )

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
