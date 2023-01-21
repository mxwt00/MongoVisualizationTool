import collections.abc
import datetime

import bson
import pymongo.errors
from flask import Flask, request, Response
from pymongo import MongoClient
from flask_cors import CORS
import json

app = Flask("Mongodb Visualization Tool")
CORS(app)


class TypeNotIdentifiableException(Exception):
    def __int__(self, value, message, errors):
        self.value = value
        message = f"Type {type(value)} of value {value} is not identifiable!"
        super().__init__(self.message)
        self.errors = errors


class Value:
    def __init__(self, key, val_type):
        self.key = key
        self.val_type = val_type

    def to_dict(self):
        data = {
            "key": self.key,
            "type": self.val_type
        }
        return data


class ProcessedDocument:
    values = None
    name = ""

    def __init__(self, name, values):
        self.values = values
        self.name = name

    def to_string(self):
        s = f"{self.name}"
        for value in self.values:
            s += f"  {value.key}  {value.type}"
        return s

    def to_dict(self):
        values_dict = [value.to_dict() for value in self.values]
        data = {
            "name": self.name,
            "values": values_dict
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

    docs_dict = {"documents": []}
    for name in collection_names:
        collection = database.get_collection(name)
        document = collection.find_one()

        values = extract_values(document)

        processed_doc = ProcessedDocument(name, values)
        docs_dict["documents"].append(processed_doc.to_dict())

    mongodb_client.close()
    return json.dumps(docs_dict)


def extract_values(document):
    values = list()
    for key, value in zip(document, document.values()):
        val_type = get_type(value)
        value = Value(key, val_type)
        values.append(value)
    return values


def get_type(value):
    if value is None or type(value) is None:
        return "Null"
    if isinstance(value, str):
        return "String"
    if isinstance(value, bson.ObjectId):
        return "Object ID"
    if isinstance(value, bool):
        return "Boolean"
    if isinstance(value, (int, float, complex)):
        return "Number"
    if isinstance(value, datetime.date):
        return "Date"
    if isinstance(value, collections.abc.Sequence):
        return "Array"
    if isinstance(value, dict):
        return "Embedded document"
    raise Exception(f"Type {type(value)} of value {value} is not identifiable!")
