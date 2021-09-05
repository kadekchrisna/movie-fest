create table account
(
    account_id         int auto_increment
        primary key,
    account_name       varchar(150) default ''                null,
    account_email      varchar(150) default ''                not null,
    account_password   varchar(255) default ''                not null,
    account_created_at timestamp    default CURRENT_TIMESTAMP null
);

create index idx_account_email
    on account (account_email);

create table artist
(
    artist_id   int auto_increment
        primary key,
    artist_name varchar(255) default '' not null
);

create index idx_artist_name
    on artist (artist_name);

create table genre
(
    genre_id   int auto_increment
        primary key,
    genre_name varchar(255) default '' not null
);

create index idx_genre_name
    on genre (genre_name);

create table movie
(
    movie_id         int auto_increment
        primary key,
    movie_title      varchar(255) default ''                not null,
    movie_desc       text                                   not null,
    movie_duration   bigint       default 0                 not null,
    movie_created_at timestamp    default CURRENT_TIMESTAMP null,
    movie_updated_at timestamp                              null
);

create index idx_movie_title
    on movie (movie_title);

create table movie_artist
(
    movie_artist_id        int auto_increment
        primary key,
    movie_artist_movie_id  int default 0 not null,
    movie_artist_artist_id int default 0 not null
);

create index idx_movie_artist_artist_id
    on movie_artist (movie_artist_artist_id);

create index idx_movie_artist_movie_id
    on movie_artist (movie_artist_artist_id);

create table movie_genre
(
    movie_genre_id       int auto_increment
        primary key,
    movie_genre_movie_id int default 0 not null,
    movie_genre_genre_id int default 0 not null
);

create index idx_movie_genre_genre_id
    on movie_genre (movie_genre_genre_id);

create index idx_movie_genre_movie_id
    on movie_genre (movie_genre_movie_id);

create table movie_views
(
    movie_views_id         int auto_increment
        primary key,
    movie_views_movie_id   int       default 0                 not null,
    movie_views_account_id int       default 0                 not null,
    movie_views_created_at timestamp default CURRENT_TIMESTAMP null
);

create index idx_movie_views_account_id
    on movie_views (movie_views_account_id);

create index idx_movie_views_movie_id
    on movie_views (movie_views_movie_id);

create table movie_votes
(
    movie_votes_id         int auto_increment
        primary key,
    movie_votes_movie_id   int default 0 not null,
    movie_votes_account_id int default 0 null
);

create index idx_movie_votes_account_id
    on movie_votes (movie_votes_account_id);

create index idx_movie_votes_movie_id
    on movie_votes (movie_votes_movie_id);

