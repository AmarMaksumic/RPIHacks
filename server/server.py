import bcrypt
import datetime
import json
import os
import pytz
import uuid
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, render_template, request, redirect
from json_operators import read_json, write_json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static'
application = app
scheduler = BackgroundScheduler()

UTC = pytz.utc

user_uuid = {}
company_uuid = {}

@app.route('/')
def home():
  return 'hello world!'

@app.route('/wake')
def wake():
  return 'hello!'

@app.route('/login', methods=['GET', 'POST'])
def login():
  users = read_json('users.json')
  user = request.form['username']
  if request.form['type'] == 'COMP': user = 'c/' + user
  if request.form['type'] == 'USER': user = 'u/' + user
  if user in users and request.form['password'] == users[user]['password']:
    print(user + 
          ' logged in at ' + 
          datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S") + 
          ' UTC')
    id = uuid.uuid4()
    user_uuid[user] = {'id': id, 'time': datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S")} 
    return json.dumps({'trees': data['trees'], 'user': user, 'uuid': str(id)})
  return 'denied'

@app.route('/signout', methods=['POST'])
def signout():
  user = request.form['username']
  if request.form['type'] == 'COMP': user = 'c/' + user
  if request.form['type'] == 'USER': user = 'u/' + user
  logout(user)
  print(user + 
        ' logged out at ' + 
        datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S") + 
        ' UTC')
  return 'Signed out!'

@app.route('/signup', methods=['POST'])
def signup():
  users = read_json('users.json')
  user = request.form['username']
  if request.form['type'] == 'COMP': user = 'c/' + user
  if request.form['type'] == 'USER': user = 'u/' + user
  if user in users or request.form['email']:
    return 'Username already exists!'
  else:
    users[user] = {'type': request.form['type'], 
                   'password': request.form['password'],
                   'info': {'display name': request.form['display name'], 
                            'email': request.form['email']}}
    write_json(users, 'users.json')
    return 'Signed up!'

@app.route('/is_logged', methods=['POST'])
def is_logged():
  return str(verify_session(request.json['username'], request.json['uuid']))

@app.route('/uname_free', methods=['POST'])
def uname_free():
  users = read_json('users.json')
  user = request.form['username']
  if request.form['type'] == 'COMP': user = 'c/' + user
  if request.form['type'] == 'USER': user = 'u/' + user
  if user in users or request.form['email']:
    return str(False)
  return str(True) 

def expire_session():
  remove = []

  for user in user_uuid:
    end_time = datetime.datetime.strptime(user_uuid[user]['time'], "%d/%m/%Y %H:%M:%S") + datetime.timedelta(hours=1)
    if end_time < datetime.datetime.now():
      remove.append(user)
  
  for user in remove:
    user_uuid.pop(user)

  print(user_uuid)

def verify_session(username, id):
  for user in user_uuid:
    if username == user and id == str(user_uuid[user]['id']):
      return True
  return False

def tree_exist(tree_id):
  tree_id = str(tree_id)
  trees = read_json('trees.json')
  if tree_id in trees:
    return True
  return False

def user_in_tree(username, tree_id):
  tree_id = str(tree_id)
  trees = read_json('trees.json')
  if tree_exist(tree_id):
    if username in trees[tree_id]['members']:
      return True
  return False

def logout(username):
  for user in user_uuid:
    if username == user:
      user_uuid.pop(user)
      return

def run():
  print('starting flask...')
  app.secret_key = os.urandom(12)
  scheduler.start()
  scheduler.add_job(expire_session, 'interval', minutes=5)
  app.run(host='0.0.0.0', port=8080)