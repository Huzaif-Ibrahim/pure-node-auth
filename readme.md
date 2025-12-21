# Pure Node.js Authentication System (No Frameworks)

This project is a complete authentication system built using **only core Node.js** modules.  
No Express, no external authentication libraries, no routing frameworks.

The main goal is **deeply understanding how Node.js works under the hood** — HTTP, routing, middleware, authentication, and request handling — rather than relying on abstractions.

> ⚠️ This project is for **learning and understanding**.  
> The same system can be built easily using npm packages, but that is intentionally avoided here.

---

## 🚀 Key Features

- ✅ **Custom Router**
  - Manual route matching using URL and HTTP methods
  - No Express or external router

- ✅ **Custom Body Parser**
  - Reads request streams using `req.on('data')` and `req.on('end')`
  - Parses JSON request bodies manually

- ✅ **Custom JWT Implementation**
  - Token generation and verification built from scratch
  - Uses Node.js `crypto` module
  - No `jsonwebtoken` package

- ✅ **Middleware System**
  - Custom middleware execution flow
  - Authentication middleware for protected routes

- ✅ **Password Hashing**
  - Secure password hashing using Node.js `crypto`
  - No bcrypt or external libraries

- ✅ **User Storage**
  - Users stored in a local JSON file
  - File-based persistence using `fs` module

---

## 🧠 Main Motivation

The purpose of this project is **not convenience**, but **understanding**.

This project helped me learn:
- How Node.js handles HTTP requests internally
- How routing works without frameworks
- How request bodies are streamed
- How cookies and headers work
- How authentication logic is implemented at a low level
- How middleware patterns actually function

> Every feature in this project **can be built using npm modules**,  
> but here it is implemented using **PURE NODE.JS** to understand the fundamentals.

---

## 🛠️ Tech Stack

- **Node.js (core modules only)**
  - `http`
  - `fs`
  - `crypto`
  - `url`
- No Express
- No external authentication libraries
- No routing frameworks

---

## 🔐 Authentication Flow

1. User sends a login request
2. Server parses request body manually
3. Password is hashed and verified
4. JWT is generated using custom logic
5. Token is sent via HTTP headers or cookies
6. Protected routes validate JWT via middleware

---

## 📁 Project Structure (Example)

