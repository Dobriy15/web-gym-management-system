

-- 1.  (At least 2 columns + PK)
CREATE TABLE IF NOT EXISTS Members (
                                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                                       full_name TEXT NOT NULL,
                                       email TEXT UNIQUE NOT NULL
);

-- 2.  (3 тype of filed: Integer, Text, Real)
CREATE TABLE IF NOT EXISTS FitnessClasses (
                                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                                              class_name TEXT NOT NULL,
                                              instructor TEXT NOT NULL,
                                              capacity INTEGER NOT NULL,
                                              price REAL NOT NULL
);

-- 3.  (Many-to-Many )
CREATE TABLE IF NOT EXISTS Bookings (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        member_id INTEGER,
                                        class_id INTEGER,
                                        booking_date TEXT NOT NULL, -- Дополнительная колонка (Requirement)
                                        status TEXT DEFAULT 'Confirmed',
                                        FOREIGN KEY(member_id) REFERENCES Members(id),
                                        FOREIGN KEY(class_id) REFERENCES FitnessClasses(id)
);

-- 4. Login and rols
CREATE TABLE IF NOT EXISTS Users (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     username TEXT UNIQUE NOT NULL,
                                     email TEXT UNIQUE NOT NULL,
                                     password_hash TEXT NOT NULL,
                                     role TEXT NOT NULL DEFAULT 'Member'
);