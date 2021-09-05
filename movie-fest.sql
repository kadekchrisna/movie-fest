create table movie
(
    movie_id         int auto_increment
        primary key,
    movie_title      varchar(255) default ''                not null,
    movie_desc       text                                   not null,
    movie_duration   varchar(50)  default ''                not null,
    movie_created_at timestamp    default CURRENT_TIMESTAMP null,
    movie_updated_at timestamp                              null
);

