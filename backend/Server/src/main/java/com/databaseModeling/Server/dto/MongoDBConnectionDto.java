package com.databaseModeling.Server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MongoDBConnectionDto {
    private String connectionString;
    private String username;
    private String password;
    private String dbName;
}

