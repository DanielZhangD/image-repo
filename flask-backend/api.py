#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, render_template, request, Response, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from models import db, Image, Transaction
from flask_cors import CORS
import os
import sys



#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

database_name = "image-repo"
database_path = "postgresql://{}:{}@{}/{}".format('danielzhang', '', 'localhost:5432', database_name)

app.config['SQLALCHEMY_DATABASE_URI'] = database_path
app.secret_key =  os.urandom(12)

db = SQLAlchemy(app)

migrate = Migrate(app, db)

CORS(app)


#----------------------------------------------------------------------------#
# Models
#----------------------------------------------------------------------------#
class Image(db.Model):
    __tablename__ = 'Image'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    colour = db.Column(db.String(120), nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    transactions = db.relationship('Transaction', backref='Image', lazy=True)

# transactionType - buy or sell - False = Sell, True = Buy

class Transaction(db.Model):
    __tablename__ = 'Transaction'

    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.Boolean, nullable=False)
    transaction_time = db.Column(db.DateTime, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('Image.id'), nullable=False)


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
            "image_id": image.id
        })
    db.session.close()
    return jsonify(data)

@app.route('/buy-image', methods=['POST'])
def buy():
    buy_json = request.get_json()
    if not buy_json:
        return jsonify({'msg': 'No Image ID!'}), 400
    image_id = buy_json.get('imageId')
    amount = int(buy_json.get('amount'))

    try:
        image = Image.query.get(image_id)
        # ERror Checking
        if image.stock == 0:
            flash("Error: Stock is empty!")
            db.session.close()
            return jsonify({'msg': 'Out of Stock!'}), 400
        elif image.stock - amount < 0:
            flash("Error: Cannot buy more than the available amount!")
            db.session.close()
            return jsonify({'msg': 'Cannot buy more than stock!'}), 400

        image.stock = image.stock - amount

        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'msg': 'ERROR!'}), 400
    finally:
        print("Completed", file=sys.stderr)
        print(image.stock, file=sys.stderr)
        print()
        db.session.flush()
        db.session.close()
    return ('', 204)
    



@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()