ALTER TABLE
    user_issue DROP CONSTRAINT userissue_fk2;

ALTER TABLE
    user_issue ADD CONSTRAINT userissue_fk2 FOREIGN KEY ("issue_id")
    REFERENCES issue ("id")
    ON
        DELETE
        CASCADE;
