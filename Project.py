import pandas as pd

# Load the CSV file
def openfile(inputfile):
    data = pd.read_csv(inputfile, encoding='utf-8')
    return data

#normalize strings and remove empty spaces
def preprocess(data):
    data = data.fillna('N/A')
    data = data[['Category', 'Country', 'Product.Name']] 
    data = data.replace(' ', '')
    for col in data.columns:
        data[col] = data[col].str.lower()
    return data

def generate_shingles(text, k):
    n = len(text)
    shingles = []
    for i in range(n - k + 1):
        shingle = text[i:i + k]
        shingles.append(shingle)
    return shingles

data = openfile('superstore.csv') 
prep_data = preprocess(data) 

product_shingles = prep_data['Product.Name'].apply(lambda x: generate_shingles(x, 3))
print(product_shingles.head())