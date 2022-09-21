export const getRegionsQuery = (schemaCycle: string) => {
  return `
     select cr.country_iso, array_to_string(ARRAY_AGG(distinct cr.region_code), ';') as regions
     from ${schemaCycle}.country_region cr
     group by cr.country_iso
     `
}
