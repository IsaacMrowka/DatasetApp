import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
from db_op import Superstore, engine

Session = sessionmaker(bind=engine)
session = Session()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"] ,supports_credentials=True)  # Enable CORS for all routes


#fetches the search query from frontend
@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query_input = data.get('query', '')

    results = []
    for i in range(100):
        product = session.query(Superstore).filter(Superstore.Row_ID == i).first()
        if product and query_input.lower() in product.Product_Name.lower():
            results.append(product.Category)

    return jsonify({"results": results})

#compare and save data from DB that matches query
#return jsonify that frontend will ask for
#const res = await axios.get('fetch')

#for now only returns category
#next change to send more data and send data only from minhash with threshold higher than 't'


def jaccard(doc, i, j):
    set1 = set(doc[i])
    set2 = set(doc[j])
    intersection = len((set1).intersection(set2))
    union = len((set1).union(set2))
    return intersection/union

if __name__ == "__main__":
    app.run(debug=True)