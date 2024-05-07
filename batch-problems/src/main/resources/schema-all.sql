CREATE TABLE IF NOT EXISTS user_stats (
                                          id INT PRIMARY KEY AUTO_INCREMENT,
                                          user_name VARCHAR(255) NOT NULL,
    num_solved INT NOT NULL,
    num_total INT NOT NULL,
    ac_easy INT NOT NULL,
    ac_medium INT NOT NULL,
    ac_hard INT NOT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS stat_status_pairs (
                                                 id INT PRIMARY KEY AUTO_INCREMENT,
                                                 user_stats_id INT NOT NULL,
                                                 question_id INT NOT NULL,
                                                 question_article_live VARCHAR(255),
    question_article_slug VARCHAR(255),
    question_article_has_video_solution BOOLEAN,
    question_title VARCHAR(255) NOT NULL,
    question_title_slug VARCHAR(255) NOT NULL,
    question_hide BOOLEAN,
    total_acs INT NOT NULL,
    total_submitted INT NOT NULL,
    frontend_question_id INT NOT NULL,
    is_new_question BOOLEAN,
    status VARCHAR(255),
    difficulty_level INT NOT NULL,
    paid_only BOOLEAN,
    is_favor BOOLEAN,
    frequency INT,
    progress INT,
    FOREIGN KEY (user_stats_id) REFERENCES user_stats(id)
    );
