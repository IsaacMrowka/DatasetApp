import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, 'project_database.db')
db_url = f'sqlite:///{db_path}'
engine = create_engine(db_url)
Base = declarative_base()

class Superstore(Base):
    __tablename__ = "superstores"
    Category = Column(String)
    City = Column(String)
    Country = Column(String)
    Customer_ID = Column(Integer, primary_key=True)
    Customer_Name = Column(String)
    Discount = Column(String)
    Market = Column(String)
    记录数 = Column(Integer)
    Order_Date = Column(String)
    Order_ID = Column(Integer, primary_key=True)
    Order_Priority = Column(String)
    Product_ID = Column(Integer, primary_key=True)
    Product_Name = Column(String)
    Profit = Column(Integer)
    Quantity = Column(Integer)
    Region = Column(String)
    Row_ID = Column(Integer, primary_key=True)
    Sales = Column(Integer)
    Segment = Column(Integer)
    Ship_Date = Column(Integer)
    Ship_Mode = Column(String)
    Shipping_Cost = Column(Integer)
    State = Column(String)
    Sub_Category = Column(String)
    Year = Column(Integer)
    Market2 = Column(String)
    weeknum = Column(Integer)
    Shin_Prod_Name = Column(String)
Base.metadata.create_all(engine)