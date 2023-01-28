import collections.abc
import datetime

import bson

from processed_document import ProcessedDocument
from value import Value


def get_type(value):
    if value is None or type(value) is None:
        return "Null"
    if isinstance(value, str):
        return "String"
    if isinstance(value, bson.ObjectId):
        return "Object ID"
    if isinstance(value, bool):
        return "Boolean"
    if isinstance(value, (int, float, complex, bson.Decimal128)):
        return "Number"
    if isinstance(value, datetime.date):
        return "Date"
    if isinstance(value, collections.abc.Sequence):
        return "Array"
    if isinstance(value, dict):
        return "Embedded document"
    raise Exception(f"Type {type(value)} of value {value} is not identifiable!")


def extract_values(document):
    values = list()
    for key, value in zip(document, document.values()):
        val_type = get_type(value)
        ref = None
        value = Value(key, val_type, ref)
        values.append(value)
    return values


class ProcessedCollection:

    def __init__(self, name):
        self.documents = set()
        self.name = name

    def add_doc(self, document):
        values = extract_values(document)
        new_doc = ProcessedDocument(values)
        for doc in self.documents:
            if doc == new_doc:
                doc.count += 1
                return
        self.documents.add(new_doc)

    def sort_documents(self):
        self.documents = sorted(self.documents, key=lambda document: document.count, reverse=True)

    def to_dict(self):
        documents_dict = [document.to_dict() for document in self.documents]
        data = {
            "name": self.name,
            "documents": documents_dict
        }
        return data

    def __str__(self):
        s = f"{self.name}: \n"
        s += f"anzahl Dokumente: {len(self.documents)}\n"
        for document in self.documents:
            s += f"  {document}\n"

        return s
