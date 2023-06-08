import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(`
      update
          assessment_fra.col
      set props = jsonb_set(props, '{select, options}', (props -> 'select' -> 'options') ||
                                                        jsonb_build_array(
                                                                ${[
                                                                  1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981,
                                                                  1980,
                                                                ]
                                                                  .map(
                                                                    (year) => `jsonb_build_object('name', '${year}')`
                                                                  )
                                                                  .join(',\n')}
                                                            )::jsonb
                                                            , true)
                            where id in (select c.id
                                         from assessment_fra.col c
                                                  join assessment_fra.row r on c.row_id = r.id
                                         where r.props ->> 'variableName' = 'mostRecentYear'
                                           and c.props ->> 'colName' = 'mostRecentYear')
                            returning *
  `)
}
