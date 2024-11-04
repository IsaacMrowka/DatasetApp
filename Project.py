import csv

def openfile(inputfile):
    with open(inputfile, 'r',encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)
        category = []
        categoryset = []
        for row in csv_reader:
            category = row[0]
            categoryset.append({category: 1})
        itemset=[]
        itemset.append(categoryset)
        print(itemset)

openfile('superstore.csv')