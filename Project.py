import json
import pandas as pd
import math, hashlib
from sqlalchemy.orm import sessionmaker
from sqlalchemy.types import JSON
from db_op import Superstore, engine


Session = sessionmaker(bind=engine)
session = Session()

# Load the CSV file
def openfile(inputfile):
    data = pd.read_csv(inputfile, encoding='utf-8')
    return data

#transfer data to sql, only need to call once when starting project
def csv_to_sql(data):
    for _, row in data.iterrows():
        sql_row = Superstore(
            Category=row['Category'],
            City=row['City'],
            Country=row['Country'],
            Customer_ID=row['Customer.ID'],
            Customer_Name=row['Customer.Name'],
            Discount=row['Discount'],
            Market=row['Market'],
            Order_Date=row['Order.Date'],
            Order_ID=row['Order.ID'],
            Order_Priority=row['Order.Priority'],
            Product_ID=row['Product.ID'],
            Product_Name=row['Product.Name'],
            Profit=row['Profit'],
            Quantity=row['Quantity'],
            Region=row['Region'],
            Row_ID=row['Row.ID'],
            Sales=row['Sales'],
            Segment=row['Segment'],
            Ship_Date=row['Ship.Date'],
            Ship_Mode=row['Ship.Mode'],
            Shipping_Cost=row['Shipping.Cost'],
            State=row['State'],
            Sub_Category=row['Sub.Category'],
            Year=row['Year'],
            Market2=row['Market2'],
            weeknum=row['weeknum']
        )
        session.add(sql_row)
    session.commit()

def generate_shingles(text, k):
    n = len(text)
    shingles = []
    for i in range(n - k + 1):
        shingle = text[i:i + k]
        shingles.append(shingle)
    return shingles

def shingle(k):
    for i in range(5):
        product = session.query(Superstore).filter(Superstore.Row_ID == i).first()
        
        if product and product.Product_Name:  #check if the row exists / Product_Name is not null
            shingled_name = generate_shingles(product.Product_Name, k)
            shingled_string = ' '.join(shingled_name)  #combine shingles into a single string

            product.product_shingle = shingled_string
    session.commit()

def generate_minhash(shingled_text):
        #splitting text since it is saved as a string instead of a list of shingles
        text = shingled_text.split()
        signature = []
        for i in range(10):
            min_hash = math.inf
            for shingle in text:
                hash_val = int(hashlib.sha1((str(shingle) + str(i)).encode()).hexdigest(), 16)
                if hash_val < min_hash:
                    min_hash = hash_val
            signature.append(min_hash)
        return signature

def minhash():
    #i=0 for range 1
    for i in range(4):
        shingle = session.query(Superstore).filter(Superstore.Row_ID == i).first()

        if shingle and shingle.product_shingle:
            minhash_sig = generate_minhash(shingle.product_shingle)
            product_sig = json.dumps(minhash_sig)
            shingle.product_minhash = product_sig
    session.commit()

data = openfile('superstore.csv') 
#csv_to_sql(data) #only use once when moving csv data into sql

shingle()

