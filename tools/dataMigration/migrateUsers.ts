import { BaseProtocol } from '../../server/db'

export const migrateUsers = async (props: { client: BaseProtocol }): Promise<void> => {
  const { client } = props

  await client.query(
    `
        delete
        from user_country_role
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

        update fra_audit
        set user_login_email = 'agrimediambient@gmail.com'
        where user_email = 'agrimediambient@ordino.ad';

        update _legacy.fra_user
        set name        = 'Sergi Riba Mazas',
            position    = 'Agriculture, Environment and sustainibility Department Chief',
            institution = 'Comú of Ordino'
        where login_email = 'agrimediambient@gmail.com';

        delete
        from user_country_role
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

        insert into users (institution, lang, profile_picture_filename, name, status, profile_picture_file, position,
                           email)
        select u_l.institution,
               u_l.lang,
               u_l.profile_picture_filename,
               u_l.name,
               case
                   when u_l.active then 'active'::users_status
                   else 'invitationPending'::users_status
                   end as status,
               u_l.profile_picture_file,
               u_l.position,
               u_l.email
        from _legacy.fra_user u_l;
    `
  )
}
