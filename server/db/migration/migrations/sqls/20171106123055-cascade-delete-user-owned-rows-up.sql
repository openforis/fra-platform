ALTER TABLE fra_comment DROP CONSTRAINT fra_comment_user_id_fkey;
ALTER TABLE fra_comment ADD CONSTRAINT fra_comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES fra_user(id) ON DELETE CASCADE;

ALTER TABLE user_issue DROP CONSTRAINT userissue_fk1;
ALTER TABLE user_issue ADD CONSTRAINT user_issue_user_id_fkey FOREIGN KEY (user_id) REFERENCES fra_user(id) ON DELETE CASCADE;
