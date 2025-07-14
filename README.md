# Freelancer Project & Invoice Dashboard

A web-based application built with the MERN stack to help freelancers and small business owners manage their projects, clients, and invoices.

---

## ✨ Features

- **User Authentication**: Secure user registration and login using JWT.
- **Client Management**: Full CRUD (Create, Read, Update, Delete) functionality for clients.
- **Project Tracking**: Manage project details and track their status.
- **Invoice Generation**: Create and manage invoices for completed projects.
- **Dashboard Analytics**: View key stats like total earnings and active projects.
- **Email Notifications**: Automatically notify clients about project status updates.

---

## 🛠️ Technology Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Email Service**: SendGrid / Mailgun
- **Payment Gateway**: Stripe (in Test Mode)

---

## 🚀 Setup and Installation

Instructions to get a local copy up and running.

### Prerequisites

- Node.js
- npm (or yarn)
- Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone (https://github.com/AshenFdo/Project-Invoice-Dashboard)
    ```
2.  **Navigate to the backend and install dependencies:**
    ```sh
    cd freelancer-dashboard/server
    npm install
    ```
3.  **Navigate to the frontend and install dependencies:**
    ```sh
    cd ../client
    npm install
    ```
4.  **Create a `.env` file** in the `backend` directory and add the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
5.  **Run the application:**
    - To start the backend server, run from the `/backend` directory:
      ```sh
      npm start
      ```
    - To start the frontend development server, run from the `/frontend` directory:
      ```sh
      npm run dev
      ```