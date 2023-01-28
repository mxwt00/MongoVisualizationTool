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


class ProcessedDocument:
    values = None
    name = ""

    def __init__(self, name, values):
        self.values = values
        self.name = name

    def __str__(self):
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
