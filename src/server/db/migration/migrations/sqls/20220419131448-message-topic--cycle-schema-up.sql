create type message_topic_type as enum ('review', 'chat', 'messageBoard');

drop table if exists message_topic_user cascade;
drop table if exists message cascade;
drop table if exists message_topic cascade;
