import { Row } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  const schemaName = Schemas.getName(assessment)

  const rows = (await client.manyOrNone<Row>(`select * from ${schemaName}.row where props->>'linkToSection' is not NULL;`)) ?? []

  await Promise.all(
    rows.map((row) => {
      const linkToSection = row.props.cycles.reduce((prev, curr) => ({ ...prev, [curr]: row.props.linkToSection }), {})

      return client.query(`update ${schemaName}.row r set props = jsonb_set(r.props, '{linkToSection}', $1::jsonb) where id = $2;`, [
        JSON.stringify(linkToSection),
        row.id,
      ])
    })
  )
}
