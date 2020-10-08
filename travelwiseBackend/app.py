from flask import Flask
from flask_restless import manager
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello World!"


if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
