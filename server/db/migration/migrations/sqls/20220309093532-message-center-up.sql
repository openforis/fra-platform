CREATE TYPE public.message_topic_status AS ENUM
    ('opened', 'resolved');

CREATE SEQUENCE message_topic_id_seq INCREMENT 1 START 1;

CREATE TABLE IF NOT EXISTS public.message_topic
(
    id bigint NOT NULL DEFAULT nextval('message_topic_id_seq'::regclass),
    country_iso character varying(3) COLLATE pg_catalog."default" NOT NULL,
    assessment_id bigint NOT NULL,
    cycle_uuid uuid NOT NULL,
    key character varying(256) COLLATE pg_catalog."default" NOT NULL,
    status message_topic_status DEFAULT 'opened'::message_topic_status,
    CONSTRAINT message_topic_pkey PRIMARY KEY (id),
    CONSTRAINT message_topic_assessment_id_fkey FOREIGN KEY (assessment_id)
        REFERENCES public.assessment (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT message_topic_country_iso_fkey FOREIGN KEY (country_iso)
        REFERENCES public.country (country_iso) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT message_topic_cycle_uuid_fkey FOREIGN KEY (cycle_uuid)
        REFERENCES public.assessment_cycle (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.message
(
    id bigint NOT NULL,
    topic_id bigint NOT NULL,
    user_id bigint NOT NULL,
    message text COLLATE pg_catalog."default",
    deleted boolean DEFAULT false,
    created_time timestamp with time zone DEFAULT now(),
    CONSTRAINT message_pkey PRIMARY KEY (id),
    CONSTRAINT message_topic_id_fkey FOREIGN KEY (topic_id)
        REFERENCES public.message_topic (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.message_topic_user
(
    topic_id bigint NOT NULL,
    user_id bigint NOT NULL,
    last_open_time timestamp with time zone DEFAULT now(),
    CONSTRAINT message_topic_user_topic_id_fkey FOREIGN KEY (topic_id)
        REFERENCES public.message_topic (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT message_topic_user_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
