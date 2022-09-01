update original_data_point o
set data_source_methods = d.data_source_methods
from (
         select id, data_source_methods -> 'methods' as data_source_methods from original_data_point
     ) as d
where o.id = d.id
