# Store API Documentation

Base URL: `/api/store`

## Endpoints

### 1. Create Store
- **Method**: `POST`
- **Path**: `/create`
- **Description**: Create a new store (sellers only)
- **Authentication**: Required (Seller token)

#### Request Body
```json
{
  "storeName": "string",
  "description": "string"
}
```

#### Sample Request
```json
{
  "storeName": "My Bookstore",
  "description": "A cozy bookstore with rare collections"
}
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Store created successfully",
  "data": {
    "id": "clh7x9z8y0000store1234efgh",
    "name": "My Bookstore",
    "description": "A cozy bookstore with rare collections"
  }
}
```

#### Error Response
```json
{
  "statusCode": 400,
  "message": "Store already exists",
  "data": {
    "storeName": "My Bookstore",
    "description": "Please choose a different store name."
  }
}
```

---

### 2. Get All Stores
- **Method**: `GET`
- **Path**: `/get`
- **Description**: Get all stores
- **Authentication**: Required (Seller token)

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "Stores fetched successfully",
  "data": [
    {
      "id": "clh7x9z8y0000store1234efgh",
      "name": "My Bookstore",
      "description": "A cozy bookstore with rare collections",
      "owner_id": "clh7x9z8y0000seller123efgh"
    }
  ]
}
```

---

### 3. Get Store by ID
- **Method**: `GET`
- **Path**: `/get/:storeId`
- **Description**: Get a specific store by ID
- **Authentication**: Required (Seller token)

#### URL Parameters
- `storeId`: Store ID (string)

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "Store fetched successfully",
  "data": {
    "id": "clh7x9z8y0000store1234efgh",
    "name": "My Bookstore",
    "description": "A cozy bookstore with rare collections",
    "owner_id": "clh7x9z8y0000seller123efgh"
  }
}
```

#### Error Response
```json
{
  "statusCode": 404,
  "message": "Store not found",
  "data": null
}
```

---

### 4. Update Store
- **Method**: `PUT`
- **Path**: `/`
- **Description**: Update store information (owner only)
- **Authentication**: Required (Seller token)

#### Request Body
```json
{
  "storeName": "string",
  "description": "string"
}
```

#### URL Parameters
- `storeId`: Store ID (string)

#### Sample Request
```json
{
  "storeName": "Updated Bookstore Name",
  "description": "Updated description"
}
```

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "Store updated successfully",
  "data": {
    "id": "clh7x9z8y0000store1234efgh",
    "name": "Updated Bookstore Name",
    "description": "Updated description"
  }
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
  "statusCode": 403,
  "message": "Forbidden",
  "data": null
}
```

---

### 5. Delete Store
- **Method**: `DELETE`
- **Path**: `/`
- **Description**: Delete a store (owner only)
- **Authentication**: Required (Seller token)

#### URL Parameters
- `storeId`: Store ID (string)

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "Store deleted successfully",
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
  "statusCode": 403,
  "message": "Forbidden",
  "data": null
}
```