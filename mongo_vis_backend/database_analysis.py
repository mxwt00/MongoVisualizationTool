import pymongo
import pymongo.errors
from pymongo import MongoClient

from processed_collection import ProcessedCollection


class DatabaseAnalysis:
    def __init__(self, connection_string, database_name, analyse_ref, sort_method):
        self.database_name = database_name
        self.connection_string = connection_string
        self.analyse_ref = analyse_ref
        self.sort_method = sort_method
        self.collection_names = None
        self.database = None
        self.mongodb_client = None

    def connect(self):
        try:
            self.mongodb_client = MongoClient(self.connection_string, serverSelectionTimeoutMS=5000)
            self.database = self.mongodb_client[self.database_name]
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

            processed_collection.post_processing(sort_method=self.sort_method)
            docs_dict["collections"].append(processed_collection.to_dict())
        self.mongodb_client.close()
        return docs_dict

    def get_referenced_collection(self, _id):
        for collection_name in self.collection_names:
            collection = self.database.get_collection(collection_name)
            document = collection.find_one({"_id": _id})
            if document is not None:
                return collection_name
        return None
