ALTER TABLE public.users_role ADD COLUMN permissions jsonb NOT NULL DEFAULT '{}'::jsonb;
