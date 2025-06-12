# Bookstore API Documentation

Welcome to the Bookstore API documentation. This API provides endpoints for managing a bookstore application with user authentication, store management, book inventory, shopping cart, reviews, and API key management.

## Base URL
```
http://localhost:3000/api
```

## Authentication

The API uses JWT tokens for authentication. Tokens are set as HTTP-only cookies upon successful login.

### User Roles
- **BUYER**: Can purchase books, add reviews, manage cart
- **SELLER**: Can create stores, manage books, generate API keys

### Authentication Types
- **User Authentication**: Required for most endpoints
- **Seller Authentication**: Required for seller-specific operations
- **API Key Authentication**: Required for certain book management operations

## API Documentation by Feature

- [Authentication](./auth.md) - User registration, login, profile management
- [Store Management](./store.md) - Create and manage bookstores
- [Book Management](./books.md) - Add, update, and delete books
- [Shopping Cart](./cart.md) - Add and remove books from cart
- [Reviews](./reviews.md) - Add and manage book reviews
- [API Key Management](./api-key.md) - Generate and manage API keys

## Common Response Format

All API responses follow this structure:

```json
{
  "statusCode": "number",
  "message": "string",
  "data": "object | array | null"
}
```

## Common Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "data": null
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "data": null
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden",
  "data": null
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Not Found",
  "data": null
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "Conflict",
  "data": null
}
```

## Headers

### Required Headers for API Key Authentication
```
X-API-Key: your_public_key
X-API-Secret: your_private_key
```

### Content Type
```
Content-Type: application/json
```

## Notes

- All timestamps are in ISO 8601 format
- Private API keys are only shown once during generation and rotation
- Store owners can only manage their own stores and books
- Users can only manage their own cart and reviews