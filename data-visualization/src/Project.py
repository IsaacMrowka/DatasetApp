from flask import Flask, jsonify, request
import pandas as pd

app = Flask(__name__)

# Load the CSV file
def openfile(inputfile):
    try:
        data = pd.read_csv(inputfile, encoding='utf-8')
        return data
    except FileNotFoundError:
        return None

# Normalize strings and remove empty spaces
def preprocess(data):
    data = data.fillna('N/A')
    data = data[['Category', 'Country', 'Product.Name']]
    data = data.replace(' ', '')
    for col in data.columns:
        data[col] = data[col].str.lower()
    return data

# Generate k-shingles
def generate_shingles(text, k):
    n = len(text)
    shingles = []
    for i in range(n - k + 1):
        shingle = text[i:i + k]
        shingles.append(shingle)
    return shingles

# API endpoint to process data
@app.route('/process-data', methods=['GET'])
def process_data():
    input_file = 'superstore.csv'
    data = openfile(input_file)
    if data is None:
        return jsonify({"error": "File not found"}), 404

    processed_data = preprocess(data)
    processed_data['shingles'] = processed_data['Product.Name'].apply(lambda x: generate_shingles(x, 3))
    
    # Convert data to a dictionary for API response
    response = {
        "data": processed_data.to_dict(orient='records'),
    }
    return jsonify(response)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
