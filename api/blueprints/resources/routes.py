from flask import Blueprint, request, jsonify
from api.database import SessionLocal
from api.blueprints.resources.models import Resource

resources = Blueprint('resources', __name__)

@resources.route("/api/resources", methods=['GET'])
def get_resources():
    session = SessionLocal()
    try: 
        category = request.args.get('category')
        query = session.query(Resource)

        if (category):
            query = query.filter(Resource.category.contains(category))
        
        resources = query.all()
        
        filtered = []
        for r in resources:
            filtered.append({
                "id": str(r.id),
                "category": r.category,
                "title": r.title,
                "description": r.description,
                "link": r.link
            })

        return jsonify(filtered), 200
    except Exception as e:
        return jsonify({"Error:": str(e)}), 500
    finally:
        session.close()