#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, render_template, request, Response, flash, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, Image, Transaction
import json
import time




#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

database_name = "image-repo"
database_path = "postgresql://{}:{}@{}/{}".format('danielzhang', '', 'localhost:5432', database_name)

app.config['SQLALCHEMY_DATABASE_URI'] = database_path

db = SQLAlchemy(app)

migrate = Migrate(app, db)


#  ----------------------------------------------------------------#
#  hello :)
#  ----------------------------------------------------------------#

@app.route('/')
def hello():
    image_query = Image.query.all()
    images = []
    for image in image_query:
        images.append({
            "image_name": image.name,
            "address": image.address,
            "description": image.description,
            "colour": image.colour,
            "price": image.price,
            "stock": image.stock,
            "transactions": image.transactions,
        })
    return jsonify(images)


#  ----------------------------------------------------------------#
#  Transactions
#  ----------------------------------------------------------------#

@app.route('/transactions')
def transactions():
    transactions_query = Transaction.query.order_by(Transaction.transaction_time).all()
    data = []
    for transaction in transactions_query:
        #image_name = Image.query(Image.name).get(transaction.image_id)
        data.append({
            "cost": transaction.cost,
            "transaction_type": transaction.transaction_type,
            "transaction_type": transaction.transaction_time,
        })
    return jsonify(data)

#  ----------------------------------------------------------------#
#  Images
#  ----------------------------------------------------------------#

# , methods=['GET']
@app.route('/get-images')
def images():
    image_query = Image.query.all()
    data = []
    print("hello")
    for image in image_query:
        data.append({
            "image_name": image.name,
            "address": image.address,
            "description": image.description,
            "colour": image.colour,
            "price": image.price,
            "stock": image.stock,
            "transactions": image.transactions,
        })
    return jsonify(data)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}