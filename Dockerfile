FROM node:20.6.0-buster as frontend
ADD . /app
WORKDIR /app
RUN npm install
CMD npm start

FROM python:3.11.5-bullseye as parser
ADD . /app
WORKDIR /app/parser
RUN pip install -r requirements.txt
CMD python parser.py

FROM python:3.11.5-bullseye as scrapper
ADD . /app
WORKDIR /app/scrapper
RUN pip install -r requirements.txt
CMD python scrapper.py

FROM python:3.11.5-bullseye as analyzer
ADD . /app
WORKDIR /app/analyzer
RUN pip install -r requirements.txt
CMD python analyzer.py

FROM python:3.11.5-bullseye as recommender
ADD . /app
WORKDIR /app/recommender
RUN pip install -r requirements.txt
CMD python recommender.py