alter table users_role
	add invitation_uuid uuid;

alter table users_role
    add constraint users_role_users_invitation_uuid_fk
		foreign key (invitation_uuid) references users_invitation
			on update cascade on delete cascade;
