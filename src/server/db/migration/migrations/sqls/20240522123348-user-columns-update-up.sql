/* Replace with your SQL commands */
alter table public.users
    add profile_picture_file_uuid uuid;

alter table public.users
    add constraint users_file_uuid_fk
        foreign key (profile_picture_file_uuid) references public.file (uuid);
alter table users drop column profile_picture_filename;
alter table users drop column profile_picture_file;
