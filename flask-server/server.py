from flask import Flask, jsonify, request, redirect
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
        var = request.get_json(force=True)
        json_array = var[0]
        note = Notes(header=json_array['header'], text=json_array['text'], creator=current_user.get_id())
        try:
            db.session.add(note)
            db.session.commit()
            return jsonify(var)
        except sqlite3.Error as e:
            return "При создании заметки произошла ошибка: " + str(e)


# Регистрация
@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        json = request.get_json(force=True)[0]
        if len(json['login']) > 4 and len(json['password']) > 4:
            user_login = json['login']
            password = str(generate_password_hash(json['password']))
            user = Users(login=user_login, password=password)
            try:
                db.session.add(user)
                db.session.commit()
                return redirect('/login')
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
    return redirect('/')


# Логин
@app.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        json = request.get_json(force=True)[0]
        user = Users.query.filter_by(login=json['login']).first()
        if user and check_password_hash(user.password, json['password']):
            user_login = userLogin()
            user_login.create(user)
            login_user(user_login)
        else:
            return "Неверный пароль или логин"


if __name__ == "__main__":
    app.run(debug=True)
