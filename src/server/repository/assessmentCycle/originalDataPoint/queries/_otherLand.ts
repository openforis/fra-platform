export const getOtherLand = (colValue: string): string => {
  return `case
                 when (${colValue} ->> 'forestArea')::numeric is not null or
                      (${colValue} ->> 'otherWoodedLand')::numeric is not null then
                     (tla.value)::double precision -
                     coalesce((${colValue} ->> 'forestArea')::numeric, 0)::double precision -
                     coalesce((${colValue} ->> 'otherWoodedLand')::numeric, 0)::double precision
          end                                                                      as other_land`
}
