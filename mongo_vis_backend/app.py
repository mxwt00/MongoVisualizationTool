import json

from flask import Flask, request, Response
from flask_cors import CORS

from database_analysis import DatabaseAnalysis

app = Flask("Mongodb Visualization Tool")
CORS(app)


@app.post("/connect")
def get_tables_and_keys():
    connection_string = request.json.get("connection_string")
    database = request.json.get("database")

    db_analysis = DatabaseAnalysis()
    connection_successful = db_analysis.connect(connection_string, database)
    if not connection_successful:
        return Response(status=406)

    document_dict = db_analysis.analyse()

    return json.dumps(document_dict)
