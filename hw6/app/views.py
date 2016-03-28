from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm, OrderForm

@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    customerForm = CustomerForm()
    if customerForm.validate_on_submit():
        customer = models.Customer(
                            first_name = customerForm.first_name.data,
                            last_name = customerForm.last_name.data,
                            company = customerForm.company.data,
                            email = customerForm.email.data,
                            phone = customerForm.phone.data)
        # you will need to add Address here
        address = models.Address(
                            street_name = customerForm.street_name.data,
                            city = customerForm.city.data,
                            state = customerForm.state.data,
                            country = customerForm.country.data,
                            zip_code = customerForm.zip_code.data,
                            customer = customer)
        db.session.add(customer)
        db.session.add(address)
        db.session.commit()
        return redirect('/customers')
    return render_template('customer.html', form=customerForm)

@app.route('/customers')
def display_customer():
    customers = models.Customer.query.all()
    orders = models.Order.query.all()
    #orderCustomer = models.orders.query.all()
    return render_template('home.html', customers=customers, orders=orders)

@app.route('/create_order', methods=['GET', 'POST'])
def create_order():
    orderForm = OrderForm()
    if orderForm.validate_on_submit():
        order = models.Order(
                            num_parts_ordered = orderForm.num_parts_ordered.data,
                            total_spent = orderForm.total_spent.data)
        customerids = orderForm.customer_id.data.split(',')

        for customer_id in customerids:
            customer = models.Customer.query.filter_by(id=customer_id).first()
            customer.orders.append(order)
        db.session.add(order)
        db.session.commit()
        return redirect('/customers')
    return render_template('orderform.html', form=orderForm)
