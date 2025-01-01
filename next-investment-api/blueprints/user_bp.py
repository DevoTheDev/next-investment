from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from dotenv import load_dotenv
from functools import wraps
from custom_logging.fields_error_coverage import fields_error_coverage
import jwt
import datetime
import bcrypt
import os
from db import db

# Blueprint
user_bp = Blueprint('User', __name__)

# MongoDB collection
users_collection = db["users"]
load_dotenv()


# Secret Key (Reuse from environment variable)
SECRET_KEY = os.getenv('SECRET_KEY', 'deb57bf51537b2cf3e8fd70fd19d930a61d088aaf828a92863e59d256wef87237fbi29cc9283yr89uyv98yv')

# JWT Authentication Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            token = auth_header.split(" ")[1] if len(auth_header.split(" ")) == 2 else None

        if not token:
            return jsonify({
                'error': 'Token not received!',
                'details': [
                    "Ensure the Authorization header is included in your request.",
                    "The header must follow this format:",
                    "Authorization: Bearer <your_token>"
                ],
                'example': {
                    "Authorization": "Bearer abcdefghijklmnopqrstuvwxyz1234567890"
                }
            }), 403

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = users_collection.find_one({'username': data['username']})
            if not current_user:
                return jsonify({'message': 'User not found!'}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(current_user, *args, **kwargs)

    return decorated

# Register a new user (CREATE)
# Register a new user (CREATE)
@user_bp.route('/register', methods=['POST'])
@fields_error_coverage(required_fields=['username', 'password'])
def register_user():
    data = request.get_json()

    if users_collection.find_one({'username': data['username']}):
        return jsonify({'message': 'Username already exists'}), 409

    DEFAULT_USER = {
        "first_name": None,
        "last_name": None,
        "email": None,
        "phone": None,
        "address": None,
        "profile_picture": None,
        "created_at": datetime.datetime.utcnow(),
        "updated_at": datetime.datetime.utcnow(),
    }

    new_user = {**DEFAULT_USER, **{
        key: value for key, value in data.items()
        if key not in ["password"]
    }}

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    new_user['password'] = hashed_password

    users_collection.insert_one(new_user)

    return jsonify({'message': 'User registered successfully'}), 201

# User Login (Login Route)
@user_bp.route('/login', methods=['POST'])
@fields_error_coverage(required_fields=['username', 'password'])
def login_user():
    data = request.get_json()

    user = users_collection.find_one({'username': data['username']})

    if not user:
        return jsonify({'message': 'Invalid username or password'}), 401

    if not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({'message': 'Invalid username or password'}), 401

    token = jwt.encode({
        'username': user['username'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')

    user_data = {
        key: value for key, value in user.items() if key not in ['_id', 'password']
    }

    return jsonify({'token': token, 'user': user_data}), 200

# Update User Details
@user_bp.route('/update', methods=['PUT'])
@token_required
@fields_error_coverage(optional_fields=['email', 'phone', 'address', 'profile_picture', 'username', 'first_name', 'last_name'])
def update_user_details(current_user):
    data = request.get_json()

    updates = {key: value for key, value in data.items() if key in [
        'email', 'phone', 'address', 'profile_picture', 'username', 'first_name', 'last_name'
    ]}

    if 'username' in updates:
        existing_user = users_collection.find_one({'username': updates['username']})
        if existing_user:
            return jsonify({'message': 'Username already exists'}), 409

    users_collection.update_one(
        {'_id': current_user['_id']},
        {'$set': updates, '$currentDate': {'updated_at': True}}
    )

    return jsonify({'message': 'User updated successfully'}), 200

# Delete user (DELETE)
@user_bp.route('/delete', methods=['DELETE'])
@token_required
def delete_user(current_user):
    users_collection.delete_one({'username': current_user['username']})
    return jsonify({'message': 'User deleted successfully'}), 200