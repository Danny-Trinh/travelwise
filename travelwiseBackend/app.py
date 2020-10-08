from flask import Flask
app = Flask(__name__)

#testing for connecting unit tests to app
appA = 10

@app.route('/')
def hello_world():
    return "Hello World!"


if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
