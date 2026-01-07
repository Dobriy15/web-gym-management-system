const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const JWT_SECRET = 'gym_secret_2026';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// db
db.serialize(() => {
    // 1. Fitness Classes Table
    db.run(`CREATE TABLE IF NOT EXISTS FitnessClasses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_name TEXT NOT NULL, 
        instructor TEXT NOT NULL, 
        capacity INTEGER NOT NULL, 
        price REAL NOT NULL, 
        day_of_week TEXT NOT NULL, 
        description TEXT,
        start_time TEXT, 
        duration TEXT
    )`);

    // 2. Users Table
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE NOT NULL, 
        email TEXT UNIQUE NOT NULL, 
        password_hash TEXT NOT NULL, 
        role TEXT DEFAULT 'Member',
        bio TEXT DEFAULT 'Welcome to Next Morning', 
        profile_pic TEXT
    )`);

    // 3. Bookings Table (Many-to-Many + additional column)
    db.run(`CREATE TABLE IF NOT EXISTS Bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id INTEGER, 
        class_id INTEGER, 
        booking_date TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES Users(id),
        FOREIGN KEY(class_id) REFERENCES FitnessClasses(id)
    )`);

    //  SEED DATA
    db.get("SELECT COUNT(*) AS count FROM FitnessClasses", (err, row) => {
        if (row && row.count === 0) {
            console.log("Seeding Classes...");
            const stmt = db.prepare(`INSERT INTO FitnessClasses 
                (class_name, instructor, capacity, price, day_of_week, description, start_time, duration) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

            stmt.run('Yoga Flow', 'Emma', 15, 12.0, 'Monday', 'Gentle stretches to start your day.', '08:00', '60 min');
            stmt.run('Boxing', 'Mike', 10, 25.0, 'Monday', 'Intense striking drills and cardio.', '18:30', '90 min');
            stmt.run('Crossfit', 'Bob', 12, 20.0, 'Tuesday', 'High-intensity functional training.', '09:00', '45 min');
            stmt.run('Zumba', 'Maria', 20, 15.0, 'Wednesday', 'Dance fitness party with Latin music.', '19:00', '60 min');
            stmt.run('Powerlifting', 'Dave', 8, 30.0, 'Thursday', 'Heavy lifting and strength technique.', '10:00', '90 min');
            stmt.finalize();
        }
    });
});

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ error: "Admin only" });
    next();
};

// --- API ENDPOINTS ---

app.get('/api/classes', (req, res) => {
    db.all("SELECT * FROM FitnessClasses", (err, rows) => res.json({ data: rows }));
});

app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, hash], (err) => {
            if (err) res.status(400).json({ error: "User exists" });
            else res.json({ message: "Success" });
        });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM Users WHERE email = ?', [email], async (err, user) => {
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);
            res.json({ token, username: user.username, role: user.role, bio: user.bio, profile_pic: user.profile_pic });
        } else res.status(401).json({ error: "Wrong credentials" });
    });
});

app.post('/api/bookings', authenticateToken, (req, res) => {
    db.run('INSERT INTO Bookings (user_id, class_id, booking_date) VALUES (?, ?, ?)',
        [req.user.id, req.body.class_id, new Date().toISOString()], () => res.json({ message: "Ok" }));
});

app.get('/api/my-bookings', authenticateToken, (req, res) => {
    db.all(`SELECT b.id, c.class_name, c.instructor FROM Bookings b 
            JOIN FitnessClasses c ON b.class_id = c.id WHERE b.user_id = ?`,
        [req.user.id], (err, rows) => res.json(rows));
});

app.delete('/api/bookings/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM Bookings WHERE id = ? AND user_id = ?',
        [req.params.id, req.user.id], () => res.json({ message: "Deleted" }));
});

app.get('/api/admin/members', authenticateToken, isAdmin, (req, res) => {
    db.all("SELECT id, username, email, role FROM Users", (err, rows) => res.json(rows));
});

app.put('/api/user/profile', authenticateToken, (req, res) => {
    const { bio, profile_pic } = req.body;
    db.run('UPDATE Users SET bio = ?, profile_pic = ? WHERE id = ?',
        [bio, profile_pic, req.user.id], () => res.json({ message: "Updated" }));
});

app.listen(3000, () => console.log('Next Morning Server running on port 3000'));