# 🎬 CINEBOOK — Movie Ticket Booking System

> **Book Your Next Big Screen Experience.**

CINEBOOK is a full-stack movie ticket booking web application developed as an academic project.

The application allows users to register and log in, browse available movies, select dates and show timings, choose the number of seats, complete a simulated QR payment and view their booking history through their profile.

---

## ✨ Features

### 🔐 User Authentication
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected application access

### 🎬 Movie Browsing
- Browse available movies
- Movie descriptions
- Theatre information
- Location information
- Show timings

### 📅 Dynamic Date Selection
- Automatically displays the current date
- Displays upcoming dates
- Movie availability changes according to the selected date
- Different movies can appear on different dates

### 🎟️ Ticket Booking
- Select a movie
- Select show timing
- Select number of seats
- Select theatre and location
- Book the selected movie show

### 💳 QR Payment Simulation
- Dummy QR code payment interface
- Displays total ticket amount
- Payment confirmation using the "Done" button
- Successful payment confirmation

> **Note:** The QR payment functionality is a simulation for academic demonstration and does not process real financial transactions.

### 👤 User Profile
- View profile information
- Update name
- Update date of birth
- Update contact information
- Email displayed as registered account information

### 📋 Booking History
- Successfully completed bookings are stored
- Previous bookings are displayed inside the Profile section
- No separate booking-history page is required

### 🎨 User Interface
- Movie-themed interface
- Responsive design
- Interactive movie cards
- Dynamic date selection
- Navigation bar
- Footer with project and developer information

---

# 🛠️ Technology Stack

## Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Vite
- JavaScript / JSX

## Backend

- Node.js
- Express.js
- JWT
- bcrypt.js

## Database

- MongoDB
- Mongoose

## Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

# 🏗️ System Architecture

```text
                    CINEBOOK
                       │
                       ▼
              ┌─────────────────┐
              │ React Frontend  │
              │     Vite        │
              └────────┬────────┘
                       │
                     Axios
                       │
                       ▼
              ┌─────────────────┐
              │ Node.js +       │
              │ Express.js      │
              │ REST API        │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    MongoDB      │
              │                 │
              │ Users           │
              │ Bookings        │
              └─────────────────┘


              
