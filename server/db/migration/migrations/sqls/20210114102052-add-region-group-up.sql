
CREATE TABLE region_group
(
    id SERIAL PRIMARY KEY,
    name  VARCHAR NOT NULL,
    "order" INT   NOT NULL
);

INSERT INTO region_group(name, "order")
VALUES ('fra', 0),
       ('secondary', 1);


ALTER TABLE region
    ADD COLUMN region_group INT,
    ADD CONSTRAINT region_region_group_id_fk
        FOREIGN KEY (region_group) REFERENCES region_group (id);

UPDATE region
SET region_group = 1
WHERE region_code IN ('AS',
                          'EU',
                          'NA',
                          'OC',
                          'AT',
                          'AF',
                          'SA');

UPDATE region
SET region_group = 2
WHERE region_code NOT IN ('AS',
                          'EU',
                          'NA',
                          'OC',
                          'AT',
                          'AF',
                          'SA');

