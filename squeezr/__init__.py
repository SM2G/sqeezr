# -*- coding: utf-8 -*-
#!/usr/bin/env python
from flask import Flask,make_response,render_template, request, jsonify, json,jsonify
from flask import make_response, request, current_app, redirect, url_for, send_from_directory
import os,time,datetime
import random

app = Flask(__name__)
numberOfQuestions = 3
qns = json.load(open('questions.json'))


@app.route('/getQuestions/',methods=['POST'])
def getQuestions():
    sectionId = request.form['sectionId']

    sections = ["section1","section2","section3"]

    questions = random.sample(qns[sectionId],numberOfQuestions)

    #Find the next section
    if sections.index(sectionId)==len(sections)-1:
        Next = "Finish"
    else:
        Next = sections[sections.index(sectionId)+1]

    return jsonify(qns=questions,next=Next)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
