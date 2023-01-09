from flask import Flask, request
import pymongo
from pymongo import MongoClient
from json import JSONEncoder

app = Flask("Mongodb Visualization Tool")


class Table:
    keys = None
    name = ""

    def __init__(self, name, keys):
        self.keys = keys
        self.name = name

    def to_string(self):
        s = f"{self.name}"
        for key in self.keys:
            s += f"  {key}"
        return s


@app.post("/")
def get_tables_and_keys():
    connection_string = request.json.get("connection_string")
    database = request.json.get("database")
    mongodb_client = MongoClient(connection_string)
    database = mongodb_client[database]

    collection_names = database.list_collection_names()

    tables = list()
    for name in collection_names:
        collection = database.get_collection(name)
        doc = collection.find_one()
        keys = list()
        for key in doc:
            keys.append(key)
        table = Table(name, keys)
        tables.append(table.to_string())

    mongodb_client.close()
    print(tables)
    return tables
