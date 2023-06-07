import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  const schemaName = Schemas.getName(assessment)

  const cols = await client.map(
    `select c.* from ${schemaName}.col c left join ${schemaName}.row r on c.row_id = r.id
           where r.props ->> 'type' = 'noticeMessage'
             and c.props-> 'style' is not null`,
    [],
    (col) => {
      // eslint-disable-next-line no-param-reassign
      col.props.style = Object.keys(col.props.style).reduce((acc, cycleUuid) => {
        const style = col.props.style[cycleUuid]
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        acc[cycleUuid] = {
          ...style,
          rowSpan: 1,
        }
        return acc
      }, {})
      return col
    }
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const col of cols) {
    // eslint-disable-next-line no-await-in-loop
    await client.query(`update ${schemaName}.col set props = $1::jsonb where id = $2`, [
      JSON.stringify(col.props),
      col.id,
    ])
  }
}
