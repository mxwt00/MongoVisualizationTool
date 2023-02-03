from processed_document import ProcessedDocument


class ProcessedCollection:

    def __init__(self, name):
        self.documents = list()
        self.name = name

    def add_doc(self, document):
        new_doc = ProcessedDocument(document)
        for doc in self.documents:
            if doc == new_doc:
                doc.count += 1
                return
        self.documents.append(new_doc)

    def sort_documents(self):
        self.documents = sorted(self.documents, key=lambda document: document.count, reverse=True)

    def mark_additional_values(self):
        main_doc = self.documents[0]
        for i in range(1, len(self.documents)):
            for value in self.documents[i].values:
                if value not in main_doc.values:
                    value.is_additional = True

    def mark_missing_values(self):
        main_doc = self.documents[0]
        for i in range(1, len(self.documents)):
            for value in main_doc.values:
                if value not in self.documents[i].values:
                    self.documents[i].missing_values.append(value.key)

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
