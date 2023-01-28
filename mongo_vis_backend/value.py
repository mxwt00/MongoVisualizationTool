class Value:
    def __init__(self, key, val_type, ref=None, nested_document=None):
        self.key = key
        self.val_type = val_type
        self.ref = ref
        self.nested_document = nested_document

    def to_dict(self):
        values_dict = None
        if self.nested_document is not None:
            values_dict = [value.to_dict() for value in self.nested_document]
        data = {
            "key": self.key,
            "type": self.val_type,
            "ref": self.ref,
            "nested_document": values_dict
        }
        return data

    def __eq__(self, other):
        # TODO Nested document in eq einbauen
        if self.key == other.key and self.val_type == other.val_type:
            return True
        return False

    def __hash__(self):
        return hash((self.key, self.val_type))
