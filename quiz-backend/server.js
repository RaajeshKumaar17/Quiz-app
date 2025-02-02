const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); 

app.get("/questions", async (req, res) => {
  try {

    const { data } = await axios.get("https://api.jsonserve.com/Uw5CrX");
  
    res.json(data.questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});
const PORT=3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
