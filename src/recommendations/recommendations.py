from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import numpy as np
import random

# Given product features
products = {
    'Prod1': {'popularity': 4, 'durability': 4, 'price': 2},
    'Prod2': {'popularity': 5, 'durability': 5, 'price': 1},
    'Prod3': {'popularity': 1, 'durability': 2, 'price': 3},
    'Prod4': {'popularity': 2, 'durability': 4, 'price': 2},
    'Prod5': {'popularity': 5, 'durability': 3, 'price': 2},
    'Prod6': {'popularity': 3, 'durability': 4, 'price': 1},
    'Prod7': {'popularity': 2, 'durability': 1, 'price': 2},
    'Prod8': {'popularity': 1, 'durability': 4, 'price': 3},
    'Prod9': {'popularity': 2, 'durability': 5, 'price': 2},
    'Prod10': {'popularity': 3, 'durability': 1, 'price': 2},
}

# Extracting features into numpy array
X = np.array([[product['popularity'], product['durability'], product['price']] for product in products.values()])

# Feature Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train Model
n_neighbors = 2  # kNN
model = NearestNeighbors(n_neighbors=n_neighbors, algorithm='ball_tree')
model.fit(X_scaled)

# Generate recommendations
def get_recommendations(product_features):
    # Scale the product features
    scaled_product_features = scaler.transform([product_features])

    # Find nearest neighbors
    distances, indices = model.kneighbors(scaled_product_features)

    # Recommendations are the products corresponding to the nearest neighbors
    recommended_products = [list(products.keys())[index] for index in indices[0]]
    return recommended_products

# Example
# current_product_features = [4, 4, 2]  # Replace with actual features of the current product
current_product_features = [random.randint(1, 5) if i != 2 else random.randint(1, 3) for i in range(3)]
print("Current Product Features: ", current_product_features)

recommendations = get_recommendations(current_product_features)
print("Recommended products:", recommendations)
