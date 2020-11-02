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





@application.route("/")
def hello_world():
    return "Hello World!"


#Cities ------------------------------------------------------------------

@application.route("/cities")
def cities():
    allCities = engine.execute("select * from public.cities")
    return json.dumps([dict(r) for r in allCities])


@application.route("/cities/search")
def city_search():
    listOfParams = {}
    try:
        city_id = request.args["city_id"]
    except:
        city_id = None
    if (city_id != None):
        listOfParams["city_id"] = city_id
    try:
        city_name = request.args["name"]
    except:
        city_name = None
    if (city_name != None):
        city_name = "'{" + city_name + "}'"
        listOfParams["name"] = city_name
    try:
        city_country = request.args["country"]
    except:
        city_country = None
    if (city_country != None):
        city_country = "'{" + city_country + "}'"
        listOfParams["country"] = city_country
    try:
        city_region = request.args["region"]
    except:
        city_region = None
    if (city_region != None):
        city_region = "'{" + city_region + "}'"
        listOfParams["region"] = city_region

 
    executeString = "select * from public.cities where "

    for param in listOfParams:
        executeString += param + " = " + listOfParams[param] + " and "
        
    try:
        filter = request.args["filter"]
    except:
        filter = None
    if (filter != None):
        listOfFilters = filter.split(',')
        for filter in listOfFilters:
            print("filter = " + filter)
            line = filter.split('[')
            print(line[0])
            field = line[0]
            line2 = line[1].split(']')
            comparison = line2[0]
            print("comparison = " + comparison)
            if comparison.upper() == 'GTE':
                comparison = '>='
            elif comparison.upper() == 'LTE':
                comparison = '<='
            else:
                return "FILTER PARAMETER IS INCORRECT"
            value = line2[1]
            executeString += field + " " + comparison + " " + value + " and "

    try:
        safety = request.args["safety"]
    except:
        safety = None
    if (safety != None):
        if safety.upper() == "YES":
            executeString += "overall is not null and "
        else:
            return "safety must be set to YES"

    executeString = executeString[0:len(executeString) - 5]

    try:
        sort = request.args["sort"]
    except:
        sort = None
    if (sort != None):
        if (sort[0] == "-"):
            executeString += " order by " + sort[1:len(sort)] + " desc"
        else:
            executeString += " order by " + sort
        

    city_json = engine.execute(executeString)
    return json.dumps([dict(r) for r in city_json])


#Cities ------------------------------------------------------------------

#Covid ------------------------------------------------------------------
@application.route("/covid")
def covid():
    allCovid = engine.execute("select * from public.covid")
    return json.dumps([dict(r) for r in allCovid])

@application.route("/covid/search")
def covid_search():
    listOfParams = {}
    try:
        covid_country_code  = request.args["country_code"]
    except:
        covid_country_code = None
    if (covid_country_code != None):
        covid_country_code = "'{" + covid_country_code + "}'"
        listOfParams["country_code"] = covid_country_code
    try:
        country_name = request.args["country"]
    except:
        country_name = None
    if (country_name != None):
        country_name = "'{" + country_name + "}'"
        listOfParams["country"] = country_name
    try:
        new_cases = request.args["new_cases"]
    except:
        new_cases = None
    if (new_cases != None):
        listOfParams["new_cases"] = new_cases
    try:
        total_cases = request.args["total_cases"]
    except:
        total_cases = None
    if (total_cases != None):
        listOfParams["total_cases"] = total_cases
    try:
        new_deaths = request.args["new_deaths"]
    except:
        new_deaths = None
    if (new_deaths != None):
        listOfParams["new_deaths"] = new_deaths
    try:
        total_deaths = request.args["total_deaths"]
    except:
        total_deaths = None
    if (total_deaths != None):
        listOfParams["total_deaths"] = total_deaths
    try:
        country_date  = request.args["date"]
    except:
        country_date = None
    if (country_date != None):
        country_date = "'{" + country_date + "}'"
        listOfParams["date"] = country_date
    
    
    
    executeString = "select * from public.covid where "

    for param in listOfParams:
        executeString += param + " = " + listOfParams[param] + " and "
        
    try:
        filter = request.args["filter"]
    except:
        filter = None
    if (filter != None):
        listOfFilters = filter.split(',')
        for arg in listOfFilters:
            print("filter = " + arg)
            line = arg.split('[')
            print(line[0])
            field = line[0]
            line2 = line[1].split(']')
            comparison = line2[0]
            print("comparison = " + comparison)
            if comparison.upper() == 'GTE':
                comparison = '>='
            elif comparison.upper() == 'LTE':
                comparison = '<='
            else:
                return "FILTER PARAMETER IS INCORRECT"
            value = line2[1]
            executeString += field + " " + comparison + " " + value + " and "

    executeString = executeString[0:len(executeString) - 5]

    try:
        sort = request.args["sort"]
    except:
        sort = None
    if (sort != None):
        if (sort[0] == "-"):
            executeString += " order by " + sort[1:len(sort)] + " desc"
        else:
            executeString += " order by " + sort
        
        
    covid_json = engine.execute(executeString)
    return json.dumps([dict(r) for r in covid_json])

