## 1. WisdomWave ( An e-learning and tutor finding website)<br/>

**Frontend Live link:** <a href="https://wisdomwave-project.netlify.app/">WisdomWave</a> :link:
## Repository
**Client Side:** <a href="https://github.com/JoujonikiAsa2/wisdomwave-client-side">Click Here</a> :link:

## Getting Started Locally

1. Clone this repository to your local machine:

```bash
git clone https://github.com/JoujonikiAsa2/wisdomwave-server-side
```

2. Move to the cloned directory

```bash
cd wisdomwave-server-side
```

3. Install Dependencies

```bash
npm i
```

4. Configure Environment Variables

```bash

DATABASE_LOCAL=mongodb+srv://<username>:<password>@cluster0.ghkhwep.mongodb.net/?retryWrites=true&w=majority
DB_NAME="WisdomWave"
DATABASE_LOCAL_PASSWORD=***********
DATABASE_LOCAL_USERNAME==*********** 	
NODE_ENV=development
CLIENT=https://wisdomwave-project.netlify.app/
LOCAL_CLIENT=http://localhost:5173
ACCESS_TOKEN_SECRET==***********
RUNNING_PORT=5000
STRIPE_KEY==***********
STORE_ID==***********
STORE_PASSWORD==***********
YOUTUBE_CREDENTIALS= ***********
SENDER_EMAIL==***********
APPLICATION_PASSWORD==***********
```

5. Start the local Server:

```bash
nodemon app.js

```

# 📘 API Documentation – Online Learning Platform

This document provides a complete list of RESTful API endpoints for the backend of this platform.

## 🔐 Authentication

| Method | Endpoint      | Description                 |
|--------|---------------|-----------------------------|
| POST   | `/api/jwt`    | Sign in and generate JWT    |
| POST   | `/api/logout` | Log out the current session |

## 🎓 Courses

| Method | Endpoint                              | Description                         |
|--------|----------------------------------------|-------------------------------------|
| GET    | `/api/courses`                         | Get all courses                     |
| GET    | `/api/courses/:id`                     | Get course details by ID           |
| GET    | `/api/courses/email/:instructorEmail`  | Get courses by instructor email    |
| GET    | `/api/instructorUpdateCourses/:id`     | Get instructor course by ID        |
| GET    | `/api/searchedCategory/:category`      | Search courses by category         |
| GET    | `/api/search/key/:searchValue`         | Search courses by title            |
| GET    | `/api/totalCourse`                     | Total number of courses            |
| GET    | `/api/totalCategory`                   | Total number of categories         |
| GET    | `/api/categories`                      | Get unique categories              |
| POST   | `/api/courses`                         | Create a new course                |
| PATCH  | `/api/courses/:id`                     | Update course by ID                |
| DELETE | `/api/courses/id/:id/email/:email`     | Delete course by ID and email      |
| DELETE | `/api/courses/id/:id`                  | Admin deletes a course             |

## 💬 Reviews & Discussions

| Method | Endpoint                                | Description                       |
|--------|------------------------------------------|-----------------------------------|
| GET    | `/api/reviews/:courseId`                 | Get reviews of a course           |
| POST   | `/api/discussions`                       | Post a new discussion             |
| POST   | `/api/discussions/:id`                   | Reply to a discussion             |
| GET    | `/api/discussions`                       | Get all discussions               |
| GET    | `/api/discussions/:id`                   | Get a discussion by ID            |
| DELETE | `/api/discussions/:id`                   | Delete a discussion               |
| PATCH  | `/api/likes/:id`                         | Like a discussion                 |
| GET    | `/api/likes/:id/:email`                  | Check if user liked discussion    |

