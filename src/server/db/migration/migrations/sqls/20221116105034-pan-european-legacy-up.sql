/* Replace with your SQL commands */
DO $$
    BEGIN

        IF EXISTS(
                SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'pan_european'
            )
        THEN
            alter schema pan_european  RENAME TO _legacy_pan_european;
        END IF;

    END
$$;
