export const getYearsQuery = (schemaCycle: string) => {
  return `
      select country_iso, col_name as year
      from (select fc.col_name
            from ${schemaCycle}.forestcharacteristics fc
            union
            select eof.col_name
            from ${schemaCycle}.extentofforest eof
            order by 1) as t1
               full join
               (select c.* from public.country as c) as t2
               on true
      where col_name in ('1990', '2000', '2010', '2015', '2020')
      order by 2, 1
      `
}
