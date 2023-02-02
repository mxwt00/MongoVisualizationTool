import collections.abc
import datetime

import bson


def analyse_values(document):
    values = list()
    for key, value in zip(document, document.values()):
        value = Value(key, value)
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
    if isinstance(value, (int, float, complex, bson.Decimal128)):
        return "Number"
    if isinstance(value, datetime.date):
        return "Date"
    if isinstance(value, collections.abc.Sequence):
        return "Array"
    if isinstance(value, dict):
        return "Embedded document"
    raise Exception(f"Type {type(value)} of value {value} is not identifiable!")
# TODO Add additional types


class Value:
    def __init__(self, key, raw_value):
        self.key = key
        self.ref = None
        self.nested_document = None
        self.array_values = None
        self.val_type = get_type(raw_value)
        if self.val_type == "Embedded document":
            self.nested_document = analyse_values(raw_value)
        elif self.val_type == "Array":
            self.analyse_array(raw_value)

    def analyse_array(self, raw_value):
        self.array_values = set()
        for arr_element in raw_value:
            array_value = Value(None, arr_element)
            self.add_array_value(array_value)

    def add_array_value(self, new_array_value):
        for array_value in self.array_values:
            if array_value == new_array_value:
                return
        self.array_values.add(new_array_value)

    def to_dict(self):
        values_dict = None
        if self.nested_document is not None:
            values_dict = [value.to_dict() for value in self.nested_document]
        array_dict = None
        if self.array_values is not None:
            array_dict = [value.to_dict() for value in self.array_values]
        data = {
            "key": self.key,
            "type": self.val_type,
            "ref": self.ref,
            "nested_document": values_dict,
            "array_values": array_dict,
        }
        return data

    def __eq__(self, other):
        # TODO Nested document in eq einbauen
        if self.key == other.key and self.val_type == other.val_type:
            return True
        return False

    def __hash__(self):
        return hash((self.key, self.val_type))
