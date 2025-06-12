# Reviews API Documentation

Base URL: `/api/reviews`

## Endpoints

### 1. Add or Update Review
- **Method**: `POST`
- **Path**: `/:storeId/:bookId/`
- **Description**: Add a new review or update existing review for a book
- **Authentication**: Required (Seller token)

#### URL Parameters
- `storeId`: Store ID (string)
- `bookId`: Book ID (string)

#### Request Body
```json
{
  "rating": "number (1-5)",
  "comment": "string"
}
```

#### Sample Request
```json
{
  "rating": 5,
  "comment": "Excellent book! Highly recommended."
}
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Review received successfully",
  "data": {
    "cartItemId": {
      "id": "clh7x9z8y0000review123efgh",
      "user_id": "clh7x9z8y0000user1234efgh",
      "book_id": "clh7x9z8y0000book1234efgh",
      "store_id": "clh7x9z8y0000store123efgh",
      "rating": 5,
      "comment": "Excellent book! Highly recommended."
    }
  }
}
```

---

### 2. Delete Review
- **Method**: `DELETE`
- **Path**: `/:storeId/:bookId/delete`
- **Description**: Delete user's review for a specific book
- **Authentication**: Required (Seller token)

#### URL Parameters
- `storeId`: Store ID (string)
- `bookId`: Book ID (string)

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Review deleted successfully",
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