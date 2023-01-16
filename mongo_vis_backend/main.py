import pymongo.errors
from flask import Flask, request, Response
from pymongo import MongoClient
from flask_cors import CORS
import json

app = Flask("Mongodb Visualization Tool")
CORS(app)


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

    def to_dict(self):
        data = {
            "name": self.name,
            "keys": self.keys
        }
        return data


@app.post("/connect")
def get_tables_and_keys():
    connection_string = request.json.get("connection_string")
    database = request.json.get("database")

    try:
        mongodb_client = MongoClient(connection_string, serverSelectionTimeoutMS=5000)
        database = mongodb_client[database]
    except pymongo.errors.ServerSelectionTimeoutError:
        return Response(status=406)


    collection_names = database.list_collection_names()

    tables_dict = {"tables": []}
    for name in collection_names:
        collection = database.get_collection(name)
        doc = collection.find_one()
        keys = list()
        for key in doc:
            keys.append(key)
        table = Table(name, keys)
        tables_dict["tables"].append(table.to_dict())

    mongodb_client.close()
    return json.dumps(tables_dict)
