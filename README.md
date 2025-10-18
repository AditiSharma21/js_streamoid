# JS Streamoid

JS Streamoid is a Node.js backend API for managing and filtering products from CSV files. It provides endpoints to get all products and filter them based on category and price range.

## Features

- Retrieve all products
- Filter products by category
- Filter products by price range
- Dockerized for easy deployment

## Installation

1. Clone the repository:
```
git clone <repo-url>
cd js_streamoid
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm start
```

Server will run at `http://localhost:3000`.

## API Endpoints

- **GET /api/products** — Get all products
- **GET /api/products/filter?category=Electronics&minPrice=500&maxPrice=1500** — Filter products

## Docker

Build and run using Docker:

```
docker build -t js_streamoid .
docker run -p 3000:3000 js_streamoid
```

## CSV Data

All product data is stored in `data/products.csv`. You can update this file to change the products.


