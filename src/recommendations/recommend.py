import os
import pickle
import json
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from pymongo import MongoClient
import numpy as np
import random

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

# Save the trained model
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump((model, scaler), f)

# Generate recommendations
def get_recommendations(product_features, products):
    # Load the trained model
    with open(model_path, 'rb') as f:
        loaded_model, loaded_scaler = pickle.load(f)

    # Scale the product features
    scaled_product_features = loaded_scaler.transform([product_features])

    # Find nearest neighbors
    distances, indices = loaded_model.kneighbors(scaled_product_features)

    # Exclude the current product from recommendations
    recommended_products = [products[index]['Name'] for index in indices[0]]

    # Ensure exactly 3 unique products are recommended
    if len(recommended_products) > 3:
        recommended_products = recommended_products[:3]
    
    return recommended_products

# Iterate through products and add recommendations
for idx, product in enumerate(products, start=1):
    product_features = [product['Popularity'], product['Durability'], product['Price']]
    recommendations = get_recommendations(product_features, products)

    # Add recommendations as an attribute to the current product in the collection
    collection.update_one(
        {"_id": product["_id"]},
        {"$set": {"Recommendations": recommendations, "id": idx}}
    )

    # Print the Recommendations attribute of the current product
    updated_current_product = collection.find_one({"_id": product["_id"]})
    print("\nUpdated Product with Recommendations and Id:\n", updated_current_product.get("Recommendations", "Name"), updated_current_product.get("id"))

if __name__ == "__main__":
    print("Recommendations Generated")
import os
import pickle
import json
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from pymongo import MongoClient
import numpy as np
import random

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

# Save the trained model
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump((model, scaler), f)

# Generate recommendations
def get_recommendations(product_features, products):
    # Load the trained model
    with open(model_path, 'rb') as f:
        loaded_model, loaded_scaler = pickle.load(f)

    # Scale the product features
    scaled_product_features = loaded_scaler.transform([product_features])

    # Find nearest neighbors
    distances, indices = loaded_model.kneighbors(scaled_product_features)

    # Exclude the current product from recommendations
    recommended_products = [products[index]['Name'] for index in indices[0]]

    # Ensure exactly 3 unique products are recommended
    if len(recommended_products) > 4:
        recommended_products = recommended_products[:4]
    
    return recommended_products

# Iterate through products and add recommendations
for idx, product in enumerate(products, start=1):
    product_features = [product['Popularity'], product['Durability'], product['Price']]
    recommendations = get_recommendations(product_features, products)

    # Remove the current product's name from recommendations
    recommendations = [name for name in recommendations if name != product['Name']]

    # Ensure exactly 3 unique products are recommended
    recommendations = recommendations[:4]

    # Add recommendations as an attribute to the current product in the collection
    collection.update_one(
        {"_id": product["_id"]},
        {"$set": {"Recommendations": recommendations, "id": idx}}
    )

    # Print the Recommendations attribute of the current product
    updated_current_product = collection.find_one({"_id": product["_id"]})
    print("\nUpdated Product with Recommendations and Id:\n", updated_current_product.get("Recommendations", "Name"), updated_current_product.get("id"))

if __name__ == "__main__":
    print("Recommendations Generated")
