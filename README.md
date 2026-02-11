# Home Services Platform (UrbanClap-style)  
KloudWizards Technical Evaluation Assignment

---

## Overview

This project implements a minimal but believable skeleton of a home-services platform similar to UrbanClap.

For this assignment, I chose **Option A – Customer Flow** and implemented one complete vertical slice:

Customer → Browse Services → Create Booking → View Booking Confirmation

The goal was to focus on clarity of architecture, structure, and decision-making rather than building every feature.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (local)
- Mongoose

### Dev Tools
- Nodemon
- MongoDB Compass

---

## High-Level Architecture

Frontend (Next.js)  
↓  
Backend API (Express.js)  
↓  
MongoDB Database  

The frontend communicates with the backend via REST APIs.
The backend handles business logic and persists data to MongoDB.

---

## Data Models

### Service
- title (String)
- category (String)
- description (String)
- basePrice (Number)
- durationMins (Number)
- isActive (Boolean)

### Booking
- customerName (String)
- customerPhone (String)
- address (String)
- serviceId (ObjectId reference to Service)
- scheduledAt (Date)
- status (pending | confirmed | completed | cancelled)

---

## What Is Implemented

### Customer Flow (Option A)

### 1. Browse Services
- `GET /api/services`
- Displays available services
- Responsive grid layout
- Dynamic booking links

### 2. Create Booking
- Booking form with validation
- `POST /api/bookings`
- Server-side validation
- Service existence verification
- Status defaults to `pending`

### 3. Booking Confirmation Page
- Redirect after successful booking
- `GET /api/bookings/:id`
- Displays service, customer, and schedule details

### UI Enhancements
- Page-specific background images
- Loading states
- Disabled submit button during processing
- Smooth page transitions
- Navbar across all pages

---

## API Endpoints

### Health
GET `/api/health`

### Services
GET `/api/services`

### Bookings
POST `/api/bookings`  
GET `/api/bookings/:id`

---

## How To Run The Project

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

---

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd HomeServicesPlatform
```
### 2. Backend Setup
```bash
cd backend
npm install
```

Create .env file inside backend:
```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/home_services_db
```

Start backend:
```bash
npm run dev
```

Seed services:
```bash
node src/seed/seedServices.js
```

Backend runs at:
```bash
http://127.0.0.1:5000
```
### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```bash
http://localhost:3000
```
### Key Assumptions

1. No authentication was implemented (timeboxed decision)

2. All bookings are treated as guest bookings

3. Services are pre-seeded (no admin UI built)

4. Single-city scope

5. No provider allocation logic

### Trade-offs & Design Decisions
1. Focused Vertical Slice

Instead of building multiple flows (customer, provider, admin), I chose to implement one complete customer journey end-to-end.

2. No Authentication

Authentication was intentionally excluded to keep the vertical slice minimal and coherent.

3. Minimal Validation

Basic validation is implemented at controller level. Advanced schema validation was deferred.

4. Local MongoDB

Chose local MongoDB for simplicity and faster development during the timebox.

### What I Would Do Next (If Given More Time)
1. Authentication System

    Customer login/signup

    Role-based access (Admin, Provider, Customer)

2. Provider Flow

    Provider onboarding

    Service management

Availability scheduling

3. Admin Dashboard

    Approve/reject providers

    View and manage bookings

    Basic analytics

4. Booking Lifecycle

    Provider assignment strategy

    Booking status updates

    Cancellation flow

5. Payment Integration

    Stripe/Razorpay integration

    Payment status handling

6. Validation & Robustness

    Schema validation using Zod or Joi

    Centralized error handling

    Request logging

7. Deployment

    Frontend on Vercel

    Backend on Render/Railway

    Environment variable management

### Challenges Faced

1. Handling local connectivity between Next.js and Express during development

2. Avoiding hydration mismatches between server and client components

3. Structuring the project cleanly while keeping scope minimal

4. Maintaining a no-scroll layout for specific pages while allowing scroll where required
