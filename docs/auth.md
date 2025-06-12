# Authentication API Documentation

Base URL: `/api/auth`

## Endpoints

### 1. Register User
- **Method**: `POST`
- **Path**: `/register`
- **Description**: Register a new user account
- **Authentication**: None required

#### Request Body
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "BUYER" | "SELLER"
}
```

#### Sample Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "BUYER"
}
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "userid": "clh7x9z8y0000abcd1234efgh"
  }
}
```

#### Error Response
```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "data": null
}
```

---

### 2. Login User
- **Method**: `POST`
- **Path**: `/login`
- **Description**: Authenticate user and set access token cookie
- **Authentication**: None required

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Sample Request
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Sample Response
```json
{
  "statusCode": 201,
  "message": "User logged in successfully",
  "data": null
}
```

#### Error Response
```json
{
  "statusCode": 401,
  "message": "Invalid Credentials",
  "data": null
}
```

---

### 3. Get User Profile
- **Method**: `GET`
- **Path**: `/profile`
- **Description**: Get current user's profile information
- **Authentication**: Required (User token)

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "User profile fetched successfully",
  "data": {
    "id": "clh7x9z8y0000abcd1234efgh",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "BUYER",
    "is_email_verified": true
  }
}
```

#### Error Response
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "data": null
}
```

---

### 4. Logout User
- **Method**: `DELETE`
- **Path**: `/logout`
- **Description**: Logout user and clear access token cookie
- **Authentication**: Required (User token)

#### Sample Response
```json
{
  "statusCode": 200,
  "message": "User logged out successfully",
  "data": null
}
```