DROP VIEW IF EXISTS holder_of_management_rights_view CASCADE;
CREATE VIEW
    holder_of_management_rights_view AS
(
SELECT *
FROM holder_of_management_rights h
WHERE h.row_name <> 'other'
UNION
SELECT public_total.country_iso,
       'other'                                                                    AS row_name,
       CASE
           WHEN public_total."1990" IS NULL AND public."1990" IS NULL AND individuals."1990" IS NULL AND
                private."1990" IS NULL AND communities."1990" IS NULL THEN NULL
           ELSE coalesce(public_total."1990", 0) - coalesce(public."1990", 0) - coalesce(individuals."1990", 0) -
                coalesce(private."1990", 0) - coalesce(communities."1990", 0) END AS "1990",
       CASE
           WHEN public_total."2000" IS NULL AND public."2000" IS NULL AND individuals."2000" IS NULL AND
                private."2000" IS NULL AND communities."2000" IS NULL THEN NULL
           ELSE coalesce(public_total."2000", 0) - coalesce(public."2000", 0) - coalesce(individuals."2000", 0) -
                coalesce(private."2000", 0) - coalesce(communities."2000", 0) END AS "2000",
       CASE
           WHEN public_total."2010" IS NULL AND public."2010" IS NULL AND individuals."2010" IS NULL AND
                private."2010" IS NULL AND communities."2010" IS NULL THEN NULL
           ELSE coalesce(public_total."2010", 0) - coalesce(public."2010", 0) - coalesce(individuals."2010", 0) -
                coalesce(private."2010", 0) - coalesce(communities."2010", 0) END AS "2010",
       CASE
           WHEN public_total."2015" IS NULL AND public."2015" IS NULL AND individuals."2015" IS NULL AND
                private."2015" IS NULL AND communities."2015" IS NULL THEN NULL
           ELSE coalesce(public_total."2015", 0) - coalesce(public."2015", 0) - coalesce(individuals."2015", 0) -
                coalesce(private."2015", 0) - coalesce(communities."2015", 0) END AS "2015"
FROM forest_ownership public_total
LEFT JOIN holder_of_management_rights public
ON public_total.country_iso = public.country_iso
    AND public.row_name = 'public_administration'

LEFT JOIN holder_of_management_rights individuals
ON public_total.country_iso = individuals.country_iso
    AND individuals.row_name = 'individuals'

LEFT JOIN holder_of_management_rights private
ON public_total.country_iso = private.country_iso
    AND private.row_name = 'private_businesses'

LEFT JOIN holder_of_management_rights communities
ON public_total.country_iso = communities.country_iso
    AND communities.row_name = 'communities'

WHERE public_total.row_name = 'public_ownership'
ORDER BY 1, 2
    )
;
