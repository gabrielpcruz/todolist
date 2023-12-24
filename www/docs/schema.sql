CREATE DATABASE IF NOT EXISTS todolist CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS board
(
    id         INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    name       VARCHAR(50)            NOT NULL,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    updated_at DATETIME DEFAULT NOW() NOT NULL,
    deleted_at DATETIME,
    CONSTRAINT id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS card
(
    id           INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    description  VARCHAR(300) NOT NULL,
    position     INT(10) UNSIGNED NOT NULL,
    board_id     INT(10) UNSIGNED NOT NULL,
    created_at   DATETIME DEFAULT NOW() NOT NULL,
    updated_at   DATETIME DEFAULT NOW() NOT NULL,
    deleted_at   DATETIME,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT fk_card_board FOREIGN KEY (board_id) REFERENCES board (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE INDEX fk_board_id_idx ON card (board_id);
