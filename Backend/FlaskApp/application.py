import os
import json
from flask import Flask, request
from flask_cors import CORS
from flask_restless import manager
from flask_sqlalchemy import SQLAlchemy
import requests
from sqlalchemy import *
from sqlalchemy.orm import *


from covid_routes import *
from airports_routes import *
from cities_routes import *

application = Flask(__name__)
application.register_blueprint(city)
application.register_blueprint(airports)
application.register_blueprint(covids)

CORS(application)

driver = "postgresql+psycopg2://"

url = (
    driver
    + os.environ["RDS_USERNAME"]
    + ":"
    + os.environ["RDS_PASSWORD"]
    + "@"
    + os.environ["RDS_HOSTNAME"]
    + ":"
    + os.environ["RDS_PORT"]
    + "/travel_wise_db"
)


engine = create_engine(url)
engine.connect()


@application.route("/")
def hello_world():
    return "Hello World!"


if __name__ == "__main__":
    application.run()
