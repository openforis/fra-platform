--ALTER TABLE public.users_role RENAME COLUMN props TO permissions;
ALTER TABLE public.users_role ADD COLUMN info jsonb NOT NULL DEFAULT '{}'::jsonb;
