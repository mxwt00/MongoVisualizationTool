from flask import Flask
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


@app.route("/")
def hello_world():
    mongodb_client = MongoClient("mongodb+srv://mvt:mvt@testcluster.biadm2g.mongodb.net/?retryWrites=true&w=majority")
    database = mongodb_client["sample_mflix"]
    collection_names = database.list_collection_names()
    tables = list()

    for name in collection_names:
        collection = database.get_collection(name)
        doc = collection.find()

        keys = list()
        for x in doc:
            print(x.keys)
            keys.append(x.keys)

        table = Table(name, keys)
        tables.append(table)

    mongodb_client.close()
    return tables
