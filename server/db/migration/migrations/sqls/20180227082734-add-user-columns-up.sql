ALTER TABLE
    fra_user ADD COLUMN institution CHARACTER VARYING(1024);

ALTER TABLE
    fra_user ADD COLUMN position CHARACTER VARYING(1024);
    
ALTER TABLE
    fra_user ADD COLUMN profile_picture_file bytea;
    
ALTER TABLE
    fra_user ADD COLUMN profile_picture_filename CHARACTER VARYING(1024);
