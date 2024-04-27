const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import cors middleware

const app = express();
const PORT = 3001;
const API_KEY = "bMDRtlUKLjBf2AIUmeoNOpQaG3UhX5w7";
const API_URL = "https://api.aiforthai.in.th/ssense";

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// เส้นทาง POST สำหรับการวิเคราะห์ข้อความ
app.post("/analyze", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      API_URL,
      { text },
      { headers: { Apikey: API_KEY } }
    );

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// เส้นทาง GET สำหรับการวิเคราะห์ข้อความ
app.get("/analyze", async (req, res) => {
  const { text } = req.query;

  try {
    const response = await axios.get(API_URL, {
      params: { text },
      headers: { Apikey: API_KEY },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
