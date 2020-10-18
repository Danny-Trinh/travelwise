import os
import json
from flask import Flask, request
from flask_cors import CORS
from flask_restless import manager
from flask_sqlalchemy import SQLAlchemy
import requests
import requests
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base

application = Flask(__name__)
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

Session = sessionmaker(bind=engine)
session = Session()

base = declarative_base()


class CountryEntry(base):
    __tablename__ = "cities"
    city_id = Column(Integer, primary_key=True)
    name = Column(Text)
    country = Column(Text)
    country_code = Column(Text, ForeignKey("covid.country_code"))
    region = Column(Text)
    longitude = Column(Float)
    latitude = Column(Float)
    lgbtq = Column(Integer)
    medical = Column(Integer)
    overall = Column(Integer)
    physical = Column(Integer)
    political = Column(Integer)
    theft = Column(Integer)
    women = Column(Integer)


class CovidEntry(base):
    __tablename__ = "covid"
    country_code = Column(Text, primary_key=True)
    country = Column(Text)
    new_cases = Column(BigInteger)
    total_cases = Column(BigInteger)
    new_deaths = Column(BigInteger)
    total_deaths = Column(BigInteger)
    date = Column(Text)

    def __hash__(self):
        return hash(self.str(country_code))


class AirportEntry(base):
    __tablename__ = "airports"
    iata_code = Column(Text, primary_key=True)
    airport_name = Column(Text)
    city_name = Column(Text)
    country_code = Column(Text, ForeignKey("covid.country_code"))
    country_name = Column(Text)
    time_offset = Column(Text)
    longitude = Column(Float)
    latitude = Column(Float)


# testing for connecting unit tests to app
appA = 10


@application.route("/")
def hello_world():
    return "Hello World!"


@application.route("/cities")
def cities():
    allCities = engine.execute("select * from public.cities")
    return json.dumps([dict(r) for r in allCities])

@application.route("/cities/search")
def city_search():
    city_name = request.args['name']
    city_name = "'{" + city_name + "}'"
    city_json = engine.execute("select * from public.cities where name = " + city_name)
    return json.dumps([dict(r) for r in city_json])

    
@application.route("/covid/search")
def covid_search():
    country_code = request.args['country_code']
    country_code = "'{" + country_code + "}'"
    country_code = country_code.upper()
    covid_json = engine.execute("select * from public.covid where country_code = " + country_code)
    return json.dumps([dict(r) for r in covid_json])

@application.route("/covid")
def covid():
    allCovid = engine.execute("select * from public.covid")
    return json.dumps([dict(r) for r in allCovid])


@application.route("/airport/search")
def airport_city_search():
    airport_name = request.args['city_name']
    airport_name = "'{" + airport_name + "}'"
    airport_name = airport_name.upper()
    airport_json = engine.execute("select * from public.airports where city_name = " + airport_name)
    return json.dumps([dict(r) for r in airport_json])

@application.route("/airport")
def airport():
    allAirports = engine.execute("select * from public.airports")
    return json.dumps([dict(r) for r in allAirports])



if __name__ == "__main__":
    application.run()
