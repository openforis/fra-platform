create schema _legacy;

alter table public._legacy_assessment set schema _legacy;
alter table public._legacy_fra_user set schema _legacy;
alter table public._legacy_odp set schema _legacy;
alter table public._legacy_odp_class set schema _legacy;
alter table public._legacy_odp_version set schema _legacy;


alter table _legacy._legacy_assessment rename to assessment;
alter table _legacy._legacy_fra_user rename to fra_user;
alter table _legacy._legacy_odp rename to odp;
alter table _legacy._legacy_odp_class rename to odp_class;
alter table _legacy._legacy_odp_version rename to odp_version;