## ❓ FAQ

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/api/faqs`      | Read all FAQs         |
| POST   | `/api/faqs`      | Create FAQ            |
| DELETE | `/api/faqs/:id`  | Delete FAQ            |

## 💳 Payment

| Method | Endpoint                            | Description                       |
|--------|--------------------------------------|-----------------------------------|
| POST   | `/api/payment/:id`                  | Initiate payment                  |
| POST   | `/api/payment/success/:courseId`    | Payment success                   |
| POST   | `/api/payment/cancel/:courseId`     | Payment canceled                  |
| POST   | `/api/payment/fail/:courseId`       | Payment failed                    |
| GET    | `/api/purchasedCourses/:email`      | Get purchased courses by email    |

## 🏠 Home

| Method | Endpoint    | Description          |
|--------|-------------|----------------------|
| GET    | `/api/home` | Homepage data        |

## 👨‍🏫 Instructor

| Method | Endpoint                                      | Description                             |
|--------|-----------------------------------------------|-----------------------------------------|
| GET    | `/api/totalEarningByInstructor/:email`        | Get instructor's total earnings         |
| GET    | `/api/enrolledStudents/instructor/:email`     | Get enrolled students                   |
| GET    | `/api/totalStudents/instructor/email/:email`  | Get total students                      |
| PATCH  | `/api/certification/id/:id`                   | Open certification                      |
| PATCH  | `/api/certification/close/id/:id`             | Close certification                     |
| GET    | `/api/course/:searchValue`                    | Find student by course name             |
| PUT    | `/api/liveClasses/id/:id`                     | Update live class link                  |
| POST   | `/api/assignments`                            | Create assignment/quiz                  |
| GET    | `/api/assignments/:id/:title`                 | Read assignment                         |
| POST   | `/api/quiz`                                   | Submit quiz response                    |
| GET    | `/api/quiz/:email/:patternTitle`              | Read quiz response                      |
| POST   | `/api/announcements`                          | Create announcement                     |
| PATCH  | `/api/announcements/:email`                   | Mark announcements as read              |
| GET    | `/api/announcements/:email`                   | Get announcements for student           |
| GET    | `/api/announcements/isRead/email/:email`      | Check if announcement read              |
| GET    | `/api/announcements/email/:email`             | Get instructor announcements            |

## 🧑‍🏫 Tutor

| Method | Endpoint                                 | Description                       |
|--------|-------------------------------------------|-----------------------------------|
| GET    | `/api/tutors/:userEmail`                 | Get tutor profile                 |
| PATCH  | `/api/tutors/:userEmail`                 | Update profile photo              |
| PATCH  | `/api/tutors/info/:userEmail`            | Update profile info               |
| DELETE | `/api/tutors/:userEmail`                 | Delete tutor profile              |
| POST   | `/api/tutors/:userEmail`                 | Create tutor profile              |
| GET    | `/api/requestedTuition/tutor/:email`     | Get tuition requests by tutor     |
| PUT    | `/api/requestedTuition/:email`           | Update tuition request status     |
| GET    | `/api/tuitions`                          | Get all tuitions                  |
| GET    | `/api/student/messages/:email`           | Get messages from students        |
| POST   | `/api/student/messages`                  | Send message to student           |

## 🎓 Student

| Method | Endpoint                                  | Description                       |
|--------|--------------------------------------------|-----------------------------------|
| GET    | `/api/tutor/:id`                          | Get specific tutor by ID          |
| POST   | `/api/messages`                           | Send message to tutor             |
| GET    | `/api/tutors`                             | Get all tutors                    |
| POST   | `/api/tuitions`                           | Create tuition                    |
| GET    | `/api/requestedTuition/:email`            | Get requested tuitions            |
| GET    | `/api/student/tuitionRequest/:email`      | Get tuition requests from student |
| PATCH  | `/api/student/rating/:courseId`           | Update course rating              |

---

## 👤 User Management

| Method | Endpoint              | Description                      |
|--------|------------------------|----------------------------------|
| POST   | `/api/users`           | Create user                      |
| PUT    | `/api/user/:email`     | Update user status or role       |

## 📍 Location & Metadata

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/api/districts`          | Get all districts            |
| GET    | `/api/districts/:name`    | Get district by name         |
| GET    | `/api/upazilas`           | Get all upazilas             |
| GET    | `/api/upazilas/:id`       | Get upazilas by district ID  |
| GET    | `/api/institutes`         | Get list of institutes       |
| GET    | `/api/subjects`           | Get list of subjects         |
| GET    | `/api/educationLevels`    | Get education levels         |

## 🛠 Admin Panel

> All routes require `logger` and `verifyAdmin` middleware unless noted.

| Method | Endpoint                                | Description                        |
|--------|------------------------------------------|------------------------------------|
| GET    | `/api/users`                            | Get all users                      |
| GET    | `/api/user/:email`                      | Get user by email                  |
| DELETE | `/api/user/:email`                      | Delete user                        |
| PATCH  | `/api/user/:email`                      | Update user role (admin)           |
| GET    | `/api/platformEarning`                  | Get total platform earnings        |
| GET    | `/api/earningByMonth`                   | Monthly earnings breakdown         |
| GET    | `/api/courses/email/query/:email`       | Search course by email             |
| DELETE | `/api/tuitions/:tuitionCode`            | Delete tuition                     |
| POST   | `/api/tuitions/:tuitionCode`            | Get tuition details                |
| PATCH  | `/api/tuitions/:email`                  | Update tuition info                |
| GET    | `/api/tuitions/:userEmail`              | Get tuitions by user email         |
| GET    | `/api/transactions`                     | Get all transactions               |

## 🧪 Notes

- All endpoints are prefixed with `/api`
- Authentication is required for most routes via JWT
- Admin routes require additional middleware

