import collections.abc
import datetime

import bson


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


class Value:
    def __init__(self, key, val_type, ref=None):
        self.key = key
        self.val_type = val_type
        self.ref = ref

    def to_dict(self):
        data = {
            "key": self.key,
            "type": self.val_type,
            "ref": self.ref
        }
        return data

    def __eq__(self, other):
        if self.key == other.key and self.val_type == other.val_type:
            return True
        return False

    def __hash__(self):
        return hash((self.key, self.val_type))


class ProcessedDocument:

    def __init__(self, values):
        self.values = values
        self.count = 1

    def __str__(self):
        return str(self.to_dict())

    def to_dict(self):
        values_dict = [value.to_dict() for value in self.values]
        data = {
            "values": values_dict,
            "count": self.count
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
