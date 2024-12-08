import pandas as pd
from sqlalchemy.orm import sessionmaker
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

def shingle(k=3):
    for i in range(5):
        # Query the specific row by Row_ID
        product = session.query(Superstore).filter(Superstore.Row_ID == i).first()

        if product and product.Product_Name:  # Check if the row exists and Product_Name is not null
            # Generate shingles for the Product_Name
            shingled_name = generate_shingles(product.Product_Name, k)
            shingled_string = ' '.join(shingled_name)  # Combine shingles into a single string

            # Update the Shin_Prod_Name column for the row
            product.Shin_Prod_Name = shingled_string

    # Commit all changes to the database
    session.commit()



data = openfile('superstore.csv') 
csv_to_sql(data) #only use once when moving csv data into sql

#shingle()

