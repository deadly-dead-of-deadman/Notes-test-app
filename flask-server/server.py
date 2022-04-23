from flask import Flask
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


# Поля таблиц
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<users {self.id}>"


class Notes(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    header = db.Column(db.String, nullable=False)
    text = db.Column(db.String)
    creator = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f"<notes {self.id}>"

@app.route("/notes")
def index():
    return {"message": ["Hello world!"]}


@app.route("/register")
def register():
    return True


if __name__ == "__main__":
    app.run(debug=True)
