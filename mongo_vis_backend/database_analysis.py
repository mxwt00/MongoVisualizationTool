import collections.abc
import datetime

import bson
import pymongo
import pymongo.errors
from pymongo import MongoClient

from processed_document import ProcessedDocument, Value


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


class DatabaseAnalysis:
    def __init__(self):
        self.collection_names = None
        self.database = None
        self.mongodb_client = None

    def connect(self, connection_string, database):
        try:
            self.mongodb_client = MongoClient(connection_string, serverSelectionTimeoutMS=5000)
            self.database = self.mongodb_client[database]
        except pymongo.errors.ServerSelectionTimeoutError:
            return False
        return True

    def analyse(self):
        self.collection_names = self.database.list_collection_names()
        docs_dict = {"documents": []}
        for name in self.collection_names:
            collection = self.database.get_collection(name)
            document = collection.find_one()

            values = self.extract_values(document)

            processed_doc = ProcessedDocument(name, values)
            docs_dict["documents"].append(processed_doc.to_dict())

        self.mongodb_client.close()
        return docs_dict

    def extract_values(self, document):
        values = list()
        for key, value in zip(document, document.values()):
            val_type = get_type(value)
            # if val_type == "Object ID" and key != "_id":
                # self.get_referenced_collection(value)

            value = Value(key, val_type)
            values.append(value)
        return values

    # def get_referenced_collection(self, id):
