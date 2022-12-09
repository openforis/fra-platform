ALTER TABLE geo.forest_estimations 
    ADD CONSTRAINT forest_estimations_un 
    UNIQUE (country_iso,"year");