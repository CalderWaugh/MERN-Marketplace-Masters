from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import numpy as np
import random

# Products & features
products = [
    {'name': 'Prod1', 'popularity': 4, 'durability': 4, 'price': 2},
    {'name': 'Prod2', 'popularity': 5, 'durability': 5, 'price': 1},
    {'name': 'Prod3', 'popularity': 1, 'durability': 2, 'price': 3},
    {'name': 'Prod4', 'popularity': 2, 'durability': 4, 'price': 2},
    {'name': 'Prod5', 'popularity': 5, 'durability': 3, 'price': 2},
    {'name': 'Prod6', 'popularity': 3, 'durability': 4, 'price': 1},
    {'name': 'Prod7', 'popularity': 2, 'durability': 1, 'price': 2},
    {'name': 'Prod8', 'popularity': 1, 'durability': 4, 'price': 3},
    {'name': 'Prod9', 'popularity': 2, 'durability': 5, 'price': 2},
    {'name': 'Prod10', 'popularity': 3, 'durability': 1, 'price': 2}
]

# Extracting features into numpy array
X = np.array([[product['popularity'], product['durability'], product['price']] for product in products])

# Feature Scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
n_neighbors = 4  # kNN, including the current product
model = NearestNeighbors(n_neighbors=n_neighbors, algorithm='ball_tree') # 'ball_tree' algo for high-dimensional data.
model.fit(X_scaled)

# Generate recommendations
def get_recommendations(product_features, current_product_index):
    # Scale the product features
    scaled_product_features = scaler.transform([product_features])

    # Find nearest neighbors
    distances, indices = model.kneighbors(scaled_product_features)

    # Exclude the current product from recommendations
    recommended_products = [products[index]['name'] for index in indices[0] if index != current_product_index]

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
    'popularity': current_product['popularity'],
    'durability': current_product['durability'],
    'price': current_product['price']
}

print("\nCurrent Product Features:\n", current_product_features)

recommendations = get_recommendations(list(current_product_features.values()), current_product_index)
print("\nRecommended products:\n", recommendations)