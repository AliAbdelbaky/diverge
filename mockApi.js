import express from "express";
import cors from "cors";
import {faker} from '@faker-js/faker';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Simulate latency (300-800ms)
const simulateDelay = async () => {
    const delay = Math.floor(Math.random() * (800 - 300 + 1) + 300);
    return new Promise((res) => setTimeout(res, delay));
};

// Generate Mock User Data
let users = [...Array.from({length: 50}, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(["Admin", "Editor", "Viewer"]),
    username: faker.internet.username(), // before version 9.1.0, use userName()
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
})), {
    username: "admin",
    password: "admin@test.com",
    email: 'admin@test.com',
    role: "Admin",
    name: "Admin",
    id: faker.string.uuid()
}];

// Mock Roles Data
const roles = ["Admin", "Editor", "Viewer"];


app.post("/api/auth/login", async (req, res) => {
    await simulateDelay();
    const {email, password} = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).json({error: "Invalid credentials"});

    res.json({...user, token: faker.string.uuid()});
})

// 📌 Get users with pagination & filtering
app.get("/api/users", async (req, res) => {
    await simulateDelay();

    const {page = "1", limit = "10", role} = req.query;
    let filteredUsers = [...users];

    if (role) {
        filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

    res.json({total: filteredUsers.length, users: paginatedUsers});
});

// 📌 Get a specific user
app.get("/api/users/:id", async (req, res) => {
    await simulateDelay();
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({error: "User not found"});
    res.json(user);
});

// 📌 Create a new user
app.post("/api/users", async (req, res) => {
    await simulateDelay();
    const {name, email, role} = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({error: "Missing required fields"});
    }

    const newUser = {id: faker.string.uuid(), name, email, role};
    users.push(newUser);
    res.status(201).json(newUser);
});

// 📌 Update user
app.put("/api/users/:id", async (req, res) => {
    await simulateDelay();
    const {name, email, role} = req.body;
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) return res.status(404).json({error: "User not found"});

    users[userIndex] = {...users[userIndex], name, email, role};
    res.json(users[userIndex]);
});

// 📌 Delete user
app.delete("/api/users/:id", async (req, res) => {
    await simulateDelay();
    users = users.filter(user => user.id !== req.params.id);
    res.json({message: "User deleted"});
});

// 📌 Get available roles
app.get("/api/roles", async (req, res) => {
    await simulateDelay();
    res.json(roles);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock API running at http://localhost:${PORT}`);
});
