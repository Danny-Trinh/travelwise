from flask import Blueprint
import os
import json
from flask import Flask, request
from flask_restless import manager
from flask_sqlalchemy import SQLAlchemy
import requests
from sqlalchemy import *
from sqlalchemy.orm import *

city = Blueprint('cities',__name__)

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

@city.route("/cities")
def cities_method():
    allCities = engine.execute("select * from public.cities")
    return json.dumps([dict(r) for r in allCities])

# #Cities ------------------------------------------------------------------

@city.route("/cities/search")
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
# #Cities ------------------------------------------------------------------