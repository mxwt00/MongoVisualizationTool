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
                doc.document_ages.append(new_doc.document_ages[0])
                doc.original_documents.append(new_doc.original_documents[0])
                return
        self.documents.append(new_doc)

    def post_processing(self, sort_method):
        self.calc_document_averages()
        self.sort_documents(sort_method)
        self.mark_additional_values()
        self.mark_missing_values()

    def calc_document_averages(self):
        for document in self.documents:
            document.avg_age = sum(document.document_ages) / len(document.document_ages)

    def sort_documents(self, sort_method):
        if sort_method == "documentCount":
            self.documents = sorted(self.documents, key=lambda document: document.count, reverse=True)
        elif sort_method == "avgAge":
            self.documents = sorted(self.documents, key=lambda document: document.avg_age, reverse=True)

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
