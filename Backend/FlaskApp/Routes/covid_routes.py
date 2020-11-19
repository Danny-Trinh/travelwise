from flask import Blueprint
import os
import json
from flask import Flask, request
from flask_restless import manager
from flask_sqlalchemy import SQLAlchemy
import requests
from sqlalchemy import *
from sqlalchemy.orm import *

covids = Blueprint('covid',__name__)

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

#Covid ------------------------------------------------------------------
@covids.route("/covid")
def covid():
    allCovid = engine.execute("select * from public.covid")
    return json.dumps([dict(r) for r in allCovid])

@covids.route("/covid/search")
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
# #Covid ------------------------------------------------------------------