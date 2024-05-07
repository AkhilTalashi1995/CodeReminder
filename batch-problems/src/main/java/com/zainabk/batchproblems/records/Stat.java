package com.zainabk.batchproblems.records;

public record Stat(
        int question_id,
        String question__article__live,
        String question__article__slug,
        Boolean question__article__has_video_solution,
        String question__title,
        String question__title_slug,
        boolean question__hide,
        int total_acs,
        int total_submitted,
        int frontend_question_id,
        boolean is_new_question
) {}