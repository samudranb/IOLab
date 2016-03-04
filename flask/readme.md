# Models Lab/Homework
Please work in your final project groups, this will help you get to know each other's strengths and weaknesses. If you are working on your final project alone, feel free to pair up with someone else or ask to join another group.

The goal for this lab is to get you comfortable translating your database models into actual code. We will be using [ORMs](https://en.wikipedia.org/wiki/Object-relational_mapping) to help us. The particular ORM that we will be using is SQLAlchemy (the flask implementation is called Flask-SQLAlchemy).

We'll walk through the example together in class which will give you an idea of how this all works together. Your goal for this lab and homework is to create the remaining models, forms, and routes to complete v1 of the exercise from last week.

You must create the following tables:
* customer
* address

You will need to create a one-to-many relationship between the customer and address table. Use the documentation [here](http://flask-sqlalchemy.pocoo.org/2.1/models/#one-to-many-relationships) for reference.

## Helpful Documentation
- [Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.1/)
- [Accessing SQLite3 Command Shell](https://www.sqlite.org/cli.html)
- [Flask-WTF](https://flask-wtf.readthedocs.org/en/latest/) (flask plugin for creating forms easily)
