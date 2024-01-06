DROP DATABASE IF EXISTS todolist;

CREATE DATABASE IF NOT EXISTS todolist CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE todolist;

CREATE TABLE IF NOT EXISTS user
(
    id         INT(10) unsigned NOT NULL auto_increment,
    name       VARCHAR(45)      NOT NULL,
    email      VARCHAR(80)      NOT NULL,
    password   VARCHAR(255)     NOT NULL,
    created_at DATETIME         NOT NULL DEFAULT NOW(),
    updated_at DATETIME         NOT NULL DEFAULT NOW(),
    deleted_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT user_unique_pk unique (email)
);

CREATE TABLE IF NOT EXISTS board
(
    id         INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    name       VARCHAR(50)            NOT NULL,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at DATETIME,
    CONSTRAINT id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS card
(
    id           INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id      INT(10) UNSIGNED NULL,
    description  VARCHAR(300) NOT NULL,
    position     INT(10) UNSIGNED NOT NULL,
    board_id     INT(10) UNSIGNED NOT NULL,
    created_at   DATETIME DEFAULT NOW() NOT NULL,
    updated_at   DATETIME DEFAULT NOW() NOT NULL,
    deleted_at   DATETIME,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT fk_card_board FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT fk_card_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE INDEX fk_board_id_idx ON card (board_id);

INSERT INTO board (name) VALUES ('TODO'), ('DOING'), ('DONE');
INSERT INTO card (description, position, board_id) VALUES ('Card criado no board TODO', 100, 1), ('Card criado no board DOING', 100, 2), ('Card criado no board DONE', 100, 3);


