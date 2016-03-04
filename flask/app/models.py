from app import db


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, company, email):
        self.company = company
        self.email = email

    def __repr__(self):
        return '<Customer %r>' % self.email
