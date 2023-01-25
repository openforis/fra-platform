ALTER TABLE public.users DROP COLUMN name;
ALTER TABLE public.users DROP COLUMN institution;
ALTER TABLE public.users DROP COLUMN lang;
ALTER TABLE public.users DROP COLUMN position;
ALTER TABLE public.users ADD COLUMN props jsonb NOT NULL DEFAULT '{}'::jsonb;

--ALTER TABLE public.users_role RENAME COLUMN props TO permissions;
ALTER TABLE public.users_role ADD COLUMN info jsonb NOT NULL DEFAULT '{}'::jsonb;
