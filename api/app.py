import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import Resource, Base

app = Flask(__name__)
cors = CORS(app, origins='*')

# For CockroachCloud:
# DATABASE_URL=postgresql://<username>:<password>@<globalhost>:26257/<cluster_name>.defaultdb?sslmode=verify-full&sslrootcert=<certs_dir>/<ca.crt>
db_uri = os.environ['DATABASE_URL'].replace("postgresql://", "cockroachdb://")
engine = create_engine(db_uri, connect_args={"application_name":"vikings-robotics-api"})
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(engine)

@app.route("/api/resources", methods=['GET'])
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

if __name__ == "__main__":
    app.run(debug=True, port=8080)