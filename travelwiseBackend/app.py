from flask import Flask
#from flask_restless import manager
#from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
# db = SQLAlchemy(app)
# manager = manager(app, flask_sqlalchemy_db=db)



#testing for connecting unit tests to app
appA = 10

@app.route('/')
def hello_world():
    return "Hello World!"



if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
