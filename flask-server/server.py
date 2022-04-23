from flask import Flask, jsonify, request
from dataclasses import dataclass
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
import sqlite3
from flask_sqlalchemy import SQLAlchemy
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


@app.route("/notes", methods=['GET', 'POST'])
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


@app.route("/register", methods=["POST"])
def register():
    return True


if __name__ == "__main__":
    app.run(debug=True)
