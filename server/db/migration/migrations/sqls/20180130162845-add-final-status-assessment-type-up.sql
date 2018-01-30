ALTER TYPE assessment_status RENAME TO _old_assessment_status;


CREATE TYPE assessment_status as ENUM ('editing', 'review', 'accepted', 'final');

ALTER TABLE assessment ALTER COLUMN status TYPE assessment_status USING status::text::assessment_status;

DROP TYPE _old_assessment_status;
