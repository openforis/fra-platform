import { BaseProtocol } from '../../src/server/db'

type Props = {
  client: BaseProtocol
  schema: string
  index: number
}

export const migrateAreas = async (props: Props): Promise<void> => {
  const { client, schema, index } = props

  await client.query(`
      insert into ${schema}.country (country_iso, props)
      select c.country_iso,
             c.config || jsonb_build_object(
                     'status', ${index === 0 ? 'a.status' : `'editing'`},
                     'desk_study', ${index === 0 ? 'a.desk_study' : false},
                     'forestCharacteristics',
                     jsonb_build_object('useOriginalDataPoint', (dcc.config ->> 'useOriginalDataPointsInFoc')::boolean)
                 ) as props
      from public.country c
               left join _legacy.assessment a on (c.country_iso = a.country_iso)
               left join _legacy.dynamic_country_configuration dcc on (c.country_iso = dcc.country_iso)
      order by country_iso;
  `)

  await client.query(`
      insert into ${schema}.country_region (country_iso, region_code)
      select c.country_iso, c.region_code
      from _legacy.country_region c
  `)

  await client.query(`
      insert into ${schema}.region_group (name, "order")
      select name, "order"
      from _legacy.region_group
      order by "order";
  `)

  await client.query(`
      insert into ${schema}.region (region_code, region_group_id)
      select r.region_code,
             rg.id as region_group_id
      from region r
               left join _legacy.region r_l
                         on r.region_code = r_l.region_code
               left join _legacy.region_group rg_l on r_l.region_group = rg_l.id
               left join ${schema}.region_group rg on rg_l.name = rg.name
      where r.region_code != 'FE'
      order by r.region_code;
  `)
}