#Covid ------------------------------------------------------------------


#Airport ----------------------------------------------------------------
@application.route("/airports")
def airport():
    allAirports = engine.execute("select * from public.airports")
    return json.dumps([dict(r) for r in allAirports])


@application.route("/airports/search")
def airport_city_search():
    listOfParams = {}
    try:
        iata_code  = request.args["iata_code"]
    except:
        iata_code = None
    if (iata_code != None):
        iata_code = "'{" + iata_code + "}'"
        listOfParams["iata_code"] = iata_code.upper()
    try:
        airport_name = request.args["airport_name"]
    except:
        airport_name = None
    if (airport_name != None):
        airport_name = "'{" + airport_name + "}'"
        listOfParams["airport_name"] = airport_name.upper()
    try:
        city_name = request.args["city_name"]
    except:
        city_name = None
    if (city_name != None):
        city_name = "'{" + city_name + "}'"
        listOfParams["city_name"] = city_name.upper()
    try:
        country_name = request.args["country_name"]
    except:
        country_name = None
    if (country_name != None):
        country_name = "'{" + country_name + "}'"
        listOfParams["country_name"] = country_name.upper()
    try:
        country_code = request.args["country_code"]
    except:
        country_code = None
    if (country_code != None):
        country_code = "'{" + country_code + "}'"
        listOfParams["country_code"] = country_code.upper()
    try:
        latitude = request.args["latitude"]
    except:
        latitude = None
    if (latitude != None):
        listOfParams["latitude"] = latitude
    try:
        longitude  = request.args["longitude"]
    except:
        longitude = None
    if (longitude != None):
        listOfParams["longitude"] = longitude
    try:
        time_offset = request.args["time_offset"]
    except:
        time_offset = None
    if (time_offset != None):
        time_offset = "'{" + time_offset + "}'"
        listOfParam["time_offset"] = time_offset
    
    
    executeString = "select * from public.airports where "

    for param in listOfParams:
        executeString += param + " = " + listOfParams[param] + " and "
        
    try:
        filter = request.args["filter"]
    except:
        filter = None
    if (filter != None):
        listOfFilters = filter.split(',')
        for arg in listOfFilters:
            print("filter = " + arg)
            line = arg.split('[')
            print(line[0])
            field = line[0]
            line2 = line[1].split(']')
            comparison = line2[0]
            print("comparison = " + comparison)
            if comparison.upper() == 'GTE':
                comparison = '>='
            elif comparison.upper() == 'LTE':
                comparison = '<='
            else:
                return "FILTER PARAMETER IS INCORRECT"
            value = line2[1]
            executeString += field + " " + comparison + " " + value + " and "

    executeString = executeString[0:len(executeString) - 5]

    try:
        sort = request.args["sort"]
    except:
        sort = None
    if (sort != None):
        if (sort[0] == "-"):
            executeString += " order by " + sort[1:len(sort)] + " desc"
        else:
            executeString += " order by " + sort
        
        
    airports_json = engine.execute(executeString)
    return json.dumps([dict(r) for r in airports_json])

#Airport ----------------------------------------------------------------


if __name__ == "__main__":
    application.run()
