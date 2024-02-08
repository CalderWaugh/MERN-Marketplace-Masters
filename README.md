# MERN-Marketplace-Masters

**Contributors:**

***Calder Waugh***

***April Breen***


## Capstone: Online Store

### Overview
Create an online store. Your React app will have a landing page with a few featured products, a search box, and a list of categories. When the user inputs search text, you'll present them with a list of products that match. Similarly, if a user selects a category, they'll get a list of products in that category. Selecting a product brings up the detailed information about that product including an "Add to cart" button.

### LOOKING AT THE CART AND CHECKING OUT
When the user is finished shopping, the checkout view will show them all the products in their cart, an order total, and a place for them to put their payment and shipping info. When they checkout, their cart is cleared, and the order is saved to the database.

### Building the Application
1.	Choose Mongo DB for backend data.
2.	Use node.js to build a web service to read and write data.
3.	Build the web application in React.
### Data Analysis
1.	Create a script that generates and populates the database with a minimum of 1000 records of dummy data.
2.	Train a model using sklearn.neighbors.NearestNeighbors algorithm to recommend products based on current purchase.
3.	Add attributes such as popularity, durability, and price to each product to make predictions more accurate.
4.	Create a React component that can take a product as input and pass that to the model using a RESTful service. Display the returned recommended products.
a.	TIP: Investigate using the python-shell npm package in Express to call Python from JavaScript. Another option is to use Flask to create the RESTful service.

