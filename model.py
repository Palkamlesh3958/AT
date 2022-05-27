"""Models for trail finder app."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Users."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    username = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password1 = db.Column(db.String(64), nullable=False)
    password2 = db.Column(db.String(64), nullable=False)

    def __repr__(self):
        """Show user details when printed."""
        return f"""<User user_id={self.user_id} 
                    username={self.username} 
                    email={self.email}>"""

    def __init__(self, username, email, password1, password2):
        self.username = username
        self.email = email
        self.password1 = password1
        self.password2 = password2


def connect_to_db(app, db_name):
    """Connect to database."""

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app, "trailfinder")
