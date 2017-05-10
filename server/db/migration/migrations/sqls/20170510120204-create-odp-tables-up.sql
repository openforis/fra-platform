ALTER TABLE country
  RENAME isoCode TO  country_iso;

ALTER TABLE country
    ADD PRIMARY KEY (country_iso);

create TABLE odp_version(
  id BIGSERIAL PRIMARY KEY,
  forest_area NUMERIC,
  year NUMERIC(4)
);

create table odp(
  id BIGSERIAL PRIMARY KEY,
  country_iso VARCHAR(3) REFERENCES country(country_iso) NOT NULL ,
  draft_id BIGINT REFERENCES odp_version (id),
  actual_id BIGINT REFERENCES odp_version (id)
);
