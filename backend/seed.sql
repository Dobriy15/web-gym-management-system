
INSERT INTO FitnessClasses (class_name, instructor, capacity, price) VALUES
                                                                         ('Yoga Flow', 'Emma Watson', 15, 12.50),
                                                                         ('HIIT Intense', 'Chris Evans', 10, 25.00),
                                                                         ('Boxing Basics', 'Mike Tyson', 8, 45.99);


INSERT INTO Members (full_name, email) VALUES
                                           ('John Doe', 'john@example.com'),
                                           ('Jane Smith', 'jane@example.com');


INSERT INTO Bookings (member_id, class_id, booking_date) VALUES
                                                             (1, 1, '2026-02-10 09:00:00'),
                                                             (1, 2, '2026-02-12 18:00:00'),
                                                             (2, 1, '2026-02-10 09:00:00');