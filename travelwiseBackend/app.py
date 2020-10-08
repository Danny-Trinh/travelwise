from flask import Flask
from flask_restless import manager
from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker

engine = create_engine('')
Session = sessionmaker(bind=engine)
mysession = Session()


app = Flask(__name__)
manager = manager(app, session=mysession)



#testing for connecting unit tests to app
appA = 10

@app.route('/')
def hello_world():
    return "Hello World!"


if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
