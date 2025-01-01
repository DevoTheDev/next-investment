from functools import wraps
from flask import request, jsonify

def fields_error_coverage(required_fields=None, optional_fields=None):
    """
    Decorator to validate and provide detailed error responses for required and optional fields.
    :param required_fields: List of required fields.
    :param optional_fields: List of optional fields.
    """
    required_fields = required_fields or []
    optional_fields = optional_fields or []

    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            data = request.get_json() or {}
            missing_required = [field for field in required_fields if field not in data]
            
            if missing_required:
                return jsonify({
                    "error": "Missing required fields.",
                    "missing_fields": missing_required,
                    "details": [
                        f"The following fields are required in the JSON body: {', '.join(required_fields)}.",
                        f"The following fields are optional in the JSON body: {', '.join(optional_fields)}."
                    ],
                    "example": {
                        "url_usage": {
                            "required_fields_in_url": {field: f"/<resource>?{field}=<value>" for field in required_fields},
                            "optional_fields_in_url": {field: f"/<resource>?{field}=<value>" for field in optional_fields}
                        },
                        "json_body": {
                            "required_fields": {field: f"<{field}_value>" for field in required_fields},
                            "optional_fields": {field: f"<{field}_value>" for field in optional_fields}
                        }
                    }
                }), 400

            return f(*args, **kwargs)

        return wrapped
    return decorator
