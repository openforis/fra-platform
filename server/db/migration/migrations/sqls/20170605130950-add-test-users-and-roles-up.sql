INSERT INTO fra_user (email, name) VALUES ('jan.egeland@mailinator.com', 'Jan Egeland');
INSERT INTO user_country_role
(user_id, country_iso, role)
VALUES
((SELECT last_value FROM fra_user_id_seq), 'ITA', 'REVIEWER');

INSERT INTO fra_user (email, name) VALUES ('frank.bonneville@mailinator.com', 'Frank Bonneville');
INSERT INTO user_country_role
(user_id, country_iso, role)
VALUES
((SELECT last_value FROM fra_user_id_seq), 'ITA', 'REVIEWER');
