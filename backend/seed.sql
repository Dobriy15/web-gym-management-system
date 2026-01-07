-- Initial Classes for the schedule
INSERT INTO FitnessClasses
(class_name, instructor, capacity, price, day_of_week, description, start_time, duration)
VALUES
    ('Yoga Flow', 'Emma', 15, 12.0, 'Monday', 'Gentle stretches to start your day.', '08:00', '60 min'),
    ('Boxing', 'Mike', 10, 25.0, 'Monday', 'Intense striking drills and cardio.', '18:30', '90 min'),
    ('Crossfit', 'Bob', 12, 20.0, 'Tuesday', 'High-intensity functional training.', '09:00', '45 min'),
    ('Zumba', 'Maria', 20, 15.0, 'Wednesday', 'Dance fitness party with Latin music.', '19:00', '60 min'),
    ('Powerlifting', 'Dave', 8, 30.0, 'Thursday', 'Heavy lifting and strength technique.', '10:00', '90 min');

-- Sample User (Password: "123456" hashed)
-- Note: After login, you can change this role to 'Admin' in the DB to test AdminPanel
INSERT INTO Users (username, email, password_hash, role, bio) VALUES
    ('vlad', 'vlad@example.com', '$2a$10$76F.u1pXvB7k.9Wc5iWnO.Q6vG5z8zPz5z5z5z5z5z5z5z5z5z5z', 'Member', 'Gym enthusiast');

-- Initial Booking (user_id 1 books class_id 1)
INSERT INTO Bookings (user_id, class_id, booking_date) VALUES
    (1, 1, '2026-01-07 10:00:00');