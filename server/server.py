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

# ping home route
@app.route('/')
def home():
  return 'hello world!'

# wake command
@app.route('/wake')
def wake():
  return 'hello!'

# login route
# input: {username, type (COMP or USER), password}
# return: {uuid, username with prefix}
@app.route('/login', methods=['POST'])
def login():
  users = read_json('users.json')
  user = request.json['username']
  if request.json['type'] == 'COMP': user = 'c/' + user
  if request.json['type'] == 'USER': user = 'u/' + user
  if user in users and request.json['password'] == users[user]['password']:
    print(user + 
          ' logged in at ' + 
          datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S") + 
          ' UTC')
    id = uuid.uuid4()
    user_uuid[user] = {'id': id, 'time': datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S")} 
    return json.dumps({'user': user, 'uuid': str(id)})
  return 'denied'

# signout route
# input: {username, type (COMP or USER)}
# return: successful
@app.route('/signout', methods=['POST'])
def signout():
  user = request.json['username']
  if request.json['type'] == 'COMP': user = 'c/' + user
  if request.json['type'] == 'USER': user = 'u/' + user
  logout(user)
  print(user + 
        ' logged out at ' + 
        datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S") + 
        ' UTC')
  return 'Signed out!'

# signup route
# input: {username, type (COMP or USER), password, display name, email}
# return: {uuid, username with prefix}
@app.route('/signup', methods=['POST'])
def signup():
  users = read_json('users.json')
  user = request.json['username']
  if request.json['type'] == 'COMP': user = 'c/' + user
  if request.json['type'] == 'USER': user = 'u/' + user
  if user in users: return 'Username already exists!'
  else:
    users[user] = {'type': request.json['type'], 
                   'password': request.json['password'],
                   'info': {'display name': request.json['display name'], 
                            'email': request.json['email'],
                            'bio': None,
                            'profile picture': None,
                            'resources': {
                              'github': None,
                              'linkedin': None,
                              'website': None
                            }
                   },
                   'forums': {
                            'posts': {},
                            'comments': {}
                   }}
    if request.json['type'] == 'COMP':
      users[user]['info']['hiring'] = False    
    write_json(users, 'users.json')
    print(user + 
          ' logged in at ' + 
          datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S") + 
          ' UTC')
    id = uuid.uuid4()
    user_uuid[user] = {'id': id, 'time': datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S")} 
    return json.dumps({'user': user, 'uuid': str(id)})

# update profile route
# input: {username, type (COMP or USER), display name, email, bio, profile picture, github, linkedin, website, hiring}
# return: updated!
@app.route('/update_profile', methods=['POST'])
def update_profile():
  users = read_json('users.json')
  user = request.json['username']
  if request.json['type'] == 'COMP': user = 'c/' + user
  if request.json['type'] == 'USER': user = 'u/' + user
  users[user] = {'type': request.json['type'], 
                  'password': users[user]['password'],
                  'info': {'display name': request.json['display name'], 
                          'email': request.json['email'],
                          'bio': request.json['bio'],
                          'profile picture': request.json['profile picture'],
                          'resources': {
                            'github': request.json['github'],
                            'linkedin': request.json['linkedin'],
                            'website': request.json['website']
                          }
                        },
                  'forums': users[user]['forums']
                }

  
  if request.json['type'] == 'COMP':
    users[user]['info']['hiring'] = request.json['hiring']  
  write_json(users, 'users.json')
  return 'Updated!'

# check log in status route
# input: {username, uuid}
# return: true or false string
@app.route('/is_logged', methods=['POST'])
def is_logged():
  return str(verify_session(request.json['username'], request.json['uuid']))

# check if user name is free (during account creation) route
# input: {username, type (COMP OR USER)}
# return: true or false string
@app.route('/uname_free', methods=['POST'])
def uname_free():
  users = read_json('users.json')
  user = request.json['username']
  if request.json['type'] == 'COMP': user = 'c/' + user
  if request.json['type'] == 'USER': user = 'u/' + user
  if user in users:
    return str(False)
  return str(True) 

# check if user name is free (during account creation) route
# input: noone
# return: json of usable tags
@app.route('/get_tags', methods=['GET'])
def get_tags():
  return json.dumps(read_json('tags.json'))

# get list of companies route
# input: none
# return: json list of company data 
# {
#   "name_1": {
#    "info": {...}, "forums": {...}}
#   }, etc.
# }
@app.route('/get_companies', methods=['GET']) 
def get_companies():
  users = read_json('users.json')
  companies = {}
  for user in users:
    if users[user]['type'] == 'COMP':
      companies[user] = {'info': users[user]['info'], 'forums': users[user]['forums']}
  return json.dumps(companies)

# get singular company info route
# input: {username}
# return: json of company info
@app.route('/get_company_info', methods=['POST'])
def get_company_info():
  users = read_json('users.json')
  company = 'c/' + request.json['company']
  if company in users:
    return json.dumps(users[company]['info'])
  return 'Company not found!'

# get singular company forum route
# input: {username}
# return: json of company forums
@app.route('/get_company_forums', methods=['POST'])
def get_company_forums():
  users = read_json('users.json')
  company = 'c/' + request.json['company']
  if company in users:
    return json.dumps(users[company]['forums'])
  return 'Company not found!'

# get list of users route
# input: none
# return: json list of user data 
# {
#   "name_1": {
#    "info": {...}, "forums": {...}}
#   }, etc.
# }
@app.route('/get_users', methods=['GET'])
def get_users():
  users = read_json('users.json')
  user_list = {}
  for user in users:
    if users[user]['type'] == 'USER':
      user_list[user] = {'info': users[user]['info'], 'forums': users[user]['forums']}
  return json.dumps(user_list)

# get singular user info route
# input: {username}
# return: json of user info
@app.route('/get_user_info', methods=['POST'])
def get_user_info():
  users = read_json('users.json')
  user = 'u/' + request.json['user']
  if user in users:
    return json.dumps(users[user]['info'])
  return 'User not found!'

# get singular user forum route
# input: {username}
# return: json of user forums
@app.route('/get_user_forums', methods=['POST'])
def get_user_forums():
  users = read_json('users.json')
  user = 'u/' + request.json['user']
  if user in users:
    return json.dumps(users[user]['forums'])
  return 'User not found!'

# get forums related to tag route
# input: {tags [list of tags]}
# return: json of forum posts with comment links
@app.route('/get_tag_forums', methods=['POST'])
def get_tag_forums():
  posts = {}
  tags = request.json['tags']
  avail_tags = read_json('tags.json')
  if tags == '': return 'No tags given!'
  if len(tags) == 1: return json.dumps(read_json('tag_files/' + tags[0] + '.json'))
  for tag in tags:
    if tag in avail_tags:
      data = read_json('tag_files/' + tag + '.json')
      posts.update(data)
  
  return json.dumps(posts)

# get forum based on id route
# input: {tag, id (post uuid)}
# return: json of forum post with comment links
@app.route('/get_forum_post', methods=['POST'])
def get_forum_post():
  tag = request.json['tag']
  id = request.json['id']
  tags = request.json['tags']
  if tag in tags:
    return json.dumps(read_json('tag_files/' + tag + '.json')[id])
  return 'Post not found!'

# add forum post route
# input: {tags [list of tags], username (with c/ or u/), uuid (user uuid), title, body}
# return: invalid session or successful post
@app.route('/add_forum_post', methods=['POST'])
def add_forum_post():
  if(not verify_session(request.json['username'], request.json['uuid'])): return 'Invalid session!'
  tags = request.json['tags']
  avail_tags = read_json('tags.json')
  id = str(uuid.uuid4())
  for tag in tags:
    if tag in avail_tags:
      data = read_json('tag_files/' + tag + '.json')
      data[id] = {'title': request.json['title'], 
                   'body': request.json['body'], 
                   'author': request.json['username'], 
                   'date': datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S"), 
                   'tags': tags,
                   'comments': {}}
      write_json(data, 'tag_files/' + tag + '.json')
  users = read_json('users.json')
  users[request.json['username']]['forums']['posts'][str(id)] = tags
  write_json(users, 'users.json')
  return 'Post added!'

# edit forum post route
# input: {tags [list of tags], username (with c/ or u/), uuid (user uuid), id (post uuid), title, body}
# return: invalid session or successful edit
@app.route('/edit_forum_post', methods=['POST'])
def edit_forum_post():
  if(not verify_session(request.json['username'], request.json['uuid'])): return 'Invalid session!'
  tags = request.json['tags']
  avail_tags = read_json('tags.json')
  id = request.json['id']
  for tag in tags:
    if tag in avail_tags:
      data = read_json('tag_files/' + tag + '.json')
      data[id] = {'title': request.json['title'], 
                   'body': request.json['body'], 
                   'author': request.json['username'], 
                   'date': datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S"), 
                   'tags': tags,
                   'comments': data[id]['comments']}
      write_json(data, 'tag_files/' + tag + '.json')
  return 'Post added!'

# delete forum post route
# input: {username (username with c/ or u/), uuid (user uuid), id (post uuid)}
# return: invalid session or successful delete
@app.route('/delete_forum_post', methods=['POST'])
def delete_forum_post():
  if(not verify_session(request.json['username'], request.json['uuid'])): return 'Invalid session!'
  id = request.json['id']
  users = read_json('users.json')
  if (id in users[request.json['username']]['forums']['posts']):
    tags = users[request.json['username']]['forums']['posts'][id]
    del users[request.json['username']]['forums']['posts'][id]
    for tag in tags:
      data = read_json('tag_files/' + tag + '.json')
      del data[id]
      write_json(data, 'tag_files/' + tag + '.json')
    write_json(users, 'users.json')


  return 'Post deleted!'

# add forum comment route
# input: {tags [list of tags], id (forum post id), username (with c/ or u/), uuid (user uuid), title, body}
# return: invalid session or successful comment
@app.route('/add_forum_comment', methods=['POST'])
def add_forum_comment():
  if(not verify_session(request.json['username'], request.json['uuid'])): return 'Invalid session!'
  id = request.json['id']
  tags = request.json['tags']
  avail_tags = read_json('tags.json')
  comment_id = str(uuid.uuid4())
  for tag in tags:
    if tag in avail_tags:
      data = read_json('tag_files/' + tag + '.json')
      data[id]['comments'][comment_id] = {'body': request.json['body'], 
                                          'author': request.json['username'], 
                                          'date': datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S")}
      write_json(data, 'tag_files/' + tag + '.json')
  users = read_json('users.json')
  users[request.json['username']]['forums']['comments'][str(comment_id)] = {'post_id': id, 'tags': tags, 'comment_id': comment_id}
  write_json(users, 'users.json')
  return 'Comment added!'

# edit forum comment route
# input: {tags [list of tags], id (forum post id), comment_id (comment id), username (with c/ or u/), uuid (user uuid), title, body}
# return: invalid session or successful comment
@app.route('/edit_forum_comment', methods=['POST'])
def edit_forum_comment():
  verify_session(request.json['username'], request.json['uuid'])
  id = request.json['id']
  tags = request.json['tags']
  comment_id = request.json['comment_id']
  avail_tags = read_json('tags.json')
  for tag in tags:
    if tag in avail_tags:
      data = read_json('tag_files/' + tag + '.json')
      data[id]['comments'][comment_id] = {'body': request.json['body'], 
                                          'author': request.json['username'], 
                                          'date': datetime.datetime.now(UTC).strftime("%d/%m/%Y %H:%M:%S")}
      write_json(data, 'tag_files/' + tag + '.json')
  return 'Comment edited!'

# delete forum comment route
# input: {tags [list of tags], id (forum post id), comment_id (comment id), username (with c/ or u/), uuid (user uuid)}
# return: invalid session or successful comment
@app.route('/delete_forum_comment', methods=['POST'])
def delete_forum_comment():
  verify_session(request.json['username'], request.json['uuid'])
  id = request.json['id']
  tags = request.json['tags']
  comment_id = request.json['comment_id']
  avail_tags = read_json('tags.json')
  for tag in tags:
    if tag in avail_tags:
      data = read_json('tag_files/' + tag + '.json')
      del data[id]['comments'][comment_id]
      write_json(data, 'tag_files/' + tag + '.json')
  users = read_json('users.json')
  del users[request.json['username']]['forums']['comments'][comment_id]
  write_json(users, 'users.json')
  return 'Comment deleted!'

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
  app.run(host='0.0.0.0', port=os.environ.get("PORT"))
  app.listen(os.environ.get("PORT"))