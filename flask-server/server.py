from flask import Flask, jsonify, request, redirect, json
from flask_cors import CORS
from dataclasses import dataclass
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

from userLogin import userLogin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///default.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'impossible_to_hack'

db = SQLAlchemy(app)
CORS(app)
login_manager = LoginManager(app)
USER_ID = 0


@login_manager.user_loader
def load_user(user_id):
    print("load user")
    user_login = userLogin()
    return user_login.fromDB(user_id, Users)


@dataclass
# Поля таблиц
class Users(db.Model):
    id: int
    login: str
    password: str
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<users {self.id}>"


@dataclass()
class Notes(db.Model):
    id: int
    header: str
    text: str
    creator: int
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    header = db.Column(db.String, nullable=False)
    text = db.Column(db.String)
    creator = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f"<notes {self.id}>"


@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        notes = Notes.query.order_by(Notes.id).all()
        return jsonify(notes)
    if request.method == 'POST':
        json_array = request.get_json(force=True)
        note = Notes(header=json_array['header'], text=json_array['text'], creator=current_user.get_id())
        try:
            db.session.add(note)
            db.session.commit()
            return json_array
        except sqlite3.Error as e:
            return "При создании заметки произошла ошибка: " + str(e)


@app.route("/delete/<noteId>", methods=['DELETE'])
def delete(noteId):
    note = Notes.query.get(noteId)
    if True:
        try:
            Notes.query.filter(Notes.id == noteId).delete()
            db.session.commit()
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        except sqlite3.IntegrityError as err:
            return "При удалении заметки произошла ошибка: " + str(err)


# Регистрация
@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        register_json = request.get_json(force=True)
        if len(register_json['login']) > 4 and len(register_json['password']) > 4:
            user_login = register_json['login']
            password = str(generate_password_hash(register_json['password']))
            user = Users(login=user_login, password=password)
            try:
                db.session.add(user)
                db.session.commit()
                return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
            except sqlite3.Error as e:
                print("Ошибка добавления пользователя в БД " + str(e))
                return "При создании профиля произошла ошибка"
        else:
            return "Неверно введены поля"


# Выход
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


# Логин
@app.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        login_json = request.get_json(force=True)
        user = Users.query.filter_by(login=login_json['login']).first()
        if user and check_password_hash(user.password, login_json['password']):
            user_login = userLogin()
            user_login.create(user)
            login_user(user_login)
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return "Неверный пароль или логин"


if __name__ == "__main__":
    app.run(debug=True)
