    insert into public.users (email, props) 
    values ('test@test.com', '{"lang": "en", "name": "Test User"}');

    insert into public.users_auth_provider (user_id, provider, props) 
    select id, 'local', '{"password": "$2b$10$EA1jG3Ddk/3Ee5dLH/W.QOi57paXmhz2vjZFNXExx15.sujp8PW5e"}' -- password123
    from public.users 
    where email = 'test@test.com';

    insert into public.users_role (user_uuid, role, props) 
    select uuid, 'ADMINISTRATOR', '{}' 
    from public.users 
    where email = 'test@test.com';
