alter table original_data_point
    alter column data_source_additional_comments set default '';

alter table original_data_point
    alter column data_source_methods set default '{}'::jsonb;

alter table original_data_point
    alter column data_source_references set default '';

alter table original_data_point
    alter column description set default '';

alter table original_data_point
    alter column national_classes set default '[]'::jsonb;