# Next Morning Gym Management System

This web application built to manage gym operations, including user registration, class scheduling, and member management.

##  Project Requirements Fulfillment

### Level 1 (Basic Functionality)

**Database Tables**: Includes 3 connected tables: `Users`, `FitnessClasses`, and `Bookings`.


**Relationships**: Implements a **Many-to-Many** relationship between Users and Classes via the `Bookings` table, including an additional `booking_date` column.


**Data Types**: Uses `TEXT`, `INTEGER`, and `REAL` (price) columns.


**CRUD Operations**: Supports adding (Registration/Booking), updating (Profile/Class Edit), and deleting (Cancel Booking) records.



### Level 2 (Security & UX)

**Authentication**: Secure registration and login system.



**Access Control**: Functionalities vary based on login status (Guests can only view; Members can book).


* **State Management**: Uses localStorage and React state to manage user sessions.

### Level 3 (Advanced Features)


**SPA Architecture**: Built with React Router for seamless navigation without page reloads.



**User Roles**: 3 distinct roles: **Guest**, **Member**, and **Administrator**.


* **Resource Permissions**: Members can only view and cancel their own bookings; Administrators can manage all users and edit classes.



**Internationalization**: Full support for **English** and **Polish** languages.



---

##  Tech Stack


**Frontend**: React.js, Vite, Axios, i18next.



**Backend**: Node.js, Express.js.



**Database**: SQLite.



---

## Installation & Setup

### 1. Backend Setup

1. Navigate to the `backend` folder: `cd backend`.
2. Install dependencies: `npm install`.
3. Run the server: `node server.js`.
4.
*Note: The database `gym_project.db` will be automatically created and seeded with sample data on the first run*.



### 2. Frontend Setup

1. Navigate to the `frontend` folder: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the application: `npm run dev`.
4. Open your browser at the address provided in the terminal (usually `http://localhost:5173`).

---

## Admin Access

To access administrative features (Member Management & Class Editing):

1. Register a new user account.
2. Open the `gym_project.db` using a database tool (e.g., WebStorm Database tab or DB Browser for SQLite).
3. Change the `role` value of your user from `Member` to `Admin`.
4. Submit changes and log in again.

