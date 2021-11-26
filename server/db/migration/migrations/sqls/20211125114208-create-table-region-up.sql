/* Replace with your SQL commands */

CREATE TABLE public.region(
    region_code text not null constraint region_pkey primary key,
    name text
);

INSERT INTO public.region SELECT region_code, name FROM _legacy.region;
