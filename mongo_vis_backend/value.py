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
