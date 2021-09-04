#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, render_template, request, Response, flash, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, Image, Transaction
import json
import time
import sys




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




#  ----------------------------------------------------------------#
#  Transactions
#  ----------------------------------------------------------------#

@app.route('/get-transactions')
def transactions():
    transactions_query = Transaction.query.order_by(Transaction.transaction_time).all()
    data = []
    for transaction in transactions_query:
        image_name = Image.query.get(transaction.image_id)
        transaction_type = "Sell"
        if transaction.transaction_type:
            transaction_type = "Buy"
        data.append({
            "transaction_type": transaction_type,
            "transaction_time": transaction.transaction_time,
            "image_name": image_name.name,
            "cost": transaction.cost,

        })
    db.session.close()
    return jsonify(data)

#  ----------------------------------------------------------------#
#  Images
#  ----------------------------------------------------------------#

# , methods=['GET']
@app.route('/get-images')
def images():
    image_query = Image.query.all()
    data = []
    for image in image_query:
        data.append({
            "image_name": image.name,
            "address": image.address,
            "description": image.description,
            "colour": image.colour,
            "price": image.price,
            "stock": image.stock,
        })
    db.session.close()
    return jsonify(data)

@app.route('/buy-image', methods=['POST'])
def buy(image_id):
    try:
        image = Image.query.get(image_id)
        if (image.stock == 0):
            flash("Error: Stock is empty!")
        image.stock -= 1
        db.session.commit()
    except:
        db.session.rollback()
        flash("Error: Image could not be bought!")
    else:
        flash('Image successfully bought!')
    finally:
        db.session.close()
    



@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()