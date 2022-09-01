-- Current descriptions are not unique, not in production yet, so let's nuke the data
DELETE FROM descriptions;

ALTER TABLE descriptions ADD CONSTRAINT unique_descriptions_for_country_name_section UNIQUE (country_iso, section, name);
