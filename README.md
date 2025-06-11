# BookBazaar – REST API for Online Bookstore

To build a backend API for an online bookstore that allows users to browse, purchase, and review books. The project simulates a lightweight e-commerce system with real-world backend design challenges.

# 🎯 End Goal

- Working backend with full CRUD for books, reviews, orders
- JWT-based user authentication
- API key generation to access product and order routes
- Middleware for authentication and key verification
- Full Postman collection with testable endpoints and examples
- Bonus: Razorpay payment integration

# 📊 Tables to be Created

- users
- api_keys
- books
- reviews
- orders
- cart_items (bonus enhancement)
- payments (bonus, for mock gateway)

# 🧾 API Routes to Build

## 🔐 Auth & API Key

- POST /auth/register → Register user
- POST /auth/login → Login user
- POST /auth/api-key → Generate new API key
- GET /auth/me → Get user profile

## 📚 Book Routes

- POST /books → Add a book (Admin only)
- GET /books → List all books (public, supports filters)
- GET /books/:id → Get book details
- PUT /books/:id → Update book (Admin only)
- DELETE /books/:id → Delete book (Admin only)

## ✍️ Review Routes

- POST /books/:bookId/reviews → Add review to a book
- GET /books/:bookId/reviews → List reviews for a book
- DELETE /reviews/:id → Delete review (owner only)

## 🛒 Order Routes

- POST /orders → Place an order
- GET /orders → List user’s orders
- GET /orders/:id → Order details

## 💳 Payment Mock API (Bonus)

- POST /payments/create → Create a fake Razorpay payment ID
- POST /payments/verify → Verify mock payment

# 🛡️ Security

- JWT Auth required for reviews and orders
- Admin check middleware for book creation/deletion
- API Key middleware for accessing /books, /orders, /payments

# 🧠 Enhancements (Bonus)

- Razorpay integration (mock/real) with callback simulation
- Add search, sort, and filters to book list (e.g., by author, genre)
- Cart system using cart_items table
- Pagination for listing endpoints
- Email confirmation on order (mocked or real with Mailtrap)

# ✅ Deliverables Checklist

- Auth + API Key (JWT, key generation)
- Book CRUD with Admin checks
- Reviews & Orders functionality
- Middleware (JWT, API Key, Admin)
- DB structure & relationships
- Code structure & quality
- Postman collection
- Bonus features (Razorpay, filters, cart, pagination, email)
