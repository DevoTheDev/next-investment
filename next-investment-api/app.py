from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from blueprints.user_bp import user_bp
from blueprints.investor_bp import investor_bp
from json import JSONEncoder
from bson import ObjectId
from custom_logging.custom_log import custom_log
from db import db

app = Flask(__name__)

# CORS configuration
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
port = 7007
load_dotenv()

@app.route('/test', methods=['GET'])
def test_connection():
    # Attempt to find one document to test the connection
    try:
        collection_names = db.list_collection_names()
        return {"status": "success", "collections": collection_names}, 200
    except Exception as e:
        return {"status": "fail", "message": str(e)}, 500
    
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(investor_bp, url_prefix='/investor')

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(CustomJSONEncoder, self).default(obj)
    
if __name__ == '__main__':
    custom_log("SUCCESS", f"Next Investment Server running on port {port}.")
    app.run(host="0.0.0.0", port=port, debug=True)
