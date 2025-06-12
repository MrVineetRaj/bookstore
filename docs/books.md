# Books API Documentation

Base URL: `/api/books`

## Endpoints

### 1. Add Book to Store
- **Method**: `POST`
- **Path**: `/:storeId/add-book`
- **Description**: Add a new book to a store
- **Authentication**: Required (Seller token + API Key)

#### URL Parameters
- `storeId`: Store ID (string)

#### Request Body
```json
{
  "title": "string",
  "description": "string (optional)",
  "author": "string",
  "price": "number",
  "cover_image": "string (optional)"
}
```

#### Sample Request
```json
{
  "title": "The Great Gatsby",
  "description": "A classic American novel",
  "author": "F. Scott Fitzgerald",
  "price": 15.99,
  "cover_image": "https://example.com/cover.jpg"
}
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Api key generated successfully",
  "data": {
    "bookid": "clh7x9z8y0000book1234efgh"
  }
}
```

#### Error Response
```json
{
  "statusCode": 400,
  "message": "Book already in store",
  "data": {
    "bookid": "clh7x9z8y0000book1234efgh"
  }
}
```

```json
{
  "statusCode": 404,
  "message": "Store not found",
  "data": null
}
```

---

### 2. Update Book
- **Method**: `PUT`
- **Path**: `/:storeId/update/:bookId`
- **Description**: Update book information
- **Authentication**: Required (Seller token + API Key)

#### URL Parameters
- `storeId`: Store ID (string)
- `bookId`: Book ID (string)

#### Request Body
```json
{
  "title": "string",
  "description": "string (optional)",
  "author": "string",
  "price": "number",
  "cover_image": "string (optional)"
}
```

#### Sample Request
```json
{
  "title": "The Great Gatsby - Updated Edition",
  "description": "A classic American novel with new foreword",
  "author": "F. Scott Fitzgerald",
  "price": 18.99,
  "cover_image": "https://example.com/new-cover.jpg"
}
```

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "Api key deleted successfully",
  "data": null
}
```

#### Error Responses
```json
{
  "statusCode": 404,
  "message": "Store not found",
  "data": null
}
```

```json
{
  "statusCode": 400,
  "message": "Book not found",
  "data": null
}
```

---

### 3. Delete Book from Store
- **Method**: `DELETE`
- **Path**: `/:storeId/delete/:bookId`
- **Description**: Delete a book from store
- **Authentication**: Required (Seller token + API Key)

#### URL Parameters
- `storeId`: Store ID (string)
- `bookId`: Book ID (string)

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Book deleted successfully",
  "data": null
}
```

#### Error Response
```json
{
  "statusCode": 404,
  "message": "Book not found",
  "data": null
}
```