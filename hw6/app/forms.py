from flask.ext.wtf import Form
from wtforms import StringField, IntegerField
from flask_wtf.html5 import EmailField
from wtforms.validators import DataRequired
from wtforms.ext.sqlalchemy.fields import QuerySelectField

class CustomerForm(Form):
    company = StringField('company', validators=[DataRequired()])
    email = EmailField('email', validators=[DataRequired()])
    # Add additional Address fields here
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    phone = StringField('phone', validators=[DataRequired()])

    street_name = StringField('street_name', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired()])

class OrderForm(Form):
    total_spent = StringField('total_spent', validators=[DataRequired()])
    num_parts_ordered = StringField('num_parts_ordered', validators=[DataRequired()])
    customer_id = StringField('customer_id', validators=[DataRequired()])
