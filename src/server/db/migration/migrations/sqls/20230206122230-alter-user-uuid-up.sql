alter table
    public.users
add column
    uuid uuid default (uuid_generate_v4());
