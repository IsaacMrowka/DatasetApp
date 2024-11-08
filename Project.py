import pandas as pd

def openfile(inputfile):
    data = pd.read_csv(inputfile, encoding='utf-8')
    data = str(data).lower().replace(" ", "")
    return data

def generate_shingles(data, k):
    n = len(data)
    shingles = []
    for i in range(n-k+1):
        shingle = ''.join(data[i:i+k])
        shingles.append(shingle)
    return shingles

data = openfile('superstore.csv')
shingled_data = generate_shingles(data, 3)

print(shingled_data)

