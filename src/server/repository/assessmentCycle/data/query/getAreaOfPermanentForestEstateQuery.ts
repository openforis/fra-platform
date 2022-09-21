export const getAreaOfPermanentForestEstateQuery = (schemaCycle: string) => `
    select country_iso,
           case when col_name != 'applicable' then col_name end as year,
           x.applicable,
           max(case when variable_name = 'area_of_permanent_forest_estate' and  col_name != 'applicable' then value ->> 'raw' end) as area_of_permanent_forest_estate
    from ${schemaCycle}.areaofpermanentforestestate
             inner join (select country_iso, case when col_name = 'applicable' then value ->> 'raw' end as applicable
                         from ${schemaCycle}.areaofpermanentforestestate
                         where col_name = 'applicable') x using (country_iso)
    where variable_name in (
        'area_of_permanent_forest_estate'
        )
      and col_name != 'applicable'
    group by 1, 2, 3
`
