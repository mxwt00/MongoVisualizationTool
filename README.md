# Database Toolkit

The Scope of the Project is building a broad toolset for databases.
Currently, it consists of a ER Modelling Tool And a MongoDB Visualisation Tool.
All tools share a react frontend, which is easily extensible to allow the creation of more tools.
The backends of the tools are separately developed and deployed via the microservice architecture.

## Building the ER Modelling Backend

Prequisites:

- Java 15: https://jdk.java.net/archive/

To build and run the ER Modelling Backend, run the following commands in the er_modelling_backend directory:

    mvn clean package
    java -jar ./target/Server-0.0.1-SNAPSHOT.jar


## Building the MongoDB Visualisation Backend

Prequisites:

- Python 3.10

To run the MongoDB Visualisation Backend, run the following commands in the mongo_vis_backend directory (in a virtual environment):

    pip -r requirements.txt
    python3 -m flask run

## Building the Frontend

Prequisites:

- Node/ NPM: https://nodejs.org/en/download/

To run the Frontend, run the following commands in the frontend directory:

    npm install
    npm start

## Developing additional Tools

If you want to add your own tool to the Database Toolkit, read the detailed documentation in the docs folder for further information.


