from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from pymongo import MongoClient
import numpy as np
import random
import json

host = 'localhost'
port = 27017
database_name = 'UmbrellaStore'
collection_name = 'products'
client = MongoClient(host, port)
db = client[database_name]
collection = db[collection_name]

# Extracting features into numpy array
products = list(collection.find())
X = np.array([[product['Popularity'], product['Durability'], product['Price']] for product in products])

# Feature Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
n_neighbors = 4  # kNN, including the current product
model = NearestNeighbors(n_neighbors=n_neighbors, algorithm='ball_tree') # 'ball_tree' algo for high-dimensional data.
model.fit(X_scaled)

# Generate recommendations
def get_recommendations(product_features, current_product_index, products):
    # Scale the product features
    scaled_product_features = scaler.transform([product_features])

    # Find nearest neighbors
    distances, indices = model.kneighbors(scaled_product_features)

    # Exclude the current product from recommendations
    recommended_products = [products[index]['Name'] for index in indices[0] if index != current_product_index]

    # Ensure exactly 3 unique products are recommended
    if len(recommended_products) > 3:
        recommended_products = recommended_products[:3]
    
    return recommended_products

# Example
current_product_index = random.randint(0, len(products) - 1)
current_product = products[current_product_index]
print("\n\nSelected Product:\n", current_product)

# Extracting features from the current_product dictionary
current_product_features = {
    'Popularity': current_product['Popularity'],
    'Durability': current_product['Durability'],
    'Price': current_product['Price']
}

print("\nCurrent Product Features:\n", current_product_features)

recommendations = get_recommendations(list(current_product_features.values()), current_product_index, products)
print("\nRecommended products:\n", recommendations)

def create_json(recommendations):
    with open ('new_recommendations.json', 'w') as file:
        json.dump(recommendations, file, indent=4)

if __name__ == "__main__":
    create_json(recommendations)
    print("Recommendations have been generated and saved to new_recommendations.json")