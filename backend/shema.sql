-- 1. Fitness Classes Table (Level 1: 3 types of columns, PK + more than 2 columns)
CREATE TABLE IF NOT EXISTS FitnessClasses (
                                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                                              class_name TEXT NOT NULL,
                                              instructor TEXT NOT NULL,
                                              capacity INTEGER NOT NULL,
                                              price REAL NOT NULL,
                                              day_of_week TEXT NOT NULL,
                                              description TEXT,
                                              start_time TEXT,
                                              duration TEXT
);

-- 2. Users Table (Level 2 & 3: Auth and Roles)
CREATE TABLE IF NOT EXISTS Users (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     username TEXT UNIQUE NOT NULL,
                                     email TEXT UNIQUE NOT NULL,
                                     password_hash TEXT NOT NULL,
                                     role TEXT DEFAULT 'Member', -- Supports Guest, Member, Admin roles
                                     bio TEXT DEFAULT 'Welcome to Next Morning',
                                     profile_pic TEXT
);

-- 3. Bookings Table (Level 1: Many-to-Many with additional column)
CREATE TABLE IF NOT EXISTS Bookings (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        user_id INTEGER,
                                        class_id INTEGER,
                                        booking_date TEXT NOT NULL,
                                        FOREIGN KEY(user_id) REFERENCES Users(id),
                                        FOREIGN KEY(class_id) REFERENCES FitnessClasses(id)
);