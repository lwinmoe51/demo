const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); // Frontend မှ Cross-Origin ခေါ်ယူခွင့်ပေးရန်
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DB_FILE;

// Database Connection
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("Database ချိတ်ဆက်မှု မအောင်မြင်ပါ- ", err.message);
    } else {
        console.log(`Connected to SQLite Database: ${DB_PATH}`);
    }
});

// Helper function to query database
const getFeatureData = (id, res) => {
    db.get(
        "SELECT title, description FROM cards WHERE id = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ error: "Data not found" });
            }
            res.json(row);
        },
    );
};

// -------------------------------------------------------------
// Git Workflow စမ်းသပ်ရန် API Endpoints များ
// -------------------------------------------------------------

// Feature 1 API
app.get("/api/feature1", (req, res) => {
    getFeatureData(1, res);
});

// Feature 2 API
// app.get("/api/feature2", (req, res) => {
//     getFeatureData(2, res);
// });

// Feature 3 API
// app.get("/api/feature3", (req, res) => {
//     getFeatureData(3, res);
// });

// Server နိုးခြင်း
app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});
