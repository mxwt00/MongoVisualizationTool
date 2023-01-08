package com.databaseModeling.Server.controller;

import com.databaseModeling.Server.dto.MongoDBConnectionDto;
import com.databaseModeling.Server.model.MongoDBModel.Table;

import java.util.ArrayList;
import java.util.List;

public class MongoDBUtil {

    public static List<Table> getTables(MongoDBConnectionDto connectionDto) {
        try (MongoClient mongoClient = MongoClients.create(connectionDto.getConnectionString())) {
            MongoDatabase database = mongoClient.getDatabase(connectionDto.getDbName());
            ListCollectionsIterable<Document> collections = database.listCollections();
            List<Table> tables = new ArrayList<>();
            for (Document document : collections) {
                Table table = new Table();
                table.keys = document.keySet();
                tables.add(table);
            }
            return tables;
        }
    }

    private void getConnection(MongoDBConnectionDto connectionDto) {
    }
}
