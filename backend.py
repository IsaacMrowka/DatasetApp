import json, Flask
from flask import jsonify, request
from sqlalchemy.orm import sessionmaker
from sqlalchemy.types import JSON
from db_op import Superstore, engine

Session = sessionmaker(bind=engine)
session = Session()


app = Flask(__name__)

#fetches the search query from frontend
@app.route('/search', methods = ['POST','GET'])
def search():
    data = request.get_json
    query_input = data.get('query')

    results = []
    for i in range(4):
        product_name = session.query(Superstore).filter(Superstore.Row_ID == i).first()    
        if product_name and query_input == product_name:
            results.append(product_name.Category)
    
    return jsonify(results)

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