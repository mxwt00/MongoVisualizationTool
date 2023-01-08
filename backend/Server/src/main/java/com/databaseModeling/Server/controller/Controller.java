package com.databaseModeling.Server.controller;

import com.databaseModeling.Server.dto.ConceptionalModelDto;
import com.databaseModeling.Server.dto.MongoDBConnectionDto;
import com.databaseModeling.Server.dto.RelationalModelDto;
import com.databaseModeling.Server.model.MongoDBModel.Table;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {


    @GetMapping("/index")
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000", "https://dbmodelling.herokuapp.com"})
    public String index() {

        return "INDEX";
    }


    /**
     * Endpoint to convert an entity relationship model to a relational model
     * @param type The entity relationship model
     * @return The relational model
     */
    @PostMapping("/convert/relational")
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000", "https://dbmodelling.herokuapp.com"})
    public RelationalModelDto convertToRelational(
            @RequestBody ConceptionalModelDto type)
    {



        ErToRelationalModelTransformer transformer = new ErToRelationalModelTransformer();
        return transformer.transform(type);

    }

    /**
     * Endpoint to generate sql from a relational model
     * @param type The relational model
     * @return The generated sql
     */
    @PostMapping("/convert/sql")
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000", "https://dbmodelling.herokuapp.com"})
    public String convertToSql(
            @RequestBody RelationalModelDto type)
    {



        RelationalModelToSqlTranslator sqlTranslator = new RelationalModelToSqlTranslator();
        return sqlTranslator.translate(type);
    }

    /**
     * Endpoint for getting the tables of a MongoDB
     */
    @PostMapping("/mongodb/tables")
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000", "https://dbmodelling.herokuapp.com"})
    public String getMongoDbTables(@RequestBody MongoDBConnectionDto mongoDBBConnectionDTO) {
        /*
        List<Table> tables = MongoDBUtil.getTables(mongoDBBConnectionDTO);
        StringBuilder r = new StringBuilder();
        for (Table table: tables) {
            for (String key :table.keys) {
                r.append(key);
                r.append("\n");
            }
            r.append("\n");
        }
        return r.toString();

         */
        return "test working";
    }


}

