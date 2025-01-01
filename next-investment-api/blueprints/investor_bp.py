from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
import datetime
from blueprints.user_bp import token_required
from custom_logging.fields_error_coverage import fields_error_coverage
from db import db

# Blueprint for investors
investor_bp = Blueprint('Investor', __name__)

# MongoDB collections
users_collection = db['users']
investments_collection = db['investments']

@investor_bp.route('/investments', methods=['GET'])
@investor_bp.route('/investments/<investment_id>', methods=['GET'])
@token_required
def get_investments(current_user, investment_id=None):
    if investment_id:
        # If an investment_id is provided, return that specific investment
        if not ObjectId.is_valid(investment_id):
            return jsonify({"error": "Invalid investment_id format"}), 400

        # Fetch the specific investment based on investment_id and user_id
        investment = investments_collection.find_one({
            "_id": ObjectId(investment_id),
            "user_id": current_user["_id"]
        })

        if not investment:
            return jsonify({"error": "Investment not found"}), 404

        # Convert _id and user_id to string for JSON response
        investment["_id"] = str(investment["_id"])
        investment["user_id"] = str(investment["user_id"])

        return jsonify({"investment": investment}), 200
    else:
        # If no investment_id is provided, return all investments for the user
        investments = list(investments_collection.find({"user_id": current_user["_id"]}))
        for investment in investments:
            investment["_id"] = str(investment["_id"])
            investment["user_id"] = str(investment["user_id"])

        return jsonify({"investments": investments}), 200

@investor_bp.route('/invest', methods=['POST'])
@token_required
@fields_error_coverage(required_fields=["ticker", "shares", "purchase_price"], optional_fields=["current_value"])
def add_investment(current_user):
    # If no errors, proceed with normal logic
    data = request.get_json()
    investment = {
        "user_id": current_user["_id"],
        "ticker": data["ticker"],
        "shares": data["shares"],
        "purchase_price": data["purchase_price"],
        "purchase_date": datetime.datetime.utcnow(),
        "current_value": data.get("current_value", data["purchase_price"]),
    }
    result = investments_collection.insert_one(investment)
    return jsonify({"message": "Investment added successfully", "investment_id": str(result.inserted_id)}), 201

@investor_bp.route('/investment/<investment_id>', methods=['PUT'])
@token_required
@fields_error_coverage(required_fields=["ticker", "shares", "purchase_price"], optional_fields=["current_value"])
def adjust_investment(current_user, investment_id):
    # Check if the investment_id is valid
    if not ObjectId.is_valid(investment_id):
        return jsonify({"error": "Invalid investment_id format"}), 400

    # If no errors, proceed with normal logic
    data = request.get_json()
    investment = investments_collection.find_one({
        "_id": ObjectId(investment_id),
        "user_id": current_user["_id"]
    })

    if not investment:
        return jsonify({"error": "Investment not found"}), 404

    # Prepare the updated investment details
    updated_investment = {
        "ticker": data["ticker"],
        "shares": data["shares"],
        "purchase_price": data["purchase_price"],
        "current_value": data.get("current_value", data["purchase_price"]),  # Default to purchase price if no current_value is provided
        "last_updated": datetime.datetime.utcnow()
    }

    # Update the investment in the database
    investments_collection.update_one(
        {"_id": ObjectId(investment_id)},
        {"$set": updated_investment}
    )

    return jsonify({"message": "Investment adjusted successfully"}), 200

@investor_bp.route('/divest/<investment_id>', methods=['DELETE'])
@token_required
def divest_investment(current_user, investment_id):
    # Validate the investment_id
    if not ObjectId.is_valid(investment_id):
        return jsonify({"error": "Invalid investment_id format"}), 400

    # Find the investment to delete
    investment = investments_collection.find_one({
        "_id": ObjectId(investment_id),
        "user_id": current_user["_id"]
    })

    if not investment:
        return jsonify({"error": "Investment not found"}), 404

    # Delete the investment from the database
    investments_collection.delete_one({"_id": ObjectId(investment_id)})

    return jsonify({"message": "Investment divested (deleted) successfully"}), 200

