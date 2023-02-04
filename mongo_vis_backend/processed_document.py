import datetime

import bson

from value import analyse_values


class ProcessedDocument:

    def __init__(self, document):
        self.values = analyse_values(document)
        self.count = 1
        self.document_ages = list()
        _id = document.get("_id")
        if isinstance(_id, bson.ObjectId):
            document_generation_time = document.get("_id").generation_time
            document_age = (datetime.datetime.now(datetime.timezone.utc) - document_generation_time).total_seconds()
            self.document_ages.append(document_age)
        self.avg_age = None
        self.missing_values = list()
        self.original_documents = list()
        self.original_documents.append(document)

    def __str__(self):
        return str(self.to_dict())

    def to_dict(self):
        values_dict = [value.to_dict() for value in self.values]
        data = {
            "values": values_dict,
            "count": self.count,
            "missing_values": self.missing_values,
            "avg_age": self.avg_age
        }
        return data

    def __eq__(self, other):
        values_count = len(self.values)
        if values_count != len(other.values):
            return False

        for i in range(values_count):
            if self.values[i] != other.values[i]:
                return False
        return True

    def __hash__(self):
        return hash(tuple(self.values))
