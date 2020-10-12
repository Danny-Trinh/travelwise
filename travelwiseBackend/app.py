import json
from flask import Flask
from flask_restless import manager
from flask_sqlalchemy import SQLAlchemy

import requests
import psycopg2
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base


app = Flask(__name__)





engine = create_engine('postgresql+psycopg2://postgres:HYDHYDHYD@database.cs9x2xgy9ls3.us-east-2.rds.amazonaws.com:6463/travel_wise_db')
engine.connect()

Session = sessionmaker(bind=engine)
session = Session()

base = declarative_base()

class CountryEntry(base):
    __tablename__ = 'cities'
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
    __tablename__ = 'covid'
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
    __tablename__ = 'airports'
    iata_code = Column(Text, primary_key=True)
    airport_name = Column(Text)
    city_name = Column(Text)
    country_code = Column(Text, ForeignKey("covid.country_code"))
    country_name = Column(Text)
    time_offset = Column(Text)
    longitude = Column(Float)
    latitude = Column(Float)



allCities = engine.execute("select * from public.cities")
allCovid = engine.execute("select * from public.covid")
allAirports = engine.execute("select * from public.airports")




#testing for connecting unit tests to app
appA = 10

@app.route('/')
def hello_world():
    return "Hello World"

@app.route('/cities')
def cities():
    return json.dumps([dict(r) for r in allCities])
    
@app.route('/covid')
def covid():
    return json.dumps([dict(r) for r in allCovid])

@app.route('/airport')
def airport():
    return json.dumps([dict(r) for r in allAirports])

if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
