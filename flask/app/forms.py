from flask.ext.wtf import Form
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class CustomerForm(Form):
    company = StringField('company', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
