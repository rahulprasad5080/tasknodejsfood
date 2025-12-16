# Food Delivery Backend (Node.js)

Backend API for the Food Delivery Application built with Express and MongoDB.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Connection URI (Online or Local)

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Review `.env` file:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string_here
    JWT_SECRET=your_jwt_secret_key
    ```
    *Note: Replace `your_mongodb_connection_string_here` with your actual MongoDB Atlas URI.*

3.  **Run Server**
    - Development:
      ```bash
      npm run dev
      ```
    - Production:
      ```bash
      npm start
      ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get current user profile

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `POST /api/restaurants` - Add a restaurant (Admin only)

### Foods
- `GET /api/foods/:restaurantId` - Get foods for a restaurant
- `POST /api/foods` - Add food (Admin only)
- `PUT /api/foods/:id` - Update food (Admin only)
- `DELETE /api/foods/:id` - Delete food (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update item quantity
