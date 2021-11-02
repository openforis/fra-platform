create materialized view _temp as
select a.id,
       jsonb_build_object(
               'odpIdLegacy', (a.target ->> 'odpId')::numeric,
               'odpId', odp.id
           ) as target,
       a.message
from fra_audit a
         left join original_data_point odp on (a.target ->> 'odpId')::numeric = odp.id_legacy
where section = 'odp'
order by a.id;


update fra_audit fa
set target = a.target
from _temp as a
where fa.id = a.id;

drop materialized view _temp;
