ALTER TABLE public.users DROP COLUMN name;
ALTER TABLE public.users DROP COLUMN institution;
ALTER TABLE public.users DROP COLUMN lang;
ALTER TABLE public.users DROP COLUMN position;
ALTER TABLE public.users ADD COLUMN props jsonb NOT NULL DEFAULT '{}'::jsonb;
