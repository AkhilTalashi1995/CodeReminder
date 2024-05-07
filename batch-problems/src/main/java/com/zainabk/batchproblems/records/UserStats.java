package com.zainabk.batchproblems.records;
import java.util.List;

public record UserStats(
        String user_name,
        int num_solved,
        int num_total,
        int ac_easy,
        int ac_medium,
        int ac_hard,
        List<StatStatusPair> stat_status_pairs
) {}