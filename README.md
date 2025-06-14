# 📡 Data Pusher – Node.js Developer Assessment

A Node.js + Express application that receives incoming JSON data for an account and asynchronously forwards it to various destination webhooks using Bull Queue and Redis.

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Role-based Access Control (Admin, Normal User)
- ✅ CRUD for Accounts, Destinations, and Account Members
- ✅ Secure Data Ingestion via `/incoming_data` with `CL-X-TOKEN` and `CL-X-EVENT-ID`
- ✅ Asynchronous Processing using Bull.js & Redis
- ✅ Request Logging (Success/Failure)
- ✅ Rate Limiting on Data Ingestion Endpoint
- ✅ MongoDB with Mongoose
- ✅ Modular MVC Architecture
- ✅ Postman Collection for API Testing

---

## 📁 Project Structure

/Data_pusher
│
├── app.js
├── server.js
├── seed.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
│
├── controllers/
│   ├── accountController.js
│   ├── authController.js
│   ├── dataHandlerController.js
│   ├── destinationController.js
│   ├── logController.js
│   └── memberController.js
│
├── jobs/
│   ├── dispatcher.js
│   └── queue.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── rateLimiter.js
│
├── models/
│   ├── Account.js
│   ├── Destination.js
│   ├── Log.js
│   ├── Member.js
│   ├── Role.js
│   └── User.js
│
├── routes/
│   ├── accountRoutes.js
│   ├── authRoutes.js
│   ├── dataHandlerRoutes.js
│   ├── destinationRoutes.js
│   ├── logRoutes.js
│   └── memberRoutes.js
│
├── utils/
│   ├── generateToken.js
│   └── validators.js

---

## 🛠️ Technologies Used

- Node.js (LTS)
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Bull.js + Redis (async queue)
- rate-limiter-flexible (rate limiting)
- express-validator (validation)
- Postman (API documentation & testing)

---

## 🔐 Roles

| Role        | Permissions                                      |
|-------------|--------------------------------------------------|
| **Admin**   | Full CRUD (accounts, destinations, members), logs |
| **User**    | Read/Update access only                          |

---

## 🔄 Async Data Flow

1. `POST /api/data/incoming_data`
2. Header must include:
   - `CL-X-TOKEN`: app_secret_token from account
   - `CL-X-EVENT-ID`: unique ID per request
3. Payload added to Redis-backed Bull queue
4. Dispatcher processes queue → sends data to each destination
5. Logs success/failure per destination

---

## 📬 API Endpoints

| Method | Endpoint                      | Description                        |
|--------|-------------------------------|------------------------------------|
| POST   | /api/auth/register            | Register user                      |
| POST   | /api/auth/login               | Login user                         |
| GET    | /api/account                  | Get all accounts (auth required)   |
| POST   | /api/account                  | Create account                     |
| POST   | /api/destination              | Add destination                    |
| POST   | /api/data/incoming_data       | Send event data                    |
| GET    | /api/logs                     | View logs (with filters)           |

📌 **Authorization required** for most routes (send JWT as `Bearer <token>`)

---

## 📦 Installation

```bash
git clone https://github.com/Gowtham5872/Data-pusher
cd Data_pusher
npm install
