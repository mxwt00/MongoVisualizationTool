from value import analyse_values


class ProcessedDocument:

    def __init__(self, document):
        self.values = analyse_values(document)
        self.count = 1
        self.missing_values = list()

    def __str__(self):
        return str(self.to_dict())

    def to_dict(self):
        values_dict = [value.to_dict() for value in self.values]
        data = {
            "values": values_dict,
            "count": self.count,
            "missing_values": self.missing_values
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
