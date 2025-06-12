# Cart API Documentation

Base URL: `/api/cart`

## Endpoints

### 1. Add to Cart
- **Method**: `POST`
- **Path**: `/add`
- **Description**: Add a book to user's cart or update quantity
- **Authentication**: Required (Seller token)

#### Query Parameters
- `bookId`: Book ID (string)

#### Request Body
```json
{
  "quantity": "number"
}
```

#### Sample Request
```
POST /api/cart/add?bookId=clh7x9z8y0000book1234efgh
```

```json
{
  "quantity": 2
}
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Book added to cart",
  "data": {
    "cartItemId": "clh7x9z8y0000cart1234efgh"
  }
}
```

---

### 2. Remove from Cart
- **Method**: `DELETE`
- **Path**: `/delete`
- **Description**: Remove a book from user's cart
- **Authentication**: Required (Seller token)

#### Query Parameters
- `bookId`: Book ID (string)

#### Sample Request
```
DELETE /api/cart/delete?bookId=clh7x9z8y0000book1234efgh
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Book deleted from cart",
  "data": null
}
```

#### Error Response
```json
{
  "statusCode": 404,
  "message": "Item not found",
  "data": null
}
```