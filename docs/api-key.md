# API Key Management Documentation

Base URL: `/api/api-key`

## Endpoints

### 1. Generate API Key
- **Method**: `POST`
- **Path**: `/generate`
- **Description**: Generate a new API key pair (public and private)
- **Authentication**: Required (Seller token)

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Api key generated successfully",
  "data": {
    "pub_key": "bks_a1b2c3d4e5f6",
    "priv_key": "bks_priv_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    "id": "clh7x9z8y0000apikey123efgh",
    "description": "Private key will not be shown again, please save it securely."
  }
}
```

---

### 2. Rotate API Key
- **Method**: `POST`
- **Path**: `/rotate/:apiKeyId`
- **Description**: Rotate (regenerate) the private key for an existing API key
- **Authentication**: Required (Seller token)

#### URL Parameters
- `apiKeyId`: API Key ID (string)

#### Request Body
```json
{
  "pub_key": "string"
}
```

#### Sample Request
```json
{
  "pub_key": "bks_a1b2c3d4e5f6"
}
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "Private key rotated successfully",
  "data": {
    "pub_key": "bks_a1b2c3d4e5f6",
    "priv_key": "bks_priv_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6",
    "id": "clh7x9z8y0000apikey123efgh",
    "description": "Private key will not be shown again, please save it securely."
  }
}
```

#### Error Response
```json
{
  "statusCode": 404,
  "message": "Api key not found",
  "data": {
    "pub_key": "bks_a1b2c3d4e5f6",
    "id": "clh7x9z8y0000apikey123efgh",
    "description": "Please check the provided public key."
  }
}
```

---

### 3. Delete API Key
- **Method**: `DELETE`
- **Path**: `/delete/:apiKeyId`
- **Description**: Delete an API key
- **Authentication**: Required (Seller token)

#### URL Parameters
- `apiKeyId`: API Key ID (string)

#### Request Body
```json
{
  "pub_key": "string"
}
```

#### Sample Request
```json
{
  "pub_key": "bks_a1b2c3d4e5f6"
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

#### Error Response
```json
{
  "statusCode": 404,
  "message": "Api key not found",
  "data": {
    "pub_key": "bks_a1b2c3d4e5f6",
    "id": "clh7x9z8y0000apikey123efgh",
    "description": "Please check the provided public key."
  }
}
```

---

### 4. Get All API Keys
- **Method**: `GET`
- **Path**: `/`
- **Description**: Get all API keys for the authenticated seller
- **Authentication**: Required (Seller token)

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "Api keys fetched successfully",
  "data": [
    {
      "id": "clh7x9z8y0000apikey123efgh",
      "pub_key": "bks_a1b2c3d4e5f6",
      "created_at": "2023-05-15T10:30:00.000Z",
      "updated_at": "2023-05-15T10:30:00.000Z"
    }
  ]
}
```