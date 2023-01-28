import pymongo
import pymongo.errors
from pymongo import MongoClient

from processed_collection import ProcessedCollection


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
        docs_dict = {"collections": []}
        for name in self.collection_names:
            processed_collection = ProcessedCollection(name)
            collection = self.database.get_collection(name)
            documents = collection.find({})
            for document in documents:
                processed_collection.add_doc(document)

            docs_dict["collections"].append(processed_collection.to_dict())

        self.mongodb_client.close()
        return docs_dict

    def get_referenced_collection(self, id_):
        for collection_name in self.collection_names:
            collection = self.database.get_collection(collection_name)
            document = collection.find_one({"id_": id_})
            if document is not None:
                return collection_name
        return None
