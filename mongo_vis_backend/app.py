import json

from flask import Flask, request, Response
from flask_cors import CORS

from database_analysis import DatabaseAnalysis

app = Flask("Mongodb Visualization Tool")
CORS(app)


@app.post("/connect")
def get_tables_and_keys():
    connection_string = request.json.get("connection_string")
    database_name = request.json.get("database")
    analyse_ref = request.json.get("analyse_ref")
    sort_method = request.json.get("sort_method")

    db_analysis = DatabaseAnalysis(connection_string, database_name, analyse_ref, sort_method)
    connection_successful = db_analysis.connect()
    if not connection_successful:
        return Response(status=406)

    document_dict = db_analysis.analyse()

    return json.dumps(document_dict)
