package com.zainabk.batchproblems.records;

public record StatStatusPair(
        Stat stat,
        String status,
        Difficulty difficulty,
        boolean paid_only,
        boolean is_favor,
        int frequency,
        int progress
) {}
