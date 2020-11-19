from flask import Blueprint
import os
import json
from flask import Flask, request
from flask_restless import manager
from flask_sqlalchemy import SQLAlchemy
import requests
from sqlalchemy import *
from sqlalchemy.orm import *

airports = Blueprint('airports',__name__)

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

#Airport ----------------------------------------------------------------
@airports.route("/airports")
def airport():
    allAirports = engine.execute("select * from public.airports")
    return json.dumps([dict(r) for r in allAirports])

@airports.route("/airports/search")
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