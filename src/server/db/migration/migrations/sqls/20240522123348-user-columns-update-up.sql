-- do nothing if the column already exists
DO $$ BEGIN
    BEGIN
        ALTER TABLE public.users ADD COLUMN profile_picture_file_uuid UUID;
    EXCEPTION
        WHEN duplicate_column THEN RAISE NOTICE 'column profile_picture_file_uuid already exists in users.';
    END;
END $$;

-- do nothing if the constraint already exists
DO $$ BEGIN
    BEGIN
        ALTER TABLE public.users ADD CONSTRAINT users_file_uuid_fk FOREIGN KEY (profile_picture_file_uuid) REFERENCES public.file (uuid);
    EXCEPTION
        WHEN duplicate_object THEN RAISE NOTICE 'constraint users_file_uuid_fk already exists in users.';
    END;
END $$;

-- drop the columns if they exist
DO $$ BEGIN
    BEGIN
        ALTER TABLE public.users DROP COLUMN profile_picture_filename;
    EXCEPTION
        WHEN undefined_column THEN RAISE NOTICE 'column profile_picture_filename does not exist in users.';
    END;
END $$;

DO $$ BEGIN
    BEGIN
        ALTER TABLE public.users DROP COLUMN profile_picture_file;
    EXCEPTION
        WHEN undefined_column THEN RAISE NOTICE 'column profile_picture_file does not exist in users.';
    END;
END $$;

