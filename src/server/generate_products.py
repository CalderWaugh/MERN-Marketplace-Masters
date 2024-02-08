import json
import random

def generate_products():
    products = []
    for _ in range(1000):
        popularity = random.randint(1,5)
        durability = random.randint(1,5)
        length = random.randint(6,48)
        # depending price on length & durability
        if 6 <= length <= 12 and durability <= 2:
            actual_price = random.randint(5,10)

        elif 6 <= length <= 12 and durability >= 3:
            actual_price = random.randint(11,15)

        elif 13 <= length <= 16 and durability <= 2:
            actual_price = random.randint(11,15)

        elif 13 <= length <= 16 and durability >= 3:
            actual_price = random.randint(16,20)

        elif 17 <= length <= 24 and durability <= 2:
            actual_price = random.randint(16,20)

        elif 17 <= length <= 24 and durability >= 3:
            actual_price = random.randint(21,30)

        if 25 <= length <= 36 and durability <= 2:
            actual_price = random.randint(21,30)

        elif 25 <= length <= 36 and durability >= 3:
            actual_price = random.randint(31,40)

        elif 37 <= length <= 48 and durability <= 2:
            actual_price = random.randint(31,40)

        else:
            actual_price = random.randint(41,50)

        if actual_price < 11:
            price = 1
        if 11 <= actual_price <= 20:
            price = 2
        if 21 <= actual_price <= 30:
            price = 3
        else:
            price = 4

        product = {
            "Popularity": popularity,
            "Durability": durability,
            "Length": length,
            "Actual_Price": actual_price,
            "Price": price
        }
        products.append(product)

    return products


def create_json(products):
    with open ('new_products.json', 'w') as file:
        json.dump(products, file, indent=4)


if __name__ == "__main__":
    generated_products = generate_products()
    create_json(generated_products)
    print("Products have been generated and saved to new_products.json")
        
    