create table settings
(
    default_assessment_id bigint references public.assessment (id) on delete set null
);

insert into settings(default_assessment_id) values(null);
