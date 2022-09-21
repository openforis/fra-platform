import { Assessment, Cycle } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'
import { getClimaticDomainQuery } from '@server/repository/assessmentCycle/data/query/getClimaticDomainQuery'
import { getFraYearsDataQuery } from '@server/repository/assessmentCycle/data/query/getFraYearsDataQuery'

const getAnnualData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<Record<string, string>>> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.many<Record<string, string>>(
    `
        with disturbances as (select country_iso, col_name                                                                        as year,
            max(case when variable_name = 'insects' then value ->> 'raw' end)               as "insects",
            max(case when variable_name = 'diseases' then value ->> 'raw' end)              as "diseases",
            max(case when variable_name = 'other' then value ->> 'raw' end)                 as "other",
            max(case when variable_name = 'severe_weather_events' then value ->> 'raw' end) as "severe_weather_events"
        from ${schemaCycle}.disturbances
        where variable_name in ('diseases', 'insects', 'other', 'severe_weather_events')
        group by 1, 2),
            fire as (select country_iso,
            col_name                                                                                   as year,
            max(case when variable_name = 'of_which_on_forest' then value ->> 'raw' end)               as "of_which_on_forest",
            max(case
            when variable_name = 'total_land_area_affected_by_fire'
            then value ->> 'raw' end)                                                      as "total_land_area_affected_by_fire"
        from ${schemaCycle}.areaaffectedbyfire
        where variable_name in ('total_land_area_affected_by_fire', 'of_which_on_forest')
        group by 1, 2),
        climaticdomain as (${getClimaticDomainQuery(schemaCycle)}),
            _regions as (select cr.country_iso, array_to_string(ARRAY_AGG(distinct cr.region_code), ';') as regions
        from ${schemaCycle}.country_region cr
        group by cr.country_iso),
            _years as (
        select t1.*, t2.*
        from
            (
            select d.year from disturbances d
            union
            select f.year from fire f
            order by 1
            ) as t1
            full join
            (select c.* from country as c) as t2
        on true
        order by 2, 1
            )
        select r.regions,
               cc.country_iso,
               y.year,
               boreal,
               temperate,
               tropical,
               sub_tropical as subtropical,
               insects                          as "5a_insect",
               diseases                         as "5a_diseases",
               severe_weather_events            as "5a_weather",
               other                            as "5a_other",
               total_land_area_affected_by_fire as "5b_fire_land",
               of_which_on_forest               as "5b_fire_forest"
        from ${schemaCycle}.country cc
                 join _regions r using (country_iso)
                 join _years y using (country_iso)
                 join climaticdomain c using (country_iso)
                 left join disturbances d using (country_iso, year)
                 left join fire f using (country_iso, year)
        where cc.country_iso not ilike 'X%'


    `,
    []
  )
}

const getIntervalData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<Record<string, string>>> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.many<Record<string, string>>(
    `
    with annualreforestation as (select country_iso,
                             col_name                                                                        as year,
                             max(case when variable_name = 'reforestation' then value ->> 'raw' end)               as "reforestation"
                      from ${schemaCycle}.annualreforestation
                      where variable_name in ('reforestation')
                      group by 1, 2),
     forestareachange as (select country_iso,
                     col_name                                                                                   as year,
                     max(case when variable_name = 'forest_expansion' then value ->> 'raw' end)               as "forest_expansion",
                     max(case when variable_name = 'afforestation' then value ->> 'raw' end)               as "afforestation",
                     max(case when variable_name = 'natural_expansion' then value ->> 'raw' end)               as "natural_expansion",
                     max(case when variable_name = 'deforestation' then value ->> 'raw' end)               as "deforestation"
              from ${schemaCycle}.forestareachange
              where variable_name in ('afforestation', 'deforestation', 'forest_expansion', 'natural_expansion')
              group by 1, 2),
     climaticdomain as (${getClimaticDomainQuery(schemaCycle)}),
     _regions as (select cr.country_iso, array_to_string(ARRAY_AGG(distinct cr.region_code), ';') as regions
                  from ${schemaCycle}.country_region cr
                  group by cr.country_iso),
     _years as (
         select t1.*, t2.*
         from
             (
                 select fac.year from forestareachange fac
                 union
                 select ar.year from annualreforestation ar
                 order by 1
             ) as t1
                 full join
             (select c.* from country as c) as t2
             on true
         order by 2, 1
     )
select r.regions,
       cc.country_iso,
       y.year,
       boreal,
       temperate,
       tropical,
       sub_tropical as subtropical,
       forest_expansion as "1d_expansion",
       afforestation as "1d_afforestation",
       natural_expansion as "1d_nat_exp",
       deforestation as "1d_deforestation",
        reforestation as "1e_reforestation"
from ${schemaCycle}.country cc
         join _regions r using (country_iso)
         join _years y using (country_iso)
         join climaticdomain c using (country_iso)
         left join annualreforestation ar using (country_iso, year)
         left join forestareachange fac using (country_iso, year)
        where cc.country_iso not ilike 'X%'
    `,
    []
  )
}

const getFraYearsData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Array<Record<string, string>>> => {
  const { assessment, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.many<Record<string, string>>(getFraYearsDataQuery(schemaCycle))
}

export const BulkDownload = {
  getAnnualData,
  getIntervalData,
  getFraYearsData,
}
