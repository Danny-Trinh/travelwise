FROM python:latest


WORKDIR /app
ENV venv /venv


ADD . /app



RUN  pip install -r requirements.txt
RUN set FLASK_APP=app

EXPOSE 5000
CMD [ "python", "app.py"]



