from processed_document import ProcessedDocument


class ProcessedCollection:

    def __init__(self, name):
        self.documents = set()
        self.name = name

    def add_doc(self, document):
        new_doc = ProcessedDocument(document)
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
