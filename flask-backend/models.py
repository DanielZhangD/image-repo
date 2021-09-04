from flask_sqlalchemy import SQLAlchemy
from flask import Flask



db = SQLAlchemy()

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

