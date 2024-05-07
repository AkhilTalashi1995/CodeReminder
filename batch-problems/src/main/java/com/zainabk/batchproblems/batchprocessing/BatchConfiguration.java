package com.zainabk.batchproblems.batchprocessing;

import com.zainabk.batchproblems.records.UserStats;
import org.springframework.context.annotation.Bean;

public class BatchConfiguration {

    @Bean
    public FlatFileItemReader<UserStats> reader() {
        return new FlatFileItemReaderBuilder<Person>()
                .name("personItemReader")
                .resource(new ClassPathResource("sample-data.csv"))
                .delimited()
                .names("firstName", "lastName")
                .targetType(Person.class)
                .build();
    }
}
