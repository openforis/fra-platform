import { BaseProtocol } from '../../src/server/db'

export const migrateUsers = async (props: { client: BaseProtocol }): Promise<void> => {
  const { client } = props

  await client.query(
    `
        delete
        from _legacy.user_country_role
        where user_id = (
            select id
            from _legacy.fra_user
            where email = 'akabroj2@yahoo.fr'
              and lang = 'en'
        );
        delete
        from _legacy.fra_user
        where email = 'akabroj2@yahoo.fr'
          and lang = 'en';

        update _legacy.fra_audit
        set user_login_email = 'agrimediambient@gmail.com'
        where user_email = 'agrimediambient@ordino.ad';

        update _legacy.fra_user
        set name        = 'Sergi Riba Mazas',
            position    = 'Agriculture, Environment and sustainibility Department Chief',
            institution = 'Comú of Ordino'
        where login_email = 'agrimediambient@gmail.com';

        delete
        from _legacy.user_country_role
        where user_id = (
            select id
            from _legacy.fra_user
            where login_email = 'agrimediambient@ordino.ad'
        );
        delete
        from _legacy.fra_user
        where login_email = 'agrimediambient@ordino.ad';

        delete
        from users;

        insert into users (email, profile_picture_file, profile_picture_filename, status, props)
        select u_l.email,
               u_l.profile_picture_file,
               u_l.profile_picture_filename,
               case
                   when u_l.active then 'active'::users_status
                   else 'invitationPending'::users_status
                   end as status,
               jsonb_build_object('name', u_l.name, 'institution', u_l.institution, 'lang', u_l.lang, 'position', u_l.position) as props
        from _legacy.fra_user u_l;
    `
  )
}
